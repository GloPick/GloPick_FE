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
