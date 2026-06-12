import { useState, useEffect } from 'react';
import { fetchPokemon } from '@pokeman/utils';
import type { Pokemon } from '@pokeman/types';

export function usePokemonDetail(nameOrId: string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchPokemon(nameOrId)
      .then((data) => {
        if (!cancelled) setPokemon(data);
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load Pokémon details.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [nameOrId]);

  return { pokemon, loading, error };
}
