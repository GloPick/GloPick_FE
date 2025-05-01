import { apiInstance } from './index';
import {
  ResumeData,
  PostProfileResponse,
  GetProfileResponse,
  DeleteProfileResponse,
  EditProfileResponse,
} from '@/types/resume';

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

export const deleteResume = async (id: string, token: string): Promise<DeleteProfileResponse> => {
  const response = await apiInstance.delete(`/profile/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const editResume = async (
  id: string,
  updatedData: ResumeData,
  token: string,
): Promise<EditProfileResponse> => {
  const response = await apiInstance.put(`/profile/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
