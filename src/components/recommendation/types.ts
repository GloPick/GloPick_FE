export interface RecommendationCardProps {
  country: string;
  job: string;
  reason: string;
  onSelect: () => void;
  isSelected?: boolean;
}
