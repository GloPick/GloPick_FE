import { QualityOfLifeWeights, Weights } from './recommendation';

export interface PostGuestCountryPayloadData {
  language: string;
  desiredJob: string;
  qualityOfLifeWeights: QualityOfLifeWeights;
  weights: Weights;
}

export interface CountryInfo {
  name: string;
  code: string;
  region: string;
  languages: string[];
  population: number;
  gdpPerCapita: number;
  employmentRate: number;
}

export interface RecommendationBreakdown {
  languageScore: number;
  jobScore: number;
  qualityOfLifeScore: number;
  appliedWeights: {
    language: number;
    job: number;
    qualityOfLife: number;
  };
}

export interface SingleRecommendation {
  rank: number;
  country: CountryInfo;
  totalScore: number;
  breakdown: RecommendationBreakdown;
  reasons: string[];
}

export interface PostGuestCountryResponseData {
  userProfile: {
    language: string;
    desiredJob: string;
    qualityOfLifeWeights: {
      income: number;
      jobs: number;
      health: number;
      lifeSatisfaction: number;
      safety: number;
    };
    weights: {
      languageWeight: number;
      jobWeight: number;
      qualityOfLifeWeight: number;
    };
  };
  recommendations: SingleRecommendation[];
  appliedWeights: {
    languageWeight: number;
    jobWeight: number;
    qualityOfLifeWeight: number;
  };
  timestamp: string;
  note: string;
}

export interface PostGuestCountryResponse {
  success: boolean;
  message: string;
  data: PostGuestCountryResponseData;
}
