import type { Pokemon, PokemonListResponse, PokemonListItem, NamedResource } from '@pockeman/types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  return parseInt(parts[parts.length - 1], 10);
}

export function getOfficialArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function mapListItemsToPokemon(results: NamedResource[]): PokemonListItem[] {
  return results.map((item) => {
    const id = extractIdFromUrl(item.url);
    return { id, name: item.name, imageUrl: getOfficialArtworkUrl(id) };
  });
}

export async function fetchPokemonList(limit = 20, offset = 0): Promise<PokemonListItem[]> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Failed to fetch pokemon list');
  const data: PokemonListResponse = await res.json();
  return mapListItemsToPokemon(data.results);
}

export async function fetchPokemon(nameOrId: string | number): Promise<Pokemon> {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon: ${nameOrId}`);
  return res.json() as Promise<Pokemon>;
}

export function formatStatName(name: string): string {
  const map: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };
  return map[name] ?? name;
}

export function formatHeight(decimetres: number): string {
  return `${(decimetres / 10).toFixed(1)} m`;
}

export function formatWeight(hectograms: number): string {
  return `${(hectograms / 10).toFixed(1)} kg`;
}
