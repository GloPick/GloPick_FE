export interface SimulationRequestData {
  recommendationId: string;
  selectedRankIndex: number;
  profileId: string;
  budget: number;
  duration: string;
  languageLevel: '능숙' | '기초' | '통역 필요';
  hasLicense: boolean;
  jobTypes: string[];
  requiredFacilities: string[];
  accompanyingFamily: string[];
  visaStatus: string[];
  departureAirport: string;
  additionalNotes?: string;
}

export interface SimulationResponse {
  code: number;
  message: string;
  data: {
    _id: string; // 시뮬레이션 ID
    user: string;
    profile: string;
    selectedCountry: string;
    budget: number;
    duration: string;
    languageLevel: string;
    hasLicense: boolean;
    jobTypes: string[];
    requiredFacilities: string[];
    accompanyingFamily: string[];
    visaStatus: string[];
    additionalNotes?: string;
    departureAirport: string;
    recommendedCities: string[]; // GPT가 추후 추천할 도시
  };
}
