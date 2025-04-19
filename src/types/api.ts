// 공통 응답 타입
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ApiError<T> {
  code: number;
  message: string;
  data: T;
}
