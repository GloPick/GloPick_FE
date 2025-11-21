export interface Location {
  lat: number;
  lng: number;
}

export interface MapRequestPayload {
  city: string;
  country: string;
  facilities: string[];
}

// 개별 시설 정보
interface FacilityItem {
  name: string;
  address: string;
  location: Location;
  placeId: string;
  rating: number;
  types: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // 나머지 동적 필드
}

// 시설 종류별 위치 목록
export interface FacilityLocations {
  [koreanLabel: string]: FacilityItem[];
}

export interface MapResponseData {
  mapCenter: Location;
  facilityLocations: FacilityLocations;
}

export interface PostMapDataResponse {
  success: boolean;
  code: number;
  message: string;
  data: MapResponseData;
}
