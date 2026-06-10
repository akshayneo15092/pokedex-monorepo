import type { Meta, StoryObj } from "@storybook/react";
import { ErrorState } from "./ErrorState";

const meta: Meta<typeof ErrorState> = {
  title: "UI/ErrorState",
  component: ErrorState,
};

export default meta;

type Story = StoryObj<typeof ErrorState>;

export const NetworkError: Story = {
  args: {
    message: "Failed to load Pokemon.",
  },
};

export const ApiError: Story = {
  args: {
    message: "Pokemon service unavailable.",
  },
};