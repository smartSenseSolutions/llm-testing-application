import { ApiResponse } from '@patent-app/types/Api.type';
import { PromptSorting, Prompt } from '@patent-app/types/Prompt.type';
import { apiCall } from '@patent-app/utils/api-manager';
import { ENDPOINTS, ENDPOINT_PARAM_NAME } from '@patent-app/utils/constants/endpoints.constant';
import { parseEndpoint } from '@patent-app/utils/helpers/common.helper';

type PromptListReqParams = PromptSorting & {
    search: string;
    pageNumber: number;
    recordsPerPage: number;
    showAll: boolean;
};

export const PromptApi = {
    delete: (promptId: string): Promise<ApiResponse<Record<string, unknown>>> =>
        apiCall({
            method: 'DELETE',
            url: parseEndpoint(ENDPOINTS.promptDelete, {
                [ENDPOINT_PARAM_NAME.promptId]: promptId,
            }),
        }),
    getList: (requestBody: PromptListReqParams): Promise<ApiResponse<Prompt[]>> =>
        apiCall({ method: 'POST', url: ENDPOINTS.promptList, data: requestBody }),

    add: (requestBody: Prompt): Promise<ApiResponse<Record<string, unknown>>> =>
        apiCall({ method: 'POST', url: ENDPOINTS.promptAdd, data: requestBody }),

    update: (requestBody: Partial<Prompt>, id: string): Promise<ApiResponse<Record<string, unknown>>> =>
        apiCall({
            method: 'PUT',
            url: parseEndpoint(ENDPOINTS.promptUpdate, { [ENDPOINT_PARAM_NAME.promptId]: id }),
            data: requestBody,
        }),
};
