import { Meta, StoryObj } from '@storybook/react';
import { OverflowToolTip } from './OverflowTooltip.component';

const meta = {
    title: 'OverflowToolTip',
    component: OverflowToolTip,
} satisfies Meta<typeof OverflowToolTip>;

export default meta;
type Story = StoryObj<typeof OverflowToolTip>;

export const NoDataFoundComp: Story = {
    args: {
        children: (
            <div style={{ width: '200px' }}>
                Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
            </div>
        ),
        title: 'OverFlow Tooltip',
    },
};
