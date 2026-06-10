import React from "react";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "../src/stories/EmptyState";

describe("EmptyState", () => {
  it("renders the heading text", () => {
    render(<EmptyState />);
    expect(screen.getByText("No Pokémon Found")).toBeInTheDocument();
  });

  it("renders the subtext", () => {
    render(<EmptyState />);
    expect(screen.getByText("Try another search.")).toBeInTheDocument();
  });
});
