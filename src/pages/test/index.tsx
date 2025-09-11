import { MultiDropdown } from '@/components/shared';
import { useState } from 'react';

const Test = () => {
  const [selectedJob, setSelectedJob] = useState('');
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">직무 선택</h1>
      <MultiDropdown
        label="희망 직무"
        value={selectedJob}
        onChange={setSelectedJob}
        options={[
          { label: '프론트엔드 개발자', value: 'frontend' },
          { label: '백엔드 개발자', value: 'backend' },
          { label: '디자이너', value: 'designer' },
        ]}
      />
    </div>
  );
};
export default Test;
