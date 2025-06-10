export interface PostProfilePayloadData {
  education: string;
  experience: string;
  desiredJob: string;
  skills: string[];
  languages: string[];
  desiredSalary: number;
  additionalNotes?: string;
}

export interface PostProfileResponse {
  code: number;
  message: string;
  data: {
    profileId: string;
  } | null;
}

export interface GetProfileResponseData {
  profileId: string;
  user: {
    userId: string;
    name: string;
    email: string;
  };
  education: string;
  experience: string;
  desiredJob: string;
  skills: string[];
  languages: string[];
  desiredSalary: number;
  additionalNotes?: string;
  responseId: string; // 국가추천 id
}

export interface GetProfileResponse {
  code: number;
  message: string;
  data: GetProfileResponseData[];
}

export interface DeleteProfileResponse {
  code: number;
  message: string;
  data: null;
}

export interface EditProfilePayloadData {
  education: string;
  experience: string;
  desiredJob: string;
  skills: string[];
  languages: string[];
  desiredSalary: number;
  additionalNotes?: string;
}

export interface EditProfileResponseData {
  profileId: string;
  education: string;
  experience: string;
  desiredJob: string;
  skills: string[];
  languages: string[];
  desiredSalary: number;
  additionalNotes?: string;
}

export interface EditProfileResponse {
  code: number;
  message: string;
  data: EditProfileResponseData | null;
}
