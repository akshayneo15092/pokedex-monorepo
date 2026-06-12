import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { StatBar } from "../src/stories/statBar/StatBar";

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

  it("sets the correct aria value on the progress bar for high values (>=80)", () => {
    render(<StatBar label="Attack" value={80} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "80");
  });

  it("sets the correct aria value on the progress bar for medium values (50-79)", () => {
    render(<StatBar label="Defense" value={60} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "60");
  });

  it("sets the correct aria value on the progress bar for low values (<50)", () => {
    render(<StatBar label="Speed" value={30} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "30");
  });
});

