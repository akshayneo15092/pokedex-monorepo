import React from "react";
import { render, screen } from "@testing-library/react";
import { Loader } from "../src/stories/Loader";

describe("Loader", () => {
  it("renders loading text", () => {
    render(<Loader />);
    expect(screen.getByText("Loading Pokémon...")).toBeInTheDocument();
  });

  it("renders the progress indicator", () => {
    render(<Loader />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
