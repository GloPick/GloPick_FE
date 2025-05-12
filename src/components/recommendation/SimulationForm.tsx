import React, { useState } from 'react';
import { SimulationRequestData } from '@/types/simulation';
import InputField from '@/components/shared/InputField';
import TextArea from '@/components/shared/TextArea';
import Button from '@/components/shared/Button';
import MultiSelectInput from '@/components/shared/MultiSelectInput';
import Dropdown from '@/components/shared/Dropdown';

interface SimulationFormProps {
  onSubmit: (data: SimulationRequestData) => void;
  initialValues?: Partial<SimulationRequestData>;
}

export default function SimulationForm({ onSubmit, initialValues }: SimulationFormProps) {
  const [form, setForm] = useState<SimulationRequestData>({
    profileId: initialValues?.profileId || '',
    recommendationId: initialValues?.recommendationId || '',
    selectedRankIndex: initialValues?.selectedRankIndex || 0,
    selectedCity: '',
    budget: 0,
    duration: '',
    languageLevel: '',
    hasLicense: false,
    jobTypes: [],
    requiredFacilities: [],
    accompanyingFamily: [],
    visaStatus: [],
    additionalNotes: '',
    departureAirport: '',
  });

  const handleChange = <T extends keyof SimulationRequestData>(
    field: T,
    value: SimulationRequestData[T],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 예산 */}
      <InputField
        label="예산 (만원)"
        type="number"
        name="budget"
        value={form.budget.toString()}
        onChange={(e) => handleChange('budget', parseInt(e.target.value, 10) || 0)}
        placeholder="예: 3000"
      />

      {/* 거주 기간 */}
      <Dropdown
        label="거주 기간"
        items={[
          { name: '6개월', value: '6개월' },
          { name: '1년', value: '1년' },
          { name: '2년', value: '2년' },
          { name: '장기 거주', value: '장기 거주' },
        ]}
        selected={form.duration}
        onSelect={(value) => handleChange('duration', value)}
      />

      {/* 언어 수준 */}
      <Dropdown
        label="언어 수준"
        items={[
          { name: '능숙', value: '능숙' },
          { name: '기초', value: '기초' },
          { name: '통역 필요', value: '통역 필요' },
        ]}
        selected={form.languageLevel ?? ''}
        onSelect={(value) => handleChange('languageLevel', value)}
      />

      {/* 운전 면허 */}
      <label className="flex items-center gap-2 text-sm font-medium text-gray-800">
        <input
          type="checkbox"
          checked={form.hasLicense}
          onChange={(e) => handleChange('hasLicense', e.target.checked)}
        />
        운전 면허 있음
      </label>

      {/* 희망 직무 유형 */}
      <MultiSelectInput
        label="희망 취업 형태"
        selected={form.jobTypes}
        onChange={(val) => handleChange('jobTypes', val)}
        placeholder="예: 원격 근무, 정규직"
      />

      {/* 필수 편의시설 */}
      <MultiSelectInput
        label="필수 편의 시설"
        selected={form.requiredFacilities}
        onChange={(val) => handleChange('requiredFacilities', val)}
        placeholder="예: 병원, 대중교통"
      />

      {/* 동반 가족 */}
      <MultiSelectInput
        label="동반 가족"
        selected={form.accompanyingFamily}
        onChange={(val) => handleChange('accompanyingFamily', val)}
        placeholder="예: 배우자, 자녀"
      />

      {/* 비자 상태 */}
      <MultiSelectInput
        label="비자 상태"
        selected={form.visaStatus}
        onChange={(val) => handleChange('visaStatus', val)}
        placeholder="예: 취업 비자"
      />

      {/* 출발 공항 */}
      <Dropdown
        label="출발 공항"
        items={[
          { name: '인천국제공항(ICN)', value: 'ICN' },
          { name: '김포공항(GMP)', value: 'GMP' },
          { name: '김해공항(PUS)', value: 'PUS' },
        ]}
        selected={form.departureAirport}
        onSelect={(value) => handleChange('departureAirport', value)}
      />

      {/* 기타 메모 */}
      <TextArea
        value={form.additionalNotes ?? ''}
        onChange={(val) => handleChange('additionalNotes', val)}
        placeholder="기타 희망사항이 있다면 입력해주세요."
      />

      <Button type="submit" className="w-full">
        시뮬레이션 시작하기
      </Button>
    </form>
  );
}
