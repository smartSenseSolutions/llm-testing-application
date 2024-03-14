import type { Meta, StoryObj } from '@storybook/react';
import { Rating as RatingComp } from './Rating.component';

const meta = {
    title: 'Rating',
    component: RatingComp,
    tags: ['autodocs'],
} satisfies Meta<typeof RatingComp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rating: Story = {
    args: {
        precision: 0.5,
    },
};
