import { Briefcase, Globe, MessageSquare } from 'lucide-react';
import { RecommendationCardProps } from './types';

export default function RecommendationCard({
  country,
  job,
  reason,
  onSelect,
}: RecommendationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 cursor-pointer hover:scale-105 transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <Globe className="text-primary" size={20} />
        <h3 className="text-lg font-semibold text-primary">{country}</h3>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
        <Briefcase size={16} className="text-accent" />
        <span>{job}</span>
      </div>

      <div className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
        <MessageSquare size={20} className="mt-0.5 text-accent" />
        <span>{reason}</span>
      </div>

      <button
        onClick={onSelect}
        className="mt-4 w-full py-2 text-sm font-semibold bg-primary text-white rounded-md hover:bg-primary/80 transition"
      >
        선택하기
      </button>
    </div>
  );
}
