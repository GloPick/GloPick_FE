export interface PostProfilePayloadData {
  languages: string[];
  desiredSalary: string;
  desiredJob: string;
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
  desiredJob: string;
  languages: string[];
  desiredSalary: string;
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
  desiredJob: string;
  languages: string[];
  desiredSalary: string;
  additionalNotes?: string;
}

export interface EditProfileResponseData {
  profileId: string;
  desiredJob: string;
  languages: string[];
  desiredSalary: string;
  additionalNotes?: string;
}

export interface EditProfileResponse {
  code: number;
  message: string;
  data: EditProfileResponseData | null;
}
