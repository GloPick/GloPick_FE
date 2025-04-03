export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birth: string;
  phone: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}
