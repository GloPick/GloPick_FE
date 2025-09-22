import { InputField } from '../shared';

interface ResumeStepAdditionalProps {
  value: string;
  onChange: (val: string) => void;
  oneLineSummary: string;
  onChangeSummary: (val: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function ResumeStepAdditional({
  value,
  onChange,
  oneLineSummary,
  onChangeSummary,
  onBack,
  onSubmit,
}: ResumeStepAdditionalProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">기타 희망 조건이 있다면 입력해주세요</h2>

      <InputField
        name="additionalNotes"
        label="기타 희망 사항"
        placeholder="근무 형태, 비자 조건, 복지 등 자유롭게 입력"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <InputField
        name="oneLineSummary"
        label="한 줄 소개 (카드에 표시됩니다)"
        placeholder="예: 일본 취업을 희망하는 프론트엔드 개발자입니다."
        value={oneLineSummary}
        onChange={(e) => onChangeSummary(e.target.value)}
      />

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          이전
        </button>
        <button onClick={onSubmit} className="px-6 py-2 bg-primary text-white rounded">
          이력 저장
        </button>
      </div>
    </div>
  );
}
