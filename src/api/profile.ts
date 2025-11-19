import {
  GetProfileResponse,
  GetSimulationResponse,
  GetSimulationSummaryResponse,
  PutProfilePayload,
  PutProfileResponse,
} from '@/types/profile';
import { apiInstance } from '.';

// 사용자 등록 프로필 조회
export const getProfile = async (token: string): Promise<GetProfileResponse> => {
  const response = await apiInstance.get(`/mypage/profiles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 사용자 등록 프로필 삭제
export const deleteProfile = async (profileId: string, token: string) => {
  const response = await apiInstance.delete(`/mypage/profiles/${profileId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 사용자 등록 프로필 수정
export const putProfile = async (
  profileId: string,
  data: PutProfilePayload,
  token: string,
): Promise<PutProfileResponse> => {
  const response = await apiInstance.put(`/mypage/profiles/${profileId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 시뮬레이션 목록 조회
export const getSimulations = async (token: string): Promise<GetSimulationResponse> => {
  const response = await apiInstance.get(`/mypage/simulations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 시뮬레이션 요약 리스트 조회
export const getSimulationSummary = async (
  token: string,
): Promise<GetSimulationSummaryResponse> => {
  const response = await apiInstance.get(`/mypage/simulations/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
