import { SimulationRequestData } from '@/types/simulation';

export interface RecommendationCardProps {
  country: string;
  job: string;
  reason: string;
  onSelect: () => void;
  isSelected?: boolean;
}

export interface SimulationFormProps {
  onSubmit: (data: SimulationRequestData) => void;
}
