import { apiInstance } from './index';
import { LoginData, LoginResponse } from '@/types/auth';
import { ApiResponse } from '@/types/api';

export const postLogin = async (data: LoginData): Promise<ApiResponse<LoginResponse>> => {
  const response = await apiInstance.post('/auth/login', data);
  return response.data;
};
