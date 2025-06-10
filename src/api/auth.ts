import { apiInstance } from './index';
import {
  GetUserInfoResponse,
  LoginData,
  LoginResponse,
  PutUserInfoPayloadData,
  PutUserInfoResponse,
  SignupData,
  SignupResponse,
} from '@/types/auth';
import { ApiResponse } from '@/types/api';

export const postLogin = async (data: LoginData): Promise<ApiResponse<LoginResponse>> => {
  const response = await apiInstance.post('/auth/login', data);
  return response.data;
};

export const postSignup = async (data: SignupData): Promise<ApiResponse<SignupResponse>> => {
  const response = await apiInstance.post('/auth/register', data);
  return response.data;
};

// 사용자 정보 조회
export const getUserInfo = async (token: string): Promise<GetUserInfoResponse> => {
  const response = await apiInstance.get(`/mypage/account`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 사용자 정보 수정
export const putUserInfo = async (
  data: PutUserInfoPayloadData,
  token: string,
): Promise<PutUserInfoResponse> => {
  const response = await apiInstance.put(`/mypage/account`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 사용자 회원 탈퇴
export const deleteUser = async (token: string) => {
  const response = await apiInstance.delete(`/mypage/account`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
