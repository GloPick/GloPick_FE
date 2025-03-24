import { Button } from '@/components/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useState } from 'react';

const Test = () => {
  const [language, setLanguage] = useState('');
  const [graduate, setGraduate] = useState('');

  return (
    <div>
      <div className="flex flex-col items-center">
        <Button text="lg 버튼1" size="sm" />
        <Button text="md 버튼2" size="md" color="secondary" />
        <Button text="버튼3" size="lg" disabled />
      </div>

      <div className="p-6">
        <Dropdown
          label="언어 설정"
          items={['한국어', '영어']}
          selected={language}
          onSelect={setLanguage}
        />
      </div>

      <div className="p-6">
        <Dropdown
          label="학력"
          items={['중학교 졸업', '고등학교 졸업', '학사 졸업', '석사 졸업']}
          selected={graduate}
          onSelect={setGraduate}
        />
      </div>
    </div>
  );
};

export default Test;
