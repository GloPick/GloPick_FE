import {
  PostCountryRecommendationPayload,
  PostCountryRecommendationResponse,
} from '@/types/profile';
import { apiInstance } from './index';

export const postCountryRecommendation = async (
  data: PostCountryRecommendationPayload,
  token: string,
): Promise<PostCountryRecommendationResponse> => {
  const response = await apiInstance.post(`/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getCountryRecommendation = async (profileId: string, token: string) => {
  const response = await apiInstance.get(`/country-recommendations/${profileId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
