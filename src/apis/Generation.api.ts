import { ApiResponse } from '@patent-app/types/Api.type';
import { Model } from '@patent-app/types/Common.type';
import { apiCall } from '@patent-app/utils/api-manager';
import { ENDPOINTS } from '@patent-app/utils/constants/endpoints.constant';

export interface GenerationModel {
    target_model: string;
    deployment_environment: string;
    max_new_tokens: number;
    stream: boolean;
    temperature: number;
    top_p: number;
    query: string;
    render_image: boolean;
}

export interface GenerateResponse {
    generated_text?: string;
    generated_images?: string;
    base64_text?: string;
    svg_parsed_text?: string;
}
type TokenRequestBody = {
    data: string;
    model_name: Model;
};

export const GenerationApi = {
    getImage: (requestBody: GenerationModel): Promise<ApiResponse<GenerateResponse>> =>
        apiCall({ method: 'POST', url: ENDPOINTS.imageGeneration, data: requestBody }),
    getModelTokenCount: (requestBody: TokenRequestBody): Promise<ApiResponse<{ token_count: number }>> =>
        apiCall({ method: 'POST', url: ENDPOINTS.tokenCount, data: requestBody, showLoader: false }),
};
