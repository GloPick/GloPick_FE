import { PostProfilePayloadData } from './resume';

// GPT 국가 추천 생성, POST
export interface CountryRanking {
  country: string;
  job: string;
  reason: string;
}

export interface PostCountryResponseData {
  gptResponse: {
    rankings: CountryRanking[];
  };
  recommendationId: string;
}

export interface PostCountryResponse {
  code: number;
  message: string;
  data:
    | PostCountryResponseData
    | {
        recommendationId: string;
        profileId: string;
      };
}

// GPT 국가 추천 조회, GET
export interface GetCountryResponseData {
  recommendationId: string;
  profileId: string;
  profile: PostProfilePayloadData;
  rankings: CountryRanking[];
}

export interface GetCountryResponse {
  code: number;
  message: string;
  data: GetCountryResponseData[];
}

// 추가 정보 입력 생성 및 저장, POST
export interface PostSimulationFormPayloadData {
  selectedRankIndex: number;
  budget: number;
  duration: string;
  languageLevel: '능숙' | '기초' | '통역 필요';
  hasLicense: boolean;
  jobTypes: string[];
  requiredFacilities: string[];
  accompanyingFamily: string[];
  visaStatus: string[];
  additionalNotes?: string;
  departureAirport: string;
}

export interface PostSimulationFormResponseData {
  inputId: string; // 도시 추천 시 넘겨줄 파라미터
  selectedCountry: string;
  budget: number;
  duration: string;
  languageLevel: '능숙' | '기초' | '통역 필요';
  hasLicense: boolean;
  jobTypes: string[];
  requiredFacilities: string[];
  accompanyingFamily: string[];
  visaStatus: string[];
  additionalNotes?: string;
  departureAirport: string;
}

export interface PostSimulationFormResponse {
  code: number;
  message: string;
  data: PostSimulationFormResponseData | { inputId: string };
}

// GPT 도시 추천 응답 데이터 타입
export interface PostCityResponseData {
  name: string;
  summary: string;
}

export interface FallbackCityResponseData {
  recommendedCities: string[];
  inputId: string;
}

export interface PostCityResponse {
  code: number;
  message: string;
  data: PostCityResponseData[] | FallbackCityResponseData;
}

// 최종 시뮬레이션
export interface PostSimulationPayloadData {
  selectedCityIndex: number;
}

export interface SimulationResultData {
  country: string;
  recommendedCity: string;
  localInfo: {
    publicTransport: string;
    safetyLevel: string;
    climateSummary: string;
    essentialFacilities: string[];
  };
  initialSetup: {
    shortTermHousingOptions: string[];
    longTermHousingPlatforms: string[];
  };
  jobReality: {
    commonJobs: string[];
    jobSearchPlatforms: string[];
  };
  culturalIntegration: {
    koreanResourcesLinks: string[];
    culturalIntegrationPrograms: string[];
  };
  employmentProbability: number;
  migrationSuitability: number;
}

export interface PostSimulationResponseData {
  simulationId: string;
  result: SimulationResultData;
  flightLinks: {
    googleFlights: string;
    skyscanner: string;
  };
}

export interface PostSimulationResponse {
  code: number;
  message: string;
  data: PostSimulationResponseData;
}
