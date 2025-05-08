import { ApiResponse } from '@/types/api';
import { GPTResponse } from '@/types/gpt';
import { apiInstance } from './index';

export const postGPTRecommend = async (
  profileId: string,
  token: string,
): Promise<ApiResponse<GPTResponse>> => {
  const response = await apiInstance.post(
    `/profile/${profileId}/gpt`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
