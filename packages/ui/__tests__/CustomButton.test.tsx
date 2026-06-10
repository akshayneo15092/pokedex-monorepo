import "@testing-library/jest-dom";
import { render, screen  } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { CustomButton } from "../src/stories/buttons/CustomButton";

describe("CustomButton", () => {
  it("renders the label", () => {
    render(<CustomButton label="Click me" />);

    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();

    render(
      <CustomButton
        label="Click me"
        onClick={onClick}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Click me" })
    );

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <CustomButton
        label="Click me"
        disabled
      />
    );

    expect(
      screen.getByRole("button")
    ).toBeDisabled();
  });

  it("does not call onClick when disabled", () => {
    const onClick = jest.fn();

    render(
      <CustomButton
        label="Click me"
        onClick={onClick}
        disabled
      />
    );

    fireEvent.click(
      screen.getByRole("button")
    );

    expect(onClick).not.toHaveBeenCalled();
  });
});