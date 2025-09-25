export type PriorityKey = 'language' | 'salary' | 'job';

export interface JobField {
  code: string;
  nameKo: string;
  nameEn: string;
}

export interface Priorities {
  first: PriorityKey;
  second: PriorityKey;
  third: PriorityKey;
}

export interface PostCountryRecommendationPayload {
  language: string;
  expectedSalary: number;
  jobField: JobField;
  priorities: Priorities;
}

export interface PostCountryRecommendationResponseData {
  rank: number;
  totalScore: number;
  country: {
    name: string;
    code: string;
  };
}
export interface PostCountryRecommendationResponse {
  success: boolean;
  message: string;
  data: {
    isExisting: boolean;
    recommendationId: string;
    profileId: string;
    recommendations: PostCountryRecommendationResponseData[];
    timestamp: string;
  };
}

export interface ProfileFormData {
  // 1단계: 기본 정보
  language: string;
  expectedSalary: number;
  jobField: JobField;
  priorities: Priorities;

  // // 2단계: 추천받은 국가 정보
  // recommendedCountries: PostCountryRecommendationResponseData[];
  // selectedCountry: PostCountryRecommendationResponseData | null;

  // // 3단계: 카테고리 선택
  // selectedCategory: 'security' | 'environment' | 'employment' | 'infrastructure' | null;

  // // 4단계: 추천받은 도시 정보
  // recommendedCities: any[]; // TODO: 도시 타입 정의 필요
  // selectedCity: any | null;

  // // 5단계: 추가 정보
  // additionalInfo: {
  //   settlementBudget: number;
  //   hasVisa: boolean;
  //   departureAirport: string;
  // };
}
