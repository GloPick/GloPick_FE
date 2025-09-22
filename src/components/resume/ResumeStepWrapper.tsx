import React, { useEffect, useState } from 'react';
import { PostProfilePayloadData } from '@/types/resume';
import ResumeStepLanguageSalary from './ResumeStepLanguageSalary';
import ResumeStepJob from './ResumeStepJob';
import ResumeStepAdditional from './ResumeStepAdditional';

interface ResumeStepWrapperProps {
  initialData?: PostProfilePayloadData;
  onSubmit?: (data: PostProfilePayloadData) => void;
  onClose?: () => void;
}

const ResumeStepWrapper = ({ initialData, onClose, onSubmit }: ResumeStepWrapperProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const [form, setForm] = useState<PostProfilePayloadData>(
    initialData || {
      languages: [],
      desiredSalary: '',
      desiredJob: '',
      additionalNotes: '',
    },
  );

  const [oneLineSummary, setOneLineSummary] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof PostProfilePayloadData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof PostProfilePayloadData, boolean>>>(
    {},
  );

  const [submitted, setSubmitted] = useState(false);

  // 실시간 유효성 검사
  useEffect(() => {
    const newErrors: typeof errors = {};

    if (touched.languages && !form.languages.length) {
      newErrors.languages = '언어를 1개 이상 선택해주세요.';
    }
    if (touched.desiredSalary && !form.desiredSalary.trim()) {
      newErrors.desiredSalary = '희망 연봉을 입력해주세요.';
    }
    if (touched.desiredJob && !form.desiredJob.trim()) {
      newErrors.desiredJob = '희망 직무를 입력해주세요.';
    }

    setErrors(newErrors);
  }, [form, touched]);

  const validateStep = (step: number) => {
    const stepFields: Record<number, (keyof PostProfilePayloadData)[]> = {
      1: ['languages', 'desiredSalary'],
      2: ['desiredJob'],
    };

    const fieldsToValidate = stepFields[step] || [];
    const newTouched = { ...touched };

    fieldsToValidate.forEach((field) => {
      newTouched[field] = true;
    });

    setTouched(newTouched);

    // 해당 스텝의 필드들에 에러가 있는지 확인
    return fieldsToValidate.every((field) => {
      if (field === 'languages') return form.languages.length > 0;
      if (field === 'desiredSalary' || field === 'desiredJob') return form[field].trim();
      return true;
    });
  };

  const goToNext = () => {
    setSubmitted(true);
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => prev + 1);
  };

  const goToPrev = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    // 모든 필드를 touched로 설정
    setTouched({
      languages: true,
      desiredSalary: true,
      desiredJob: true,
    });

    // 모든 필수 필드 검증
    if (!form.languages.length || !form.desiredSalary.trim() || !form.desiredJob.trim()) {
      return;
    }

    onSubmit?.(form);
    onClose?.();
  };

  const handleFieldChange = <K extends keyof PostProfilePayloadData>(
    field: K,
    value: PostProfilePayloadData[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Step {currentStep} / 3</span>
      </div>

      {currentStep === 1 && (
        <ResumeStepLanguageSalary
          data={form}
          onFieldChange={handleFieldChange}
          onNext={goToNext}
          errors={errors}
          touched={touched}
        />
      )}

      {currentStep === 2 && (
        <ResumeStepJob
          value={form.desiredJob}
          onChange={(job) => handleFieldChange('desiredJob', job)}
          onBack={goToPrev}
          onNext={goToNext}
          error={errors.desiredJob}
          touched={touched.desiredJob}
        />
      )}

      {currentStep === 3 && (
        <ResumeStepAdditional
          value={form.additionalNotes || ''}
          onChange={(val) => setForm((prev) => ({ ...prev, additionalNotes: val }))}
          oneLineSummary={oneLineSummary}
          onChangeSummary={setOneLineSummary}
          onBack={goToPrev}
          onSubmit={handleSubmit}
        />
      )}

      {/* {currentStep === 4 && <ResumeSummaryCard form={form} oneLineSummary={oneLineSummary} />} */}
    </div>
  );
};

export default ResumeStepWrapper;
