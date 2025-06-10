import { GetRankingResponse } from '@/types/ranking';
import { apiInstance } from '.';

export const getCountryRanking = async (): Promise<GetRankingResponse> => {
  const response = await apiInstance.get('/ranking/countries');
  return response.data;
};

export const getCityRanking = async (): Promise<GetRankingResponse> => {
  const response = await apiInstance.get('/ranking/cities');
  return response.data;
};
