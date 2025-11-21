import { QualityOfLifeWeights, Weights } from './recommendation';

export interface GetProfileResponseData {
  profileId: string;
  language: string;
  desiredJob: string;
  qualityOfLifeWeights: QualityOfLifeWeights;
  weights: Weights;
  additionalNotes?: string;
}

export interface GetProfileResponse {
  code: number;
  message: string;
  data: GetProfileResponseData[];
}

// 사용자 등록 프로필 수정
export interface PutProfilePayload {
  language: string;
  desiredJob: string;
  qualityOfLifeWeights: QualityOfLifeWeights;
  weights: Weights;
}

export interface PutProfileResponse {
  code: number;
  message: string;
  data?: PutProfilePayload;
}

// 시뮬레이션 목록 조회
export interface GetSimulationResponseData {
  _id: string;
  input: SimulationInputData;
  country: string;
  result: SimulationResultDetailData;
}

export interface GetSimulationResponse {
  code: number;
  message: string;
  data: GetSimulationResponseData[];
}

export interface SimulationInputData {
  inputId: string;
  selectedCountry: string;
  selectedCity: string;
  initialBudget: string;
  requiredFacilities: string[]; // 필수 시설 목록
  departureAirport: string;
  recommendedCities: string[]; // 1단계 추천 도시 목록
}

// 시뮬레이션 결과 내 상세 정보 구조
export interface SimulationResultDetailData {
  recommendedCity: string;
  localInfo: {
    essentialFacilities: string[];
    publicTransport: string;
    safetyLevel: string;
    climateSummary: string;
    koreanCommunity: string;
    culturalTips: string;
    warnings: string;
  };
  estimatedMonthlyCost: {
    housing: string;
    food: string;
    transportation: string;
    etc: string;
    total: string;
    oneYearCost: string;
    costCuttingTips: string;
    cpi: string;
  };
  initialSetup: {
    shortTermHousingOptions: string[];
    longTermHousingPlatforms: string[];
    mobilePlan: string;
    bankAccount: string;
  };
  jobReality: {
    jobSearchPlatforms: string[];
    languageRequirement: string;
    visaLimitationTips: string;
  };
  culturalIntegration: {
    koreanPopulationRate: string;
    foreignResidentRatio: string;
    koreanResourcesLinks: string[];
  };
}

// 시뮬레이션 요약 리스트 조회
export interface GetSimulationSummaryResponseData {
  simmulationId: string;
  userId: string;
  job: string;
  country: string;
  city: string;
}

export interface GetSimulationSummaryResponse {
  code: number;
  message: string;
  data: GetSimulationSummaryResponseData[];
}
