export interface GPTRecommendData {
  country: string;
  job: string;
  reason: string;
}

export interface GPTResponse {
  rankings: GPTRecommendData[];
}
