// 공통 응답 타입
export interface PostProfileResponse {
  code: number;
  message: string;
  result: {
    id: number;
    createdAt: string;
  };
}
