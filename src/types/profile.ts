// ========== 프로필 관련 타입 ==========
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
  lifeSatisfaction: number;
  safety: number;
}

export interface Weights {
  languageWeight: number;
  qolWeight: number;
  jobWeight: number;
}

// ========== 국가 추천 관련 타입 ==========
// 사용자 프로필 등록 요청 데이터 - 1단계
export interface PostCountryRecommendationPayload {
  language: string;
  qualityOfLifeWeights: QualityOfLifeWeights;
  desiredJob: string;
  languageWeight: number;
  qualityOfLifeWeight: number;
  jobWeight: number;
  additionalNotes?: string;
}

// 사용자 프로필 등록 결과 응답 - 1단계
export interface PostCountryRecommendationResponse {
  message: string;
  data?: {
    profileId: string;
  };
}

export interface Country {
  name: string;
  code: string;
  region: string;
  languages: string[];
  population: number;
  employmentRate?: number;
}

export interface CountryRecommendation {
  rank: number;
  country: Country;
  totalScore: number;
  breakdown: {
    languageScore: number;
    jobScore: number;
    qualityOfLifeScore: number;
    appliedWeights: {
      language: number;
      job: number;
      qualityOfLife: number;
    };
  };
  reasons: string[];
}

// 프로필 기반 국가 추천 결과 응답 데이터
export interface GetCountryRecommendationResponseData {
  isExisting: boolean;
  recommendationId: string;
  profileId: string;
  recommendations: CountryRecommendation[];
  timestamp: string;
}

// 프로필 기반 국가 추천 결과 응답
export interface GetCountryRecommendationResponse {
  success: boolean;
  message: string;
  data: GetCountryRecommendationResponseData;
}

// ========== 도시 추천 관련 타입 ==========
// 도시 추천 리스트 요청 데이터 - 2단계
export interface PostCityRecommendationPayload {
  selectedCountryIndex: number;
}

export interface CityRecommendation {
  name: string;
  summary: string;
}

// 도시 추천 결과 응답 데이터 - 2단계
export interface PostCityRecommendationResponseData {
  isExisting: boolean;
  inputId: string;
  selectedCountry: number;
  recommendedCities: CityRecommendation[];
}

// 도시 추천 결과 응답 - 2단계
export interface PostCityRecommendationResponse {
  code: number;
  message: string;
  data: PostCityRecommendationResponseData;
}

// ========== 시뮬레이션 관련 타입 ==========
// 시뮬레이션 결과 요청 - 3단계
export interface PostSimulationPayload {
  selectedCityIndex: number;
  initialBudget: string;
  requiredFacilities: string[];
  departureAirport: string;
}

// (1) 필수 시설 및 생활 정보
export interface LocalInfo {
  essentialFacilities: string[];
  publicTransport: string;
  safetyLevel: string;
  climateSummary: string;
  koreanCommunity: string;
  culturalTips: string;
  warnings: string;
}

// (2) 예상 월 생활비
export interface EstimatedMonthlyCost {
  housing: string;
  food: string;
  transportation: string;
  etc: string;
  total: string;
  oneYearCost: string;
  costCuttingTips: string;
  cpi: string;
}

// (3) 초기 정착 관련 정보
export interface InitialSetup {
  shortTermHousingOptions: string[];
  longTermHousingPlatforms: string[];
  mobilePlan: string;
  bankAccount: string;
}

// (4) 취업 관련 현실 정보
export interface JobReality {
  jobSearchPlatforms: string[];
  languageRequirement: string;
  visaLimitationTips: string;
}

// (5) 문화 적응 및 커뮤니티 정보
export interface CulturalIntegration {
  koreanPopulationRate: string;
  foreignResidentRatio: string;
  koreanResourcesLinks: string[];
}

// (6) 전체 시뮬레이션 결과
export interface SimulationResult {
  country: string;
  recommendedCity: string;
  localInfo: LocalInfo;
  estimatedMonthlyCost: EstimatedMonthlyCost;
  initialSetup: InitialSetup;
  jobReality: JobReality;
  culturalIntegration: CulturalIntegration;
}

// (7) 항공권 관련 링크
export interface FlightLinks {
  googleFlights: string;
  skyscanner: string;
}

export interface PostSimulationResponseData {
  simulationId: string;
  result: SimulationResult;
  flightLinks: FlightLinks;
}

export interface PostSimulationResponse {
  code: number;
  message: string;
  data: PostSimulationResponseData;
}
