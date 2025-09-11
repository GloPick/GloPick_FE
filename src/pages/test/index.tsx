import Select from '@/components/shared/Select';
import { useState } from 'react';

const Test = () => {
  const [education, setEducation] = useState('');
  const [error, setError] = useState('');

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
    </div>
  );
};
export default Test;
