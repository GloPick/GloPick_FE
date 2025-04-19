import { ResumeData } from '@/types/resume';

export interface ResumeFormProps {
  initialData?: ResumeData;
  onSubmit: (data: ResumeData) => void;
}
