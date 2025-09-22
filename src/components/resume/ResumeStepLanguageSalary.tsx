import { PostProfilePayloadData } from '@/types/resume';
import { MultiSelectButton } from '../shared';
import { DropdownWithOther } from '../shared';
import { LANGUAGE_OPTIONS, SALARY_OPTIONS } from '@/contants/resume';

interface ResumeStepLanguageSalaryProps {
  data: PostProfilePayloadData;
  onFieldChange: <K extends keyof PostProfilePayloadData>(
    field: K,
    value: PostProfilePayloadData[K],
  ) => void;
  onNext: () => void;
  errors: Partial<Record<keyof PostProfilePayloadData, string>>;
  touched: Partial<Record<keyof PostProfilePayloadData, boolean>>;
}

export default function ResumeStepLanguageSalary({
  data,
  onFieldChange,
  onNext,
  errors,
  touched,
}: ResumeStepLanguageSalaryProps) {
  const isNextDisabled = data.languages.length === 0 || !data.desiredSalary;

  const handleLanguagesChange = (langs: string[]) => {
    onFieldChange('languages', langs);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">사용 가능한 언어와 희망 연봉을 알려주세요</h2>

      <div>
        <MultiSelectButton
          label="사용 가능한 언어"
          options={LANGUAGE_OPTIONS}
          selected={data.languages}
          onChange={handleLanguagesChange}
          otherLabel="기타 (직접 입력)"
          otherValue={data.languages.find((lang) => !LANGUAGE_OPTIONS.includes(lang)) || ''}
          onOtherChange={(val) => {
            const known = data.languages.filter((l) => LANGUAGE_OPTIONS.includes(l));
            const v = val.trim();
            handleLanguagesChange(v ? [...known, v] : known);
          }}
          required
          error={touched.languages ? errors.languages : undefined}
        />
      </div>

      <div>
        <DropdownWithOther
          label="희망 연봉"
          options={SALARY_OPTIONS.map((value) => ({ label: value, value }))}
          value={data.desiredSalary}
          onChange={(salary) => onFieldChange('desiredSalary', salary)}
          required
          error={touched.desiredSalary ? errors.desiredSalary : undefined}
        />
      </div>

      <div className="text-right">
        <button
          className="px-6 py-2 bg-primary text-white rounded disabled:opacity-50"
          onClick={onNext}
          disabled={isNextDisabled}
        >
          다음
        </button>
      </div>
    </div>
  );
}
