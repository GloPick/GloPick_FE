// 서버에서 주고받는 이력 데이터
export interface ResumeData {
  education: string;
  experience: string;
  desiredJob: string;
  skills: string[];
  languages: string[];
  desiredSalary: number;
  additionalNotes?: string;
}
