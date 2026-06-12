import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PokemonCard } from "./PokemonCard";
import { fetchPokemon } from "@pokeman/utils";
import type { Pokemon } from "@pokeman/types";

interface StoryArgs {
  pokemonId: number;
}

const meta: Meta<StoryArgs> = {
  title: "UI/PokemonCard",
  argTypes: {
    pokemonId: {
      control: "number",
    },
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

const PokemonLoader = ({ pokemonId }: StoryArgs) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetchPokemon(pokemonId).then(setPokemon);
  }, [pokemonId]);

  if (!pokemon) return <div>Loading...</div>;

  return <PokemonCard pokemon={pokemon} />;
};

export const Playground: Story = {
  args: {
    pokemonId: 25,
  },

  render: (args) => <PokemonLoader pokemonId={args.pokemonId} />,
};