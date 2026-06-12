import React from "react";
import { render, screen } from "@testing-library/react";
import { PokemonCard } from "../src/stories/card/PokemonCard";
import type { Pokemon } from "@pokeman/types";

const mockPokemon: Pokemon = {
  id: 1,
  name: "bulbasaur",
  height: 7,
  weight: 69,
  base_experience: 64,
  sprites: {
    front_default: "https://example.com/bulbasaur_front.png",
    other: {
      "official-artwork": {
        front_default: "https://example.com/bulbasaur.png",
      },
    },
  },
  types: [
    {
      slot: 1,
      type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
    },
  ],
  abilities: [
    {
      ability: { name: "overgrow", url: "https://pokeapi.co/api/v2/ability/65/" },
      is_hidden: false,
    },
  ],
  stats: [
    {
      base_stat: 45,
      stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" },
    },
  ],
};

describe("PokemonCard", () => {
  it("renders the pokemon name", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  it("renders the pokemon id", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    const idElements = screen.getAllByText("#001");
    expect(idElements.length).toBeGreaterThan(0);
    expect(idElements[0]).toBeInTheDocument();
  });

  it("renders the type chip", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
  });

  it("renders the pokemon image with correct src", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByRole("img", { name: "bulbasaur" })).toHaveAttribute("src", mockPokemon.sprites.other?.["official-artwork"]?.front_default);
  });

  it("renders the fallback front_default image when official-artwork is missing", () => {
    const pokemonWithFallbackImage: Pokemon = {
      ...mockPokemon,
      sprites: {
        front_default: "https://example.com/bulbasaur_front.png",
        other: {
          "official-artwork": {
            front_default: undefined as any,
          },
        },
      },
    };
    render(<PokemonCard pokemon={pokemonWithFallbackImage} />);
    expect(screen.getByRole("img", { name: "bulbasaur" })).toHaveAttribute("src", "https://example.com/bulbasaur_front.png");
  });

  it("renders the fallback getOfficialArtworkUrl image when both sprites are missing", () => {
    const pokemonWithNoSprites: Pokemon = {
      ...mockPokemon,
      sprites: {
        front_default: undefined as any,
      },
    };
    render(<PokemonCard pokemon={pokemonWithNoSprites} />);
    expect(screen.getByRole("img", { name: "bulbasaur" })).toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    );
  });

  it("renders hidden abilities when present", () => {
    const pokemonWithHiddenAbilities: Pokemon = {
      ...mockPokemon,
      abilities: [
        {
          ability: { name: "overgrow", url: "" },
          is_hidden: false,
        },
        {
          ability: { name: "chlorophyll", url: "" },
          is_hidden: true,
        },
      ],
    };
    render(<PokemonCard pokemon={pokemonWithHiddenAbilities} />);
    expect(screen.getByText("Hidden Ability")).toBeInTheDocument();
    expect(screen.getByText("chlorophyll")).toBeInTheDocument();
  });
});

