import {
  GetCountryRecommendationResponse,
  PostCityRecommendationPayload,
  PostCityRecommendationResponse,
  PostCountryRecommendationPayload,
  PostCountryRecommendationResponse,
  PostSimulationPayload,
  PostSimulationResponse,
} from '@/types/recommendation';
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

// 선택한 국가 기반 도시 추천
export const postCityRecommendation = async (
  recommendationId: string,
  profileId: string,
  token: string,
  data: PostCityRecommendationPayload,
): Promise<PostCityRecommendationResponse> => {
  const response = await apiInstance.post(
    `/simulation/recommend-cities/${recommendationId}/${profileId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// 선택한 도시 기반 시뮬레이션
export const postSimulation = async (
  inputId: string,
  data: PostSimulationPayload,
  token: string,
): Promise<PostSimulationResponse> => {
  const response = await apiInstance.post(`/simulation/input/${inputId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
