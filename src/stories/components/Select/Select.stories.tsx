import { ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select.component';
import { TEXT_DEFAULT_LIST } from '@patent-app/utils/constants/common.constant';

const meta = {
    title: 'Form Controls/Select',
    component: Select,
    tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const RenderSelect = (props: ComponentProps<typeof Select>) => {
    const [value, setValue] = useState(props.value);

    return <Select {...props} value={value} onChange={(event) => setValue(event.target.value as string)} />;
};

export const Default: Story = {
    render: RenderSelect,
    args: {
        options: TEXT_DEFAULT_LIST,
        value: TEXT_DEFAULT_LIST[0].value,
    },
};

export const SelectWithLabel: Story = {
    render: RenderSelect,
    args: {
        options: TEXT_DEFAULT_LIST,
        value: TEXT_DEFAULT_LIST[0].value,
        label: 'Select Model',
    },
};
