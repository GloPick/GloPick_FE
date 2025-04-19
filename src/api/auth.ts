import { apiInstance } from './index';
import { LoginData, LoginResponse, SignupData, SignupResponse } from '@/types/auth';
import { ApiResponse } from '@/types/api';

export const postLogin = async (data: LoginData): Promise<ApiResponse<LoginResponse>> => {
  const response = await apiInstance.post('/auth/login', data);
  return response.data;
};

export const postSignup = async (data: SignupData): Promise<ApiResponse<SignupResponse>> => {
  const response = await apiInstance.post('/auth/register', data);
  return response.data;
};
