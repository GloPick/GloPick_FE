import { apiInstance } from '@/api';
import { MapRequestPayload, PostMapDataResponse } from '@/types/map';

/* 구글 맵 데이터 요청 및 시설 위치 조회 */
export const postMapData = async (data: MapRequestPayload) => {
  const response = await apiInstance.post<PostMapDataResponse>(
    '/simulation/test-google-maps',
    data,
  );
  return response.data;
};
