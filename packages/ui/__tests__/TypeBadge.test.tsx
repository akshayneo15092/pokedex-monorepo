import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TypeBadge } from "../src/stories/typeBadge/TypeBadge";

describe("TypeBadge", () => {
  it("renders type badge with capitalized label", () => {
    render(<TypeBadge type="fire" />);
    expect(screen.getByText("Fire")).toBeInTheDocument();
  });

  it("uses small size as default when size prop is not provided", () => {
    render(<TypeBadge type="water" />);
    const chip = screen.getByText("Water").closest(".MuiChip-root");
    expect(chip).toHaveClass("MuiChip-sizeSmall");
  });

  it("uses custom size if size prop is provided", () => {
    render(<TypeBadge type="grass" size="medium" />);
    const chip = screen.getByText("Grass").closest(".MuiChip-root");
    expect(chip).toHaveClass("MuiChip-sizeMedium");
  });

  it("uses fallback background color for unknown types", () => {
    render(<TypeBadge type="unknown" />);
    const chip = screen.getByText("Unknown").closest(".MuiChip-root");
    expect(chip).toHaveStyle({ backgroundColor: "#A8A878" });
  });

  it("uses correct background color for known types", () => {
    render(<TypeBadge type="electric" />);
    const chip = screen.getByText("Electric").closest(".MuiChip-root");
    expect(chip).toHaveStyle({ backgroundColor: "#F8D030" });
  });
});
