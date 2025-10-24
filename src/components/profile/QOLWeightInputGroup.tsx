import React, { useCallback, useMemo } from 'react';
import { QualityOfLifeWeights } from '@/types/profile';

interface QOLWeightInputGroupProps {
  qol: QualityOfLifeWeights;
  onChange: (newQol: QualityOfLifeWeights, total: number) => void;
}

const qolItems: {
  key: keyof QualityOfLifeWeights;
  label: string;
  emoji: string;
  description: string;
}[] = [
  {
    key: 'income',
    label: '소득과 자산',
    emoji: '💰',
    description: '월급, 저축, 투자 등 경제적인 여유를 의미해요.',
  },
  {
    key: 'jobs',
    label: '안정적인 일자리',
    emoji: '💼',
    description: '원하는 일자리를 쉽게 구하고, 직장을 잃을 걱정이 적은 정도를 의미해요.',
  },
  {
    key: 'health',
    label: '건강한 삶',
    emoji: '💊',
    description: '신체적, 정신적 건강을 포함하여, 전반적인 웰빙을 의미해요.',
  },
  {
    key: 'safety',
    label: '생활 환경의 안전',
    emoji: '🛡️',
    description: '안전한 주거지와 범죄로부터의 보호를 의미해요.',
  },
  {
    key: 'lifeSatisfaction',
    label: '전반적인 만족감',
    emoji: '😊',
    description: '일과 삶의 균형, 인간관계, 취미 등 주관적으로 느끼는 행복의 정도를 의미해요.',
  },
];

const QOLWeightInputGroup: React.FC<QOLWeightInputGroupProps> = ({ qol, onChange }) => {
  const total = useMemo(
    () => qol.income + qol.jobs + qol.health + qol.safety + qol.lifeSatisfaction,
    [qol],
  );

  const remaining = 100 - total;
  const isComplete = total === 100;

  const handleChange = useCallback(
    (key: keyof QualityOfLifeWeights, value: string) => {
      let newValue = parseInt(value) || 0;
      newValue = Math.max(0, Math.min(100, newValue));
      newValue = Math.round(newValue / 10) * 10;

      const newQol = { ...qol, [key]: newValue };
      const newTotal =
        newQol.income + newQol.jobs + newQol.health + newQol.safety + newQol.lifeSatisfaction;

      onChange(newQol, newTotal);
    },
    [qol, onChange],
  );

  return (
    <div className="p-6 border border-gray-200 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        삶의 질(QOL) 중요도 설정
        <p className="text-sm text-gray-500 mt-1">
          당신이 생각하는 좋은 삶의 조건은 무엇인가요? 각 항목의 중요도를 설정해주세요.
        </p>
      </h3>

      <div
        className={`p-3 mb-4 rounded-lg border font-medium transition ${
          isComplete
            ? 'bg-green-50 border-green-300 text-green-700'
            : 'bg-yellow-50 border-yellow-300 text-yellow-700'
        }`}
      >
        {isComplete
          ? '✅ 가중치 100%를 모두 분배했습니다.'
          : `⚠️ 남은 비율: ${remaining}% (현재 합계: ${total}%)`}
      </div>

      <div className="space-y-4">
        {qolItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between border-b pb-3">
            <div>
              <label htmlFor={item.key} className="text-base font-semibold text-gray-800">
                {item.emoji} {item.label}
              </label>
              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                min="0"
                max="100"
                step={10}
                value={qol[item.key]}
                onChange={(e) => handleChange(item.key, e.target.value)}
                className="w-20 p-2 text-right border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="ml-2 text-gray-500 font-semibold">%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QOLWeightInputGroup;
