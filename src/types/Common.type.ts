export type Language = {
    key: string;
    name?: string;
};

export type IconType = {
    width?: number;
    height?: number;
    fill?: string;
    fill1?: string;
    className?: string;
    stroke?: string;
};

export interface KeyValueType {
    target_model: string;
    query: string;
}

export interface KeyValueType {
    [key: string]: string;
}

export interface ValuesType {
    [key: string]: ValuesMessageType[];
}

export interface ValuesMessageType {
    key: string;
    msg: string;
}

export type ExpandedSection = 'figure' | 'text' | 'draft' | '';

export type Model = 'Llama-2-70b-chat-hf' | 'Mixtral-8x7B-Instruct-v0.1' | 'gpt-4-8k';

export type Item = {
    label: string | number;
    value: string | number;
};
