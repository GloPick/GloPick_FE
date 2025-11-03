export const LANGUAGE_OPTIONS = [
  { label: '한국어', value: 'Korean' },
  { label: '영어', value: 'English' },
  { label: '스페인어', value: 'Spanish' },
  { label: '프랑스어', value: 'French' },
  { label: '독일어', value: 'German' },
  { label: '포르투갈어', value: 'Portuguese' },
  { label: '이탈리아어', value: 'Italian' },
  { label: '네덜란드어', value: 'Dutch' },
  { label: '스웨덴어', value: 'Swedish' },
  { label: '노르웨이어', value: 'Norwegian' },
  { label: '덴마크어', value: 'Danish' },
  { label: '핀란드어', value: 'Finnish' },
  { label: '폴란드어', value: 'Polish' },
  { label: '체코어', value: 'Czech' },
  { label: '헝가리어', value: 'Hungarian' },
  { label: '그리스어', value: 'Greek' },
  { label: '터키어', value: 'Turkish' },
  { label: '일본어', value: 'Japanese' },
  { label: '히브리어', value: 'Hebrew' },
  { label: '슬로바키아어', value: 'Slovak' },
  { label: '슬로베니아어', value: 'Slovene' },
  { label: '아이슬란드어', value: 'Icelandic' },
  { label: '에스토니아어', value: 'Estonian' },
  { label: '라트비아어', value: 'Latvian' },
  { label: '리투아니아어', value: 'Lithuanian' },
];

export const COUNTRY_CODE_MAP: Record<string, string> = {
  KOR: 'kr', // 대한민국
  JPN: 'jp', // 일본
  USA: 'us', // 미국
  CAN: 'ca', // 캐나다
  AUS: 'au', // 호주
  NZL: 'nz', // 뉴질랜드
  HKG: 'hk', // 홍콩
  SGP: 'sg', // 싱가포르
  GBR: 'gb', // 영국
  IRL: 'ie', // 아일랜드
  DEU: 'de', // 독일
  FRA: 'fr', // 프랑스
  ITA: 'it', // 이탈리아
  ESP: 'es', // 스페인
  PRT: 'pt', // 포르투갈
  NLD: 'nl', // 네덜란드
  BEL: 'be', // 벨기에
  CHE: 'ch', // 스위스
  AUT: 'at', // 오스트리아
  SWE: 'se', // 스웨덴
  NOR: 'no', // 노르웨이
  DNK: 'dk', // 덴마크
  FIN: 'fi', // 핀란드
  ISL: 'is', // 아이슬란드
  CZE: 'cz', // 체코
  POL: 'pl', // 폴란드
  HUN: 'hu', // 헝가리
  SVK: 'sk', // 슬로바키아
  SVN: 'si', // 슬로베니아
  EST: 'ee', // 에스토니아
  LVA: 'lv', // 라트비아
  LTU: 'lt', // 리투아니아
  GRC: 'gr', // 그리스
  TUR: 'tr', // 터키
  ISR: 'il', // 이스라엘
  LUX: 'lu', // 룩셈부르크
  MEX: 'mx', // 멕시코
  BRA: 'br', // 브라질
  ARG: 'ar', // 아르헨티나
  CHL: 'cl', // 칠레
  COL: 'co', // 콜롬비아
  ZAF: 'za', // 남아프리카공화국
  IND: 'in', // 인도
  IDN: 'id', // 인도네시아
  PHL: 'ph', // 필리핀
  VNM: 'vn', // 베트남
  MYS: 'my', // 말레이시아
  THA: 'th', // 태국
};

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
