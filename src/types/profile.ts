export type Weights = {
  salary: number;
  job: number;
  language: number;
};

export type InputFormState = {
  jobCategory: string;
  desiredSalary: string;
  language: string;
};

// 국가 추천 결과 요청 데이터 - 1단계
export interface PostCountryRecommendationPayload {
  jobCategory: string;
  desiredSalary: number; // API 전송을 위해 number 타입으로 변환
  language: string;
  weights: Weights;
}

// 국가 추천 결과 응답 데이터 - 1단계
export interface PostCountryRecommendationResponseData {
  countryCode: string; // 국가 코드 (예: "US", "KR")
  countryName: string; // 국가 이름 (예: "United States", "South Korea")
  score: number; // 추천 점수 (예: 85.5)
  rank: number; // 추천 순위 (예: 1, 2, 3 ...)
  details: {
    salaryScore: number; // 연봉 관련 점수
    jobMatchScore: number; // 직무 매칭 관련 점수
    languageMatchScore: number; // 언어 매칭 관련 점수
  };
}

// 국가 추천 결과 응답 - 1단계
export interface PostCountryRecommendationResponse {
  success: boolean;
  message: string;
  data: {
    countries: PostCountryRecommendationResponseData[];
  };
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
