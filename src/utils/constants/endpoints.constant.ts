export const ENDPOINT_PARAM_NAME = {
    promptId: ':promptId',
};

const PROMPT_LIBRARY = '/prompt_lib';

export const API_BASE_URL = import.meta.env.VITE_BASE_API;

export const ENDPOINTS = {
    textGeneration: 'text/generation',
    imageGeneration: 'image/generation',
    promptList: `${PROMPT_LIBRARY}/list`,
    promptAdd: `${PROMPT_LIBRARY}/add`,
    promptUpdate: `${PROMPT_LIBRARY}/update/${ENDPOINT_PARAM_NAME.promptId}`,
    promptDelete: `${PROMPT_LIBRARY}/delete/${ENDPOINT_PARAM_NAME.promptId}`,
    tokenCount: '/token_count',
};
