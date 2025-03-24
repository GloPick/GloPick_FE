import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import MultiDropdown from '@/components/MultiDropdown';
import { useState } from 'react';

const Test = () => {
  const [language, setLanguage] = useState('');
  const [graduate, setGraduate] = useState('');

  return (
    <div>
      <div className="p-6">
        <Button variant="primary">버튼</Button>
        <Button variant="secondary">버튼</Button>
        <Button variant="outline">버튼</Button>
        <Button variant="primary" disabled>버튼</Button>
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
    </div>
  );
};

export default Test;
