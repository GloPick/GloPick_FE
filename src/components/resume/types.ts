export interface ResumeData {
  education: string;
  experience: string;
  desiredJob: string;
  skills: string[];
  languages: string[];
  desiredSalary: number;
  additionalNotes?: string;
}

export interface ResumeFormProps {
  initialData?: ResumeData;
  onSubmit: (data: ResumeData) => void;
}
