import {
  PostCountryRecommendationPayload,
  PostCountryRecommendationResponse,
} from '@/types/profile';
import { apiInstance } from './index';

export const postCountryRecommendation = async (
  data: PostCountryRecommendationPayload,
  token: string,
): Promise<PostCountryRecommendationResponse> => {
  const response = await apiInstance.post(`/country-recommendations`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
