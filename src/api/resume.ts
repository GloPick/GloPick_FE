import { apiInstance } from './index';
import { ResumeData, PostProfileResponse, GetProfileResponse } from '@/types/resume';

export const postResume = async (
  data: ResumeData,
  token: string | null,
): Promise<PostProfileResponse> => {
  const response = await apiInstance.post('/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getResume = async (token: string): Promise<GetProfileResponse> => {
  const response = await apiInstance.get('/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
