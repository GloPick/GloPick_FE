import { GetProfileResponseData, PostProfilePayloadData } from '@/types/resume';

export interface ResumeFormProps {
  initialData?: PostProfilePayloadData;
  onSubmit?: (data: PostProfilePayloadData) => void;
  onClose?: () => void;
}

export interface ResumeCardProps {
  data: GetProfileResponseData;
  onEdit?: (resume: GetProfileResponseData) => void;
  onDelete?: (id: string) => void;
  onRecommend?: (id: string) => void;
}

export interface ResumeEmptyModalProps {
  onClose?: () => void;
  onAddClick?: () => void;
}
