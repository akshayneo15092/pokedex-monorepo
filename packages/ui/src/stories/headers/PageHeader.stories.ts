import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./PageHeader";

const meta: Meta<typeof PageHeader> = {
  title: "UI/PageHeader",
  component: PageHeader,
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Pokedex: Story = {
  args: {
    title: "Pokedex",
    subtitle: "Explore all Pokemon",
  },
};

export const DetailsPage: Story = {
  args: {
    title: "Pokemon Details",
    subtitle: "Detailed Pokemon information",
  },
};