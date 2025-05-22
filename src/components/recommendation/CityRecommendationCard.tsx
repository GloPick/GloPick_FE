import { FC } from 'react';
import { PostCityResponseData } from '@/types/simulation';
import { MapPin } from 'lucide-react';

interface CityRecommendationCardProps {
  city: PostCityResponseData;
  onSelect: () => void;
}

const CityRecommendationCard: FC<CityRecommendationCardProps> = ({ city, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer h-full"
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="text-primary" size={20} />
          <h3 className="text-lg font-semibold text-primary">{city.name}</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{city.summary}</p>
      </div>

      <button className="mt-6 w-full py-2 text-sm font-semibold bg-primary text-white rounded-md hover:bg-primary/80 transition">
        선택하기
      </button>
    </div>
  );
};

export default CityRecommendationCard;
