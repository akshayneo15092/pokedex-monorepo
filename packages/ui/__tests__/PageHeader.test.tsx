import React from "react";
import { render, screen } from "@testing-library/react";
import { PageHeader } from "../src/stories/PageHeader";

describe("PageHeader", () => {
  it("renders the title", () => {
    render(<PageHeader title="Pokédex" />);
    expect(screen.getByText("Pokédex")).toBeInTheDocument();
  });

  it("renders the subtitle when provided", () => {
    render(<PageHeader title="Pokédex" subtitle="Browse all Pokémon" />);
    expect(screen.getByText("Browse all Pokémon")).toBeInTheDocument();
  });

  it("renders without subtitle", () => {
    render(<PageHeader title="Pokédex" />);
    expect(screen.getByText("Pokédex")).toBeInTheDocument();
  });
});
