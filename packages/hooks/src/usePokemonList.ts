import { useState, useEffect, useCallback } from 'react';
import { fetchPokemonList } from '@pockeman/utils';
import type { PokemonListItem } from '@pockeman/types';

const PAGE_SIZE = 20;

export function usePokemonList() {
  const [items, setItems] = useState<PokemonListItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const load = useCallback(async (currentOffset: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonList(PAGE_SIZE, currentOffset);
      setItems((prev) => (currentOffset === 0 ? data : [...prev, ...data]));
      setHasMore(data.length === PAGE_SIZE);
    } catch {
      setError('Failed to load Pokémon. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(0);
  }, [load]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const next = offset + PAGE_SIZE;
      setOffset(next);
      load(next);
    }
  }, [loading, hasMore, offset, load]);

  return { items, loading, error, hasMore, loadMore };
}
