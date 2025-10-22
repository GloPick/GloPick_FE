export const LANGUAGE_OPTIONS = [
  { label: '한국어', value: 'Korean' },
  { label: '영어', value: 'English' },
  { label: '중국어', value: 'Chinese' },
  { label: '일본어', value: 'Japanese' },
  { label: '스페인어', value: 'Spanish' },
  { label: '프랑스어', value: 'French' },
  { label: '독일어', value: 'German' },
  { label: '이탈리아어', value: 'Italian' },
  { label: '포르투갈어', value: 'Portuguese' },
  { label: '러시아어', value: 'Russian' },
  { label: '아랍어', value: 'Arabic' },
  { label: '힌디어', value: 'Hindi' },
  { label: '네덜란드어', value: 'Dutch' },
  { label: '스웨덴어', value: 'Swedish' },
  { label: '노르웨이어', value: 'Norwegian' },
];

// 직무 분야 (ILOSTAT ISCO-08 대분류 기준)
export const JOB_OPTIONS = [
  {
    code: '1',
    nameKo: '관리자',
    nameEn: 'Managers',
    description: '기업, 정부, 기타 조직의 정책 수립 및 계획 수립, 조정, 감독',
  },
  {
    code: '2',
    nameKo: '전문가',
    nameEn: 'Professionals',
    description: '과학, 공학, 의학, 교육, 법률, 사회과학, 인문학 등 전문 분야',
  },
  {
    code: '3',
    nameKo: '기술자 및 준전문가',
    nameEn: 'Technicians and Associate Professionals',
    description: '기술적 업무 수행 및 전문가 지원 업무',
  },
  {
    code: '4',
    nameKo: '사무종사자',
    nameEn: 'Clerical Support Workers',
    description: '사무, 회계, 고객서비스 등 일반 사무 업무',
  },
  {
    code: '5',
    nameKo: '서비스 및 판매 종사자',
    nameEn: 'Service and Sales Workers',
    description: '개인서비스, 보안서비스, 판매 업무',
  },
  {
    code: '6',
    nameKo: '농림어업 숙련 종사자',
    nameEn: 'Skilled Agricultural, Forestry and Fishery Workers',
    description: '농업, 임업, 어업 분야 숙련 업무',
  },
  {
    code: '7',
    nameKo: '기능원 및 관련 기능 종사자',
    nameEn: 'Craft and Related Trades Workers',
    description: '건설, 금속가공, 기계, 전기 등 기능 업무',
  },
  {
    code: '8',
    nameKo: '설비·기계 조작 및 조립 종사자',
    nameEn: 'Plant and Machine Operators and Assemblers',
    description: '산업기계 및 설비 조작, 운송장비 운전, 조립 업무',
  },
  {
    code: '9',
    nameKo: '단순노무 종사자',
    nameEn: 'Elementary Occupations',
    description: '청소, 건설보조, 제조업 단순작업 등',
  },
  {
    code: '0',
    nameKo: '군인',
    nameEn: 'Armed Forces Occupations',
    description: '국방 및 군사 업무',
  },
];

export const SALARY_OPTIONS = [
  { label: '2천만원 이하', value: 20000000 },
  { label: '2천만원 ~ 3천만원', value: 25000000 },
  { label: '3천만원 ~ 5천만원', value: 40000000 },
  { label: '5천만원 ~ 7천만원', value: 60000000 },
  { label: '7천만원 ~ 1억원', value: 85000000 },
  { label: '1억원 이상', value: 120000000 },
];

export const PERSISTENCE_KEY = 'globalJobFinderInput';
