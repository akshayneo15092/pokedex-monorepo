import React from "react";
import { render, screen } from "@testing-library/react";
import { PokemonCard } from "../src/stories/PokemonCard";

const props = {
  id: 1,
  name: "Bulbasaur",
  image: "https://example.com/bulbasaur.png",
  type: "grass",
};

describe("PokemonCard", () => {
  it("renders the pokemon name", () => {
    render(<PokemonCard {...props} />);
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
  });

  it("renders the pokemon id", () => {
    render(<PokemonCard {...props} />);
    expect(screen.getByText("#1")).toBeInTheDocument();
  });

  it("renders the type chip", () => {
    render(<PokemonCard {...props} />);
    expect(screen.getByText("grass")).toBeInTheDocument();
  });

  it("renders the pokemon image with correct src", () => {
    render(<PokemonCard {...props} />);
    expect(screen.getByRole("img")).toHaveAttribute("src", props.image);
  });
});
