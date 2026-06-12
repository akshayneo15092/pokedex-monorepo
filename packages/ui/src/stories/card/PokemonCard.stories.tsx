import type { Meta, StoryObj } from "@storybook/react";
import { PokemonCard } from "./PokemonCard";
import type { Pokemon, PokemonAbility, PokemonSprites, PokemonStat, PokemonType } from "@pokeman/types";

interface StoryArgs {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
}

const meta: Meta<StoryArgs> = {
  title: "UI/PokemonCard",
  argTypes: {
    id: { control: "number" },
    name: { control: "text" },
    height: { control: "number" },
    weight: { control: "number" },
    base_experience: { control: "number" },
    types: { control: "object" },
    abilities: { control: "object" },
    stats: { control: "object" },
    sprites: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
  args: {
    id: 25,
    name: "pikachu",
    height: 4,
    weight: 60,
    base_experience: 112,
    types: [
      {
        slot: 1,
        type: { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
      },
    ],
    abilities: [
      {
        ability: { name: "static", url: "https://pokeapi.co/api/v2/ability/9/" },
        is_hidden: false,
      },
      {
        ability: { name: "lightning-rod", url: "https://pokeapi.co/api/v2/ability/31/" },
        is_hidden: true,
      },
    ],
    stats: [
      {
        base_stat: 35,
        stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" },
      },
      {
        base_stat: 55,
        stat: { name: "attack", url: "https://pokeapi.co/api/v2/stat/2/" },
      },
      {
        base_stat: 40,
        stat: { name: "defense", url: "https://pokeapi.co/api/v2/stat/3/" },
      },
      {
        base_stat: 50,
        stat: { name: "special-attack", url: "https://pokeapi.co/api/v2/stat/4/" },
      },
      {
        base_stat: 50,
        stat: { name: "special-defense", url: "https://pokeapi.co/api/v2/stat/5/" },
      },
      {
        base_stat: 90,
        stat: { name: "speed", url: "https://pokeapi.co/api/v2/stat/6/" },
      },
    ],
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      other: {
        "official-artwork": {
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        },
      },
    },
  },

  render: (args) => {
    const pokemon: Pokemon = {
      id: args.id,
      name: args.name,
      height: args.height,
      weight: args.weight,
      base_experience: args.base_experience,
      types: args.types,
      abilities: args.abilities,
      stats: args.stats,
      sprites: args.sprites,
    };
    return <PokemonCard pokemon={pokemon} />;
  },
};