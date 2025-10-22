import React, { useCallback, useMemo } from 'react';
import { Weights } from '@/types/profile';

interface WeightInputGroupProps {
  weights: Weights;
  onWeightsChange: (newWeights: Weights, total: number) => void;
}

// 가중치 항목의 메타데이터
const weightItems: { key: keyof Weights; label: string; emoji: string }[] = [
  { key: 'jobWeight', label: '직무 매칭의 중요도', emoji: '💼' },
  { key: 'languageWeight', label: '언어 매칭의 중요도', emoji: '🌐' },
  { key: 'salaryWeight', label: '연봉의 중요도', emoji: '💰' },
];

const WeightInputGroup: React.FC<WeightInputGroupProps> = ({ weights, onWeightsChange }) => {
  // 현재 가중치 합계 계산
  const currentTotal = useMemo(() => {
    return weights.salaryWeight + weights.jobWeight + weights.languageWeight;
  }, [weights]);

  const remainingValue = 100 - currentTotal;
  const isComplete = currentTotal === 100;

  const handleChange = useCallback(
    (key: keyof Weights, value: string) => {
      let newValue = parseInt(value) || 0; // 숫자가 아니면 0으로 처리
      newValue = Math.max(0, Math.min(100, newValue));
      newValue = Math.round(newValue / 10) * 10; // 10단위로 반올림

      const newWeights = { ...weights, [key]: newValue };
      const newTotal = newWeights.salaryWeight + newWeights.jobWeight + newWeights.languageWeight;

      onWeightsChange(newWeights, newTotal);
    },
    [weights, onWeightsChange],
  );

  return (
    <div className="p-6 border border-gray-200 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        가중치를 설정해주세요.
        <p className="text-sm text-gray-500 mt-1">
          각 항목의 중요도를 매겨주세요. 중요도에 따라 계산하여 국가를 추천해드립니다.
        </p>
      </h3>
      <div
        className={`
          p-3 mb-4 rounded-lg font-medium border transition duration-300 
          ${
            isComplete
              ? 'bg-green-50 border-green-300 text-green-700'
              : 'bg-yellow-50 border-yellow-300 text-yellow-700'
          }
        `}
      >
        {isComplete
          ? '✅ 모든 가중치가 정확히 100%로 배분되었습니다.'
          : `⚠️ 배분해야 할 값: ${remainingValue}% (현재 합계: ${currentTotal}%)`}
      </div>

      {/* 개별 가중치 입력 필드 */}
      <div className="space-y-4">
        {weightItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
          >
            {/* 라벨 */}
            <label className="flex-1 text-base font-semibold text-gray-700">
              <span className="mr-2">{item.emoji}</span>
              {item.label}
            </label>

            {/* 입력 필드 */}
            <div className="flex items-center">
              <input
                type="number"
                min="0"
                max="100"
                step={10}
                value={weights[item.key]}
                onChange={(e) => handleChange(item.key, e.target.value)}
                className="w-20 p-2 text-right border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-lg font-mono"
              />
              <span className="ml-2 text-gray-500 font-semibold">%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeightInputGroup;
