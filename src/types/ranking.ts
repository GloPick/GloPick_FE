export interface RankingResponseData {
  name: string;
  count: number;
}

export interface GetRankingResponse {
  code: number;
  message: string;
  data: RankingResponseData[];
}
