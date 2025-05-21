import { PostSimulationFormPayloadData } from '@/types/simulation';

export interface SimulationFormProps {
  onSubmit: (data: PostSimulationFormPayloadData) => void;
  profileId: string;
  recommendationId: string;
  selectedRankIndex: number;
  selectedCountry: string;
}
