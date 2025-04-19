import { ResumeData } from '@/types/resume';

export interface ResumeFormProps {
  initialData?: ResumeData;
  onSubmit?: (data: ResumeData) => void;
  onClose?: () => void;
}

export interface ResumeCardProps {
  data: ResumeData;
}

export interface ResumeEmptyModalProps {
  onClose: () => void;
  onAddClick?: () => void;
}
