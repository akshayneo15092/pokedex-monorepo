import type { Meta, StoryObj } from "@storybook/react";
import { CustomButton } from "./CustomButton";

const meta: Meta<typeof CustomButton> = {
  title: "UI/Button",
  component: CustomButton,
};

export default meta;

type Story = StoryObj<typeof CustomButton>;

export const Primary: Story = {
  args: {
    label: "Catch Pokemon",
  },
};

export const Disabled: Story = {
  args: {
    label: "Catch Pokemon",
    disabled: true,
  },
};