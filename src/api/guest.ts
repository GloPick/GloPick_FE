import { PostGuestCountryPayloadData, PostGuestCountryResponse } from '@/types/guest';
import { apiInstance } from '.';

export const postGuestCountry = async (
  profile: PostGuestCountryPayloadData,
): Promise<PostGuestCountryResponse> => {
  const response = await apiInstance.post('/guest/recommend', profile);
  return response.data;
};
