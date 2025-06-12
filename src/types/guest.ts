export interface PostGuestCountryPayloadData {
  education: string;
  experience: string;
  skills: string[];
  languages: string[];
  desiredSalary: number;
  desiredJob: string;
  additionalNotes?: string;
}

export interface PostGuestCountryResponseData {
  country: string;
  job: string;
  reason: string;
}

export interface PostGuestCountryResponse {
  code: number;
  message: string;
  data: {
    recommendedCountries: {
      rankings: PostGuestCountryResponseData[];
    };
  };
}
