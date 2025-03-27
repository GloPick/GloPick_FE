import Button from '@/components/shared/Button';
import Dropdown from '@/components/shared/Dropdown';
import MultiDropdown from '@/components/shared/MultiDropdown';
import InputField from '@/components/shared/InputField';
import { useState } from 'react';

const Test = () => {
  const [language, setLanguage] = useState('');
  const [graduate, setGraduate] = useState('');
  const [job, setJob] = useState('');

  return (
    <div>
      <div className="p-6">
        <Button variant="primary">버튼</Button>
        <Button variant="secondary">버튼</Button>
        <Button variant="outline">버튼</Button>
        <Button variant="primary" disabled>
          버튼
        </Button>
      </div>

      <div className="p-6">
        <Dropdown
          label="학력"
          items={['중학교 졸업', '고등학교 졸업', '학사 졸업', '석사 졸업']}
          selected={graduate}
          onSelect={setGraduate}
        />
      </div>

      <div className="p-6">
        <MultiDropdown
          label="언어 능력"
          items={['한국어', '영어', '중국어', '일본어']}
          value={language}
          onChange={setLanguage}
        />
      </div>

      <div className="p-6">
        <InputField
          name="job"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="직무를 입력해주세요"
          error={!job ? '직무를 입력해주세요' : ''}
        />
      </div>
    </div>
  );
};

export default Test;
