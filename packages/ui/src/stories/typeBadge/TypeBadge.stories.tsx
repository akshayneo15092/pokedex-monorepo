import type { Meta, StoryObj } from '@storybook/react';
import { TypeBadge } from './TypeBadge';

const meta: Meta<typeof TypeBadge> = {
  title: 'UI/TypeBadge',
  component: TypeBadge,
};
export default meta;
type Story = StoryObj<typeof TypeBadge>;

export const Fire: Story = { args: { type: 'fire' } };
export const Water: Story = { args: { type: 'water' } };
export const Grass: Story = { args: { type: 'grass' } };
export const Electric: Story = { args: { type: 'electric' } };
export const Psychic: Story = { args: { type: 'psychic' } };
export const Dragon: Story = { args: { type: 'dragon' } };
export const Unknown: Story = { args: { type: 'unknown' } };
export const Large: Story = { args: { type: 'fire', size: 'medium' } };
