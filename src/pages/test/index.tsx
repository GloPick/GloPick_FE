import {
  Button,
  Dropdown,
  MultiDropdown,
  InputField,
  TextArea,
  MultiSelectInput,
} from '@/components/shared';
import ResumeForm from '@/components/resumeForm';
import { useState } from 'react';

const Test = () => {
  const [language, setLanguage] = useState('');
  const [graduate, setGraduate] = useState('');
  const [job, setJob] = useState('');
  const [memo, setMemo] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  const handleSubmit = () => {
    console.log('submit');
  };

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
          label="직무"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="직무를 입력해주세요"
          error={!job ? '직무를 입력해주세요' : ''}
        />
      </div>

      <div className="p-6">
        <TextArea value={memo} onChange={setMemo} maxLength={3} placeholder="내용을 입력해주세요" />
      </div>

      <div className="p-6">
        <MultiSelectInput
          label="기술 스택"
          selected={skills}
          onChange={setSkills}
          placeholder="기술을 입력해주세요"
        />
      </div>

      <div className="p-6">
        <h1>Resume Test</h1>
        <ResumeForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Test;
