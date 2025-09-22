import { useState } from 'react';
import { DropdownWithOther, Select } from '../shared';
import { JOB_CATEGORIES } from '@/contants/resume';

interface ResumeStepJobProps {
  value: string;
  onChange: (job: string) => void;
  onBack: () => void;
  onNext: () => void;
  error?: string;
  touched?: boolean;
}

export default function ResumeStepJob({
  value,
  onChange,
  onBack,
  onNext,
  error,
  touched,
}: ResumeStepJobProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const selectedCategoryData = JOB_CATEGORIES.find((cat) => cat.category === selectedCategory);
  const subJobOptions = selectedCategoryData?.jobs || [];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onChange(''); // 직무 초기화
  };

  const handleJobChange = (job: string) => {
    onChange(job);
  };

  const isNextDisabled = !value.trim();
  const showError = touched && error;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">희망 직무를 선택해주세요</h2>

      <Select
        label="희망 직무 대분류"
        options={JOB_CATEGORIES.map((cat) => ({ label: cat.category, value: cat.category }))}
        value={selectedCategory}
        onChange={handleCategoryChange}
        required
      />

      <div>
        {selectedCategory === '기타' ? (
          <DropdownWithOther
            label="직무 (기타 입력)"
            options={[]}
            value={value}
            onChange={handleJobChange}
            placeholder="직무를 입력해주세요"
            required
            error={showError ? error : undefined}
          />
        ) : (
          <DropdownWithOther
            label="세부 직무"
            options={subJobOptions.map((job) => ({ label: job, value: job }))}
            value={value}
            onChange={handleJobChange}
            placeholder="직무를 선택하거나 입력해주세요"
            required
            error={showError ? error : undefined}
          />
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          이전
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-primary text-white rounded disabled:opacity-50"
          disabled={isNextDisabled}
        >
          다음
        </button>
      </div>
    </div>
  );
}
