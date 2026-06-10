import type { Meta, StoryObj } from "@storybook/react";
import { PokemonCard } from "./PokemonCard";

const meta: Meta<typeof PokemonCard> = {
  title: "UI/PokemonCard",
  component: PokemonCard,
};

export default meta;

type Story = StoryObj<typeof PokemonCard>;

export const Pikachu: Story = {
  args: {
    id: 25,
    name: "Pikachu",
    type: "Electric",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  },
};

export const Charizard: Story = {
  args: {
    id: 6,
    name: "Charizard",
    type: "Fire",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  },
};