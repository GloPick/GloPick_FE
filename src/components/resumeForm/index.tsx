import React, { useState } from 'react';
import { ResumeData, ResumeFormProps } from './types';
import { InputField, MultiSelectInput, TextArea, Button } from '../shared';

const ResumeForm: React.FC<ResumeFormProps> = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState<ResumeData>(
    initialData || {
      education: '',
      experience: '',
      desiredJob: '',
      skills: [],
      languages: [],
      desiredSalary: 0,
      additionalNotes: '',
    },
  );
  const [errors, setErrors] = useState<Partial<Record<keyof ResumeData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!form.education.trim()) newErrors.education = '학력을 선택해주세요.';
    if (!form.experience.trim()) newErrors.experience = '경력을 입력해주세요.';
    if (!form.desiredJob.trim()) newErrors.desiredJob = '희망 직무를 입력해주세요.';
    if (form.skills.length === 0) newErrors.skills = '기술을 1개 이상 입력해주세요.';
    if (form.languages.length === 0) newErrors.languages = '언어를 1개 이상 입력해주세요.';
    if (form.desiredSalary <= 0) newErrors.desiredSalary = '희망 연봉을 입력해주세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = <T extends keyof ResumeData>(field: T, value: ResumeData[T]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <InputField
        label="학력"
        name="education"
        value={form.education}
        onChange={(e) => handleChange('education', e.target.value)}
        placeholder="예: 컴퓨터공학과 학사"
        error={errors.education}
      />
      {/* <Dropdown
        name="education"
        options={EDUCATION_OPTIOIN}
        placeholder="학력을 선택해주세요"
        onSelect={(value) => handleChange('education', value)}
      /> */}
      <InputField
        label="경력"
        name="experience"
        value={form.experience}
        onChange={(e) => handleChange('experience', e.target.value)}
        placeholder="예: 개발 3년"
        error={errors.experience}
      />
      <InputField
        label="희망 직무"
        name="desiredJob"
        value={form.desiredJob}
        onChange={(e) => handleChange('desiredJob', e.target.value)}
        placeholder="예: 프론트엔드 개발자"
        error={errors.desiredJob}
      />
      <MultiSelectInput
        label="기술 스택"
        selected={form.skills}
        onChange={(val) => handleChange('skills', val)}
        placeholder="기술을 입력해주세요"
        error={errors.skills}
      />
      <MultiSelectInput
        label="언어 능력"
        selected={form.languages}
        onChange={(val) => handleChange('languages', val)}
        placeholder="언어를 입력해주세요"
        error={errors.languages}
      />
      <InputField
        label="희망 연봉 (만원 단위)"
        name="desiredSalary"
        value={form.desiredSalary.toString()}
        onChange={(e) => handleChange('desiredSalary', parseInt(e.target.value, 10) || 0)}
        placeholder="예: 5000"
        error={errors.desiredSalary}
      />
      <TextArea
        value={form.additionalNotes || ''}
        onChange={(val) => handleChange('additionalNotes', val)}
        placeholder="기타 희망 조건이 있다면 입력해주세요 (예: 원격 근무)"
      />

      <Button type="submit" variant="secondary" className="mt-4">
        입력 완료
      </Button>
    </form>
  );
};

export default ResumeForm;
