import type { Meta, StoryObj } from "@storybook/react";
import { StatBar } from "./StatBar";

const meta: Meta<typeof StatBar> = {
  title: "UI/StatBar",
  component: StatBar,
};

export default meta;

type Story = StoryObj<typeof StatBar>;

export const HP: Story = {
  args: {
    label: "HP",
    value: 80,
  },
};

export const Attack: Story = {
  args: {
    label: "Attack",
    value: 95,
  },
};

export const Defense: Story = {
  args: {
    label: "Defense",
    value: 60,
  },
};