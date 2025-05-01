export interface ResumeData {
  education: string;
  experience: string;
  desiredJob: string;
  skills: string[];
  languages: string[];
  desiredSalary: number;
  additionalNotes?: string;
}

export interface ResumeResponseData extends ResumeData {
  _id: string;
  createdAt: string;
}

export interface PostProfileResponse {
  code: number;
  message: string;
  data: null;
}

export interface GetProfileResponse {
  code: number;
  message: string;
  data: ResumeResponseData[];
}

export interface DeleteProfileResponse {
  code: number;
  message: string;
  data: null;
}

export interface EditProfileResponse {
  code: number;
  message: string;
  data: ResumeResponseData;
}
