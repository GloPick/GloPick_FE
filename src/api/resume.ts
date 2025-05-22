import { apiInstance } from './index';
import {
  PostProfileResponse,
  GetProfileResponse,
  DeleteProfileResponse,
  EditProfileResponse,
  PostProfilePayloadData,
  EditProfilePayloadData,
} from '@/types/resume';

export const postResume = async (
  data: PostProfilePayloadData,
  token: string,
): Promise<PostProfileResponse> => {
  const response = await apiInstance.post('/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getResume = async (token: string): Promise<GetProfileResponse> => {
  const response = await apiInstance.get('/mypage/profiles', {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response.data);
  return response.data;
};

export const deleteResume = async (
  profileId: string,
  token: string,
): Promise<DeleteProfileResponse> => {
  const response = await apiInstance.delete(`/mypage/profiles/${profileId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const editResume = async (
  profileId: string,
  updatedData: EditProfilePayloadData,
  token: string,
): Promise<EditProfileResponse> => {
  const response = await apiInstance.put(`/mypage/profiles/${profileId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
