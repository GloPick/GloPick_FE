import { apiInstance } from './index';
import { ResumeData, PostProfileResponse } from '@/types/resume';

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
