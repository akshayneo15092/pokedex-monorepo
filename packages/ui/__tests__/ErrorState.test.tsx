import React from "react";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { ErrorState } from "../src/stories/errorState/ErrorState";

describe("ErrorState", () => {
  it("renders the error message", () => {
    render(<ErrorState message="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders the retry button", () => {
    render(<ErrorState message="Error" />);
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", () => {
    const onRetry = jest.fn();
    render(<ErrorState message="Error" onRetry={onRetry} />);
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders without onRetry prop", () => {
    render(<ErrorState message="Error" />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
