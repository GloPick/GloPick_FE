import { ResumeData, ResumeResponseData } from '@/types/resume';

export interface ResumeFormProps {
  initialData?: ResumeData;
  onSubmit?: (data: ResumeData) => void;
  onClose?: () => void;
}

export interface ResumeCardProps {
  data: ResumeResponseData;
  onEdit?: (resume: ResumeResponseData) => void;
  onDelete?: (id: string) => void;
}

export interface ResumeEmptyModalProps {
  onClose: () => void;
  onAddClick?: () => void;
}
