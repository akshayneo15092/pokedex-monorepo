import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PokemonListCard } from "./PokemonListCard";
import { fetchPokemon } from "@pockeman/utils";

interface StoryArgs {
  pokemonId: number;
}
const meta: Meta = {
  title: "UI/PokemonListCard",
  component: PokemonListCard,

  argTypes: {
    pokemonId: {
      control: {
        type: "number",
      },
      description: "Pokemon ID",
      defaultValue: 1,
    },
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

interface Props {
  pokemonId: number;
}

const PokemonLoader = ({ pokemonId }: Props) => {
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await fetchPokemon(pokemonId);

      setPokemon({
        id: data.id,
        name: data.name,
        imageUrl:
          data.sprites.other?.["official-artwork"]?.front_default ??
          data.sprites.front_default ??
          "",
        types: data.types.map((t) => t.type.name),
      });
    };

    loadPokemon();
  }, [pokemonId]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return <PokemonListCard pokemon={pokemon} />;
};

export const Playground: Story = {
  args: {
    pokemonId: 25,
  },

  render: (args) => <PokemonLoader pokemonId={args.pokemonId} />,
};