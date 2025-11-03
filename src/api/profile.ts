import {
  GetCountryRecommendationResponse,
  PostCountryRecommendationPayload,
  PostCountryRecommendationResponse,
} from '@/types/profile';
import { apiInstance } from './index';

// 사용자 프로필 등록
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

// 사용자 프로필 기반 국가 추천 결과 조회
export const getCountryRecommendation = async (
  profileId: string,
  token: string,
): Promise<GetCountryRecommendationResponse> => {
  const response = await apiInstance.get(`/country-recommendations/${profileId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
