import React, { useMemo } from 'react';
import { JOB_OPTIONS, LANGUAGE_OPTIONS } from '@/constants';
import { InputFormState } from '@/types/recommendation';
import SelectDropdown from '@/components/shared/SelectDropdown';

interface InputFormProps extends InputFormState {
  onCategoryChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  jobField,
  language,
  onCategoryChange,
  onLanguageChange,
}) => {
  // 선택된 직무 정보
  const selectedJob = useMemo(() => {
    if (!jobField) return null;
    return JOB_OPTIONS.find((f) => f.code === jobField);
  }, [jobField]);

  return (
    <div className="space-y-6 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">기본 정보 입력</h3>

      {/* 직무 카테고리 선택 (ISCO-08 매칭) */}
      <SelectDropdown
        label="💼 직무 분야 (ILOSTAT ISCO-08 대분류)"
        options={JOB_OPTIONS.map((job) => ({
          label: job.nameKo,
          value: job.code,
        }))}
        value={jobField}
        onChange={onCategoryChange}
        placeholder="직무군을 선택하세요"
        required
      />

      {/* 직무 설명 표시 */}
      {selectedJob && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700 italic whitespace-pre-line">
          <span className="font-semibold text-blue-800 block mb-1">
            선택된 분야: {selectedJob.nameKo}
          </span>
          {/* {selectedJob.description} */}
          {selectedJob.descriptionList ? (
            <ul className="list-disc pl-5 space-y-1">
              {selectedJob.descriptionList.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          ) : (
            <span>{selectedJob.description}</span>
          )}
        </div>
      )}
      {/* 언어 선택 */}
      <div className="pt-2">
        <SelectDropdown
          label="🌐 가장 구사 가능한 언어"
          options={LANGUAGE_OPTIONS}
          value={language}
          onChange={onLanguageChange}
          placeholder="언어를 선택하세요"
          required
        />

        <p className="mt-2 text-sm text-gray-500">
          국가 추천 시, 해당 언어 구사 여부에 가중치가 부여됩니다.
        </p>
      </div>
    </div>
  );
};

export default InputForm;
