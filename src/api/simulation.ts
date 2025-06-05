import {
  PostCountryResponse,
  GetCountryResponse,
  PostSimulationFormPayloadData,
  PostSimulationFormResponse,
  PostCityResponse,
  PostSimulationResponse,
  GetScoreResponse,
} from '@/types/simulation';
import { apiInstance } from './index';

// GPT 국가 추천 생성
export const postCountryRecommend = async (
  profileId: string,
  token: string,
): Promise<PostCountryResponse> => {
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

// GPT 국가 추천 조회
export const getCountryRecommend = async (token: string): Promise<GetCountryResponse> => {
  const response = await apiInstance.get('/mypage/recommendations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// 시뮬레이션 입력 정보 저장
export const postSimulationForm = async (
  recommendationId: string,
  profileId: string,
  data: PostSimulationFormPayloadData,
  token: string,
): Promise<PostSimulationFormResponse> => {
  const response = await apiInstance.post(`/simulation/${recommendationId}/${profileId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// GPT 도시 추천 생성
export const postCityRecommend = async (
  inputId: string,
  token: string,
): Promise<PostCityResponse> => {
  const response = await apiInstance.post(
    `/simulation/${inputId}/cities`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// 최종 시뮬레이션
export const postSimulationResult = async (
  inputId: string,
  selectedCityIndex: number,
  token: string,
): Promise<PostSimulationResponse> => {
  const response = await apiInstance.post(
    `/simulation/${inputId}/gpt`,
    { selectedCityIndex },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
};

// 취업 가능성, 이주 추천도 계산
export const getSimulationScore = async (
  simulationId: string,
  token: string,
): Promise<GetScoreResponse> => {
  const response = await apiInstance.get(`/simulation/scores/${simulationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
