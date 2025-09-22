import React, { useState } from 'react';
import { PostProfilePayloadData } from '@/types/resume';
import { InputField, TextArea, Button } from '../shared';
import clsx from 'clsx';

interface ResumeFormProps {
  initialData?: PostProfilePayloadData;
  onSubmit?: (data: PostProfilePayloadData) => void;
  onClose?: () => void;
}

const ResumeForm = ({ initialData, onClose, onSubmit }: ResumeFormProps) => {
  const [form, setForm] = useState<PostProfilePayloadData>(
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
  const [errors, setErrors] = useState<Partial<Record<keyof PostProfilePayloadData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!form.education.trim()) newErrors.education = '학력을 선택해주세요.';
    if (!form.experience.trim()) newErrors.experience = '경력을 입력해주세요.';
    if (!form.desiredJob.trim()) newErrors.desiredJob = '희망 직무를 입력해주세요.';
    if (form.skills.length === 0) newErrors.skills = '기술을 1개 이상 입력해주세요.';
    if (form.languages.length === 0) newErrors.languages = '언어를 1개 이상 입력해주세요.';
    if (!form.desiredSalary || form.desiredSalary <= 0)
      newErrors.desiredSalary = '희망 연봉을 입력해주세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = <T extends keyof PostProfilePayloadData>(
    field: T,
    value: PostProfilePayloadData[T],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    onSubmit?.(form);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className={clsx('flex flex-col gap-6 w-full', 'animate-fade-in')}>
      <h2 className="text-xl font-bold text-center mb-4 text-primary">이력 입력하기</h2>
      <InputField
        label="학력"
        name="education"
        value={form.education}
        onChange={(e) => handleChange('education', e.target.value)}
        placeholder="예: 컴퓨터공학과 학사"
        error={errors.education}
      />

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

      {/* <MultiSelectInput
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
      /> */}

      <InputField
        type="number"
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
