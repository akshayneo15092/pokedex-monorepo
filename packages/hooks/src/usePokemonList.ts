import { useState, useEffect, useCallback } from 'react';
import { fetchPokemonList } from '@pokeman/utils';
import type { PokemonListItem } from '@pokeman/types';

const PAGE_SIZE = 20;

export function usePokemonList(search = '') {
  const [items, setItems] = useState<PokemonListItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Debounce the search term to avoid hitting the API on every keystroke
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const load = useCallback(async (currentOffset: number, searchParam?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonList(PAGE_SIZE, currentOffset, searchParam);
      setItems((prev) => (currentOffset === 0 ? data : [...prev, ...data]));
      setHasMore(data.length === PAGE_SIZE);
    } catch {
      setError('Failed to load Pokémon. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setOffset(0);
    load(0, debouncedSearch);
  }, [debouncedSearch, load]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const next = offset + PAGE_SIZE;
      setOffset(next);
      load(next, debouncedSearch);
    }
  }, [loading, hasMore, offset, load, debouncedSearch]);

  return { items, loading, error, hasMore, loadMore };
}
