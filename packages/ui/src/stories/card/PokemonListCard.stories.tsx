import type { Meta, StoryObj } from "@storybook/react";
import { PokemonListCard } from "./PokemonListCard";

interface StoryArgs {
  id: number;
  name: string;
  imageUrl: string;
  types?: string[];
}

const meta: Meta<StoryArgs> = {
  title: "UI/PokemonListCard",
  argTypes: {
    id: { control: "number" },
    name: { control: "text" },
    imageUrl: { control: "text" },
    types: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
  args: {
    id: 25,
    name: "pikachu",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    types: ["electric"],
  },

  render: (args) => {
    const pokemon = {
      id: args.id,
      name: args.name,
      imageUrl: args.imageUrl,
      types: args.types,
    };
    return <PokemonListCard pokemon={pokemon} />;
  },
};