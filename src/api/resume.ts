import { apiInstance } from './index';
import { ResumeData } from '@/types/resume';
import { PostProfileResponse } from '@/types/api';

export const postResumeProfile = async (data: ResumeData): Promise<PostProfileResponse> => {
  const response = await apiInstance.post('/profile', data, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  return response.data;
};
