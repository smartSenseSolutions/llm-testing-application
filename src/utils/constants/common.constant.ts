import { Language } from '@patent-app/types/Common.type';
import { PromptSorting } from '@patent-app/types/Prompt.type';

export const LANGUAGES: Language[] = [
    { key: 'de', name: 'DE' },
    { key: 'en', name: 'EN' },
];

export const ERROR_STATUS_CODE = {
    401: 401,
    403: 403,
};

export const STATUS_CODE = {
    200: 200,
    409: 409,
} as const;

export const MODEL_TYPE = {
    LLAMA_70B: 'Llama-2-70b-chat-hf',
    MIXTRAL_8X: 'Mixtral-8x7B-Instruct-v0.1',
    GPT_4: 'gpt-4-8k',
};

export const MODEL_TEXT_LENGTH = {
    [MODEL_TYPE.LLAMA_70B]: 1500,
    [MODEL_TYPE.MIXTRAL_8X]: 15000,
    [MODEL_TYPE.GPT_4]: 15000,
};

export const TEXT_DEFAULT_LIST = [
    {
        label: 'Llama 70B',
        value: MODEL_TYPE.LLAMA_70B,
    },
    {
        label: 'Mixtral 8X 7B',
        value: MODEL_TYPE.MIXTRAL_8X,
    },
    {
        label: 'GPT 4',
        value: MODEL_TYPE.GPT_4,
    },
];

export const SECTION_LIST = [
    {
        label: 'Technical Field',
        value: 'Technical Field',
        key: 'technicalField',
    },
    {
        label: 'Technical Background',
        value: 'Technical Background',
        key: 'technicalBackground',
    },
    {
        label: 'Summary',
        value: 'Summary',
        key: 'summary',
    },
    {
        label: 'Embodiments',
        value: 'Embodiments',
        key: 'embodiments',
    },
    {
        label: 'Brief Description of the Drawings',
        value: 'Brief Description of the Drawings',
        key: 'briefDescriptionDrawings',
    },
    {
        label: 'Detailed Description',
        value: 'Detailed Description',
        key: 'detailedDescription',
    },
];

export enum InputChipsAddOnOption {
    Tab = 'Tab',
    Comma = ',',
    Enter = 'Enter',
}

export const CHIPS_OPTIONS = [InputChipsAddOnOption.Enter, InputChipsAddOnOption.Tab, InputChipsAddOnOption.Comma];

export const TIMEOUT = {
    STANDARD: 500,
    TOKEN_COUNT: 1000,
    TOAST: 5000,
};

export const EXPANDED_CLASS_NAME = 'expandedClassName';

export const MIME_TYPE = {
    RTF: 'application/rtf',
    MSWORD: 'application/msword',
};

export const PROMPT_SORT_BY_PARAMS: Record<string, PromptSorting> = {
    latestFirst: {
        sortBy: 'created_at',
        sortOrder: 'DESC',
    },
    oldestFirst: {
        sortBy: 'created_at',
        sortOrder: 'ASC',
    },
    lowToHighRatings: {
        sortBy: 'rating',
        sortOrder: 'ASC',
    },
    highToLowRatings: {
        sortBy: 'rating',
        sortOrder: 'DESC',
    },
};

export const PROMPT_SORT_BY_OPTIONS = [
    { label: 'Latest First', value: 'latestFirst' },
    { label: 'Oldest First', value: 'oldestFirst' },
    { label: 'Low to high ratings', value: 'lowToHighRatings' },
    { label: 'High to low ratings', value: 'highToLowRatings' },
];

export const PAGINATION_OPTIONS = [
    { label: 10, value: 10 },
    { label: 25, value: 25 },
    { label: 50, value: 50 },
    { label: 100, value: 100 },
];

export const DEFAULT_TEMPERATURE = 0.4;
