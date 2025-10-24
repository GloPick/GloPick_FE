export interface InputFormState {
  jobField: string;
  language: string;
}

export interface ISCOJobField {
  code: string;
  nameKo: string;
  nameEn: string;
}

export interface QualityOfLifeWeights {
  income: number;
  jobs: number;
  health: number;
  safety: number;
  lifeSatisfaction: number;
}

export interface Weights {
  languageWeight: number;
  qolWeight: number;
  jobWeight: number;
}

// 사용자 프로필 등록 요청 데이터 - 1단계
export interface PostCountryRecommendationPayload {
  language: string;
  qualityOfLifeWeights: QualityOfLifeWeights;
  desiredJob: string;
  languageWeight: number;
  qualityOfLifeWeight: number;
  jobWeight: number;
}

// 사용자 프로필 등록 결과 응답 - 1단계
export interface PostCountryRecommendationResponse {
  success: boolean;
  message: string;
  data?: {
    profileId: string;
  };
}

export interface Country {
  name: string;
  code: string;
}

export interface CountryRecommendation {
  rank: number;
  totalScore: number;
  country: Country;
}

// 프로필 기반 국가 추천 결과 응답 데이터
export interface GetCountryRecommendationResponseData {
  isExisting: boolean;
  recommendationId: string;
  profileId: string;
  recommendations: Array<CountryRecommendation>;
  timestamp: string;
}

// 프로필 기반 국가 추천 결과 응답
export interface GetCountryRecommendationResponse {
  success: boolean;
  message: string;
  data: GetCountryRecommendationResponseData;
}

// 도시 추천 리스트 요청 데이터 - 2단계
export interface PostCityRecommendationPayload {
  countryCode: string;
  category: 'Safety' | 'Environment' | 'Employment' | 'Infrastructure';
}

// 도시 추천 결과 응답 데이터 - 2단계
export interface PostCityRecommendationResponseData {
  cityName: string;
}

// 도시 추천 결과 응답 - 2단계
export interface PostCityRecommendationResponse {
  success: boolean;
  message: string;
  data: PostCityRecommendationResponseData[];
}

// 시뮬레이션 결과 요청 - 3단계
export interface PostSimulationPayload {
  countryCode: string;
  cityName: string;
}

export interface PostSimulationResponseData {
  monthlyCost: number; // 월 생활비 (KRW)
}

export interface PostSimulationResponse {
  success: boolean;
  message: string;
  data: PostSimulationResponseData;
}
