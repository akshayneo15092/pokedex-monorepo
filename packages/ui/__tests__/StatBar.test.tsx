import React from "react";
import { render, screen } from "@testing-library/react";
import { StatBar } from "../src/stories/StatBar";

describe("StatBar", () => {
  it("renders the label", () => {
    render(<StatBar label="HP" value={45} />);
    expect(screen.getByText("HP")).toBeInTheDocument();
  });

  it("renders the value", () => {
    render(<StatBar label="HP" value={45} />);
    expect(screen.getByText("45")).toBeInTheDocument();
  });

  it("renders the progress bar", () => {
    render(<StatBar label="HP" value={45} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets the correct aria value on the progress bar", () => {
    render(<StatBar label="Attack" value={80} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "80");
  });
});
