import React from "react";
import { render, screen } from "@testing-library/react";
import { PokemonListCard } from "../src/stories/card/PokemonListCard";
import type { PokemonListItem } from "@pockeman/types";

const mockPokemon: PokemonListItem = {
  id: 1,
  name: "bulbasaur",
  imageUrl: "https://example.com/bulbasaur.png",
};

describe("PokemonListCard", () => {
  it("renders basic info (name, id, image)", () => {
    render(<PokemonListCard pokemon={mockPokemon} />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("#001")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "bulbasaur" })).toHaveAttribute("src", "https://example.com/bulbasaur.png");
  });

  it("renders types when present", () => {
    const pokemonWithTypes: PokemonListItem = {
      ...mockPokemon,
      types: ["grass", "poison"],
    };
    render(<PokemonListCard pokemon={pokemonWithTypes} />);
    expect(screen.getByText("Grass")).toBeInTheDocument();
    expect(screen.getByText("Poison")).toBeInTheDocument();
  });

  it("does not render types if types are missing", () => {
    render(<PokemonListCard pokemon={mockPokemon} />);
    const chips = screen.queryAllByRole("button"); // Chip is rendered as a div or button depending on props, let's query container/text
    expect(screen.queryByText("Grass")).not.toBeInTheDocument();
  });
});
