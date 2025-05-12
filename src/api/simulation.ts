import { apiInstance } from './index';
import { SimulationRequestData } from '@/types/simulation';
import { ApiResponse } from '@/types/api';

export const postSimulationInput = async (
  data: SimulationRequestData,
  token: string,
): Promise<ApiResponse<null>> => {
  const response = await apiInstance.post('/simulation/input', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
