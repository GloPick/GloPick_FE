import { InputField, SelectWithOther } from '@/components/shared';
import Select from '@/components/shared/Select';
import { PostSimulationFormPayloadData } from '@/types/simulation';
import { useState } from 'react';

const Test = () => {
  const [education, setEducation] = useState('');
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [form, setForm] = useState<PostSimulationFormPayloadData>({
    selectedRankIndex: 0,
    budget: 0,
    duration: '',
    languageLevel: '기초',
    hasLicense: false,
    jobTypes: [],
    requiredFacilities: [],
    accompanyingFamily: '',
    visaStatus: [],
    additionalNotes: '',
    departureAirport: '',
  });

  const options = [
    { label: '고졸', value: 'highschool' },
    { label: '대졸', value: 'bachelor' },
    { label: '석사', value: 'master' },
    { label: '박사', value: 'phd' },
  ];

  const handleSubmit = () => {
    if (!education) {
      setError('학력을 선택해주세요.');
    } else {
      setError('');
      alert(`제출된 학력: ${education}`);
    }
  };

  const handleChange = <T extends keyof PostSimulationFormPayloadData>(
    field: T,
    value: PostSimulationFormPayloadData[T],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded shadow space-y-6">
      <h1 className="text-xl font-bold text-center">Select UI Test</h1>

      <Select
        label="학력"
        options={options}
        value={education}
        onChange={setEducation}
        error={error}
        required
      />

      <button
        className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
        onClick={handleSubmit}
      >
        제출하기
      </button>

      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <h1 className="text-xl font-bold mb-4">직무 선택</h1>
        <SelectWithOther
          label="희망 직무"
          value={selectedJob}
          onChange={setSelectedJob}
          options={[
            { label: '프론트엔드 개발자', value: 'frontend' },
            { label: '백엔드 개발자', value: 'backend' },
            { label: '디자이너', value: 'designer' },
          ]}
          required
        />
      </div>

      <InputField
        label="✈️ 출발 공항"
        name="departureAirport"
        value={form.departureAirport}
        onChange={(e) => handleChange('departureAirport', e.target.value)}
        placeholder="예: 인천공항"
        error=""
        required
      />
    </div>
  );
};
export default Test;
