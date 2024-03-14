import type { Meta, StoryObj } from '@storybook/react';
import { FullPageError as FullPageErrorComp } from './FullPageError.component';

const meta: Meta<typeof FullPageErrorComp> = {
    title: 'Utility/FullPageError',
    component: FullPageErrorComp,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FullPageErrorComp>;

export const FullPageError: Story = {};
