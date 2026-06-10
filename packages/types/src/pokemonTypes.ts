export interface NamedResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedResource[];
}

export interface PokemonStat {
  base_stat: number;
  stat: NamedResource;
}

export interface PokemonType {
  slot: number;
  type: NamedResource;
}

export interface PokemonAbility {
  ability: NamedResource;
  is_hidden: boolean;
}

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}

export interface PokemonListItem {
  id: number;
  name: string;
  imageUrl: string;
  types?: string[];
}
