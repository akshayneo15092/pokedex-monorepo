import type { Meta, StoryObj } from '@storybook/react';
import { TypeBadge } from './TypeBadge';

const meta: Meta<typeof TypeBadge> = {
  title: 'UI/TypeBadge',
  component: TypeBadge,
  argTypes: {
    type: {
      control: 'select',
      options: [
        'fire',
        'water',
        'grass',
        'electric',
        'ice',
        'fighting',
        'poison',
        'ground',
        'flying',
        'psychic',
        'bug',
        'rock',
        'ghost',
        'dragon',
        'dark',
        'steel',
        'fairy',
        'normal',
      ],
      description: 'The type of Pokémon which determines the badge background color.',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: 'The size of the type badge.',
    },
  },
};
export default meta;
type Story = StoryObj<typeof TypeBadge>;

export const Fire: Story = { args: { type: 'fire' } };

