export interface LoginResponse {
  name: string;
  email: string;
  token: string;
}

export interface SignupResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birth: string;
  phone: string;
}

export interface GetUserInfoResponseData {
  _id: string;
  name: string;
  email: string;
  birth: string;
  phone: string;
}

export interface GetUserInfoResponse {
  code: number;
  message: string;
  data: GetUserInfoResponseData;
}

export interface PutUserInfoPayloadData {
  name: string;
  email: string;
  birth: string;
  phone: string;
}

export interface PutUserInfoResponse {
  code: number;
  message: string;
  data: PutUserInfoPayloadData;
}
