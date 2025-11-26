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
    description:
      'CEO(최고경영자) / 부장 / 팀장 / 공공기관 관리자 / 스타트업 대표 / 매니저 / 공무원 간부 / 정치인 / 국회의원',
  },
  {
    code: '2',
    nameKo: '전문가',
    nameEn: 'Professionals',
    descriptionList: [
      '과학·공학 전문직: 연구원 / 데이터 사이언티스트 / AI 엔지니어 / 소프트웨어 개발자 / 시스템 엔지니어 / 네트워크 엔지니어 / 품질관리 전문가 / 기계 설계자 / 전자공학 엔지니어',
      '보건 전문직: 의사 / 치과의사 / 약사 / 수의사 / 간호사 / 물리치료사 / 임상병리사',
      '교육 전문직: 대학교수 / 교사(초·중·고) / 학원강사 / 유치원교사 / 온라인 강의 제작자',
      '경영 관리 전문직: 회계사 / 세무사 / 금융분석가 / 경영컨설턴트 / 인사전문가',
      '정보통신기술 전문직: 백엔드 개발자 / 프론트엔드 개발자 / 풀스택 개발자 / 시스템 관리자 / 클라우드 아키텍트 / 데이터 엔지니어 / 보안 전문가',
      '법무·사회·문화 전문직: 변호사 / 판사 / 기자 / 번역가 / 디자이너 / 작가 / 큐레이터 / 심리상담사',
    ],
  },
  {
    code: '3',
    nameKo: '기술자 및 준전문가',
    nameEn: 'Technicians and Associate Professionals',
    description:
      'CAD 기술자 / 전산실 기술자 / 임상시험코디네이터 / 간호조무사 / 보험심사원 / 행정 실무자 / 사회복지사 / 경찰 / 소방관 / 방송기술자 / IT 지원 기술자 / 통신기술자 / 전자기기 수리기사',
  },
  {
    code: '4',
    nameKo: '사무종사자',
    nameEn: 'Clerical Support Workers',
    description:
      '사무보조 / 회계사무원 / 인사·총무 사무원 / 비서 / 마케팅 사무원 / 영업지원 / 데이터 입력원 / 콜센터 상담원 / 고객응대 사무직',
  },
  {
    code: '5',
    nameKo: '서비스 및 판매 종사자',
    nameEn: 'Service and Sales Workers',
    description:
      '요리사 / 제과제빵사 / 바리스타 / 미용사 / 피부관리사 / 간병인 / 호텔리어 / 승무원 / 헬스트레이너 / 판매원 / 카페 매니저 / 백화점 직원 / 보안요원 / 경호원 / 안내원',
  },
  {
    code: '6',
    nameKo: '농림어업 숙련 종사자',
    nameEn: 'Skilled Agricultural, Forestry and Fishery Workers',
    description:
      '농부 / 과수농 / 축산농 / 임업인 / 어부 / 양식업 종사자 / 조경사 / 원예사 / 화훼 재배자',
  },
  {
    code: '7',
    nameKo: '기능원 및 관련 기능 조립 종사자',
    nameEn: 'Craft and Related Trades Workers',
    description:
      '건설 기능공 / 목수 / 배관공 / 용접공 / 자동차 정비사 / 기계 조립공 / 전기기사 / 전자기기 수리공 / 인쇄공 / 가구 제작자 / 제화공 / 의류제작 기능공 / 식품가공 기술자',
  },
  {
    code: '8',
    nameKo: '설비·기계 조작 및 조립 종사자',
    nameEn: 'Plant and Machine Operators and Assemblers',
    description:
      '지게차 운전사 / 버스 운전기사 / 트럭 운전기사 / 택시 기사 / 크레인 기사 / 생산기계 조작원 / 반도체 장비 조작원 / 플랜트 조작원',
  },
  {
    code: '9',
    nameKo: '단순노무 종사자',
    nameEn: 'Elementary Occupations',
    description:
      '청소원 / 환경미화원 / 경비원 / 택배 상하차원 / 음식 배달원 / 주방보조 / 건설현장 인부 / 포장·조립 보조원 / 식당 아르바이트생 / 세탁소 종사자',
  },
  {
    code: '0',
    nameKo: '군인',
    nameEn: 'Armed Forces Occupations',
    description: '사관 / 하사관 / 장교 / 부사관 / 병사 / ROTC / 군무원',
  },
];

export const BUDGET_OPTIONS = [
  { value: '300만~500만원', label: '300만~500만원' },
  { value: '500만~800만원', label: '500만~800만원' },
  { value: '800만~1200만원', label: '800만~1200만원' },
  { value: '1200만~1500만원', label: '1200만~1500만원' },
  { value: '1500만원 이상', label: '1500만원 이상' },
];

export const AIRPORT_OPTIONS = [
  { value: '인천국제공항', label: '인천국제공항' },
  { value: '김포국제공항', label: '김포국제공항' },
  { value: '김해국제공항', label: '김해국제공항' },
  { value: '제주국제공항', label: '제주국제공항' },
  { value: '청주국제공항', label: '청주국제공항' },
  { value: '대구국제공항', label: '대구국제공항' },
  { value: '무안국제공항', label: '무안국제공항' },
];

/**
 * 필수 편의시설 옵션 (최대 5개 선택 가능)
 */
export const REQUIRED_FACILITIES = [
  // 의료 시설
  { category: 'medical', value: 'hospital', label: '종합병원', maxResults: 5 },
  { category: 'medical', value: 'clinic', label: '병의원', maxResults: 5 },
  { category: 'medical', value: 'pharmacy', label: '약국', maxResults: 5 },

  // 교육 시설
  {
    category: 'education',
    value: 'elementary_school',
    label: '초등학교',
    maxResults: 5,
  },
  {
    category: 'education',
    value: 'middle_school',
    label: '중학교',
    maxResults: 5,
  },
  {
    category: 'education',
    value: 'high_school',
    label: '고등학교',
    maxResults: 5,
  },
  {
    category: 'education',
    value: 'university',
    label: '대학교',
    maxResults: 3,
  },

  // 교통 시설
  {
    category: 'transportation',
    value: 'subway_station',
    label: '지하철',
    maxResults: 5,
  },
  {
    category: 'transportation',
    value: 'train_station',
    label: '기차역',
    maxResults: 3,
  },
  {
    category: 'transportation',
    value: 'airport',
    label: '공항',
    maxResults: 1,
  },

  // 생활 편의시설
  {
    category: 'living',
    value: 'supermarket',
    label: '대형마트',
    maxResults: 5,
  },
  {
    category: 'living',
    value: 'convenience_store',
    label: '편의점',
    maxResults: 5,
  },
  {
    category: 'living',
    value: 'korean_grocery',
    label: '한인마트',
    maxResults: 5,
  },
  {
    category: 'living',
    value: 'korean_restaurant',
    label: '한식당',
    maxResults: 5,
  },

  // 공공/행정 시설
  {
    category: 'public',
    value: 'korean_embassy',
    label: '한국 대사관/영사관',
    maxResults: 1,
  },
  { category: 'public', value: 'bank', label: '은행', maxResults: 5 },
  {
    category: 'public',
    value: 'police_station',
    label: '경찰서',
    maxResults: 3,
  },

  // 문화/여가 시설
  { category: 'leisure', value: 'park', label: '공원', maxResults: 5 },
  { category: 'leisure', value: 'library', label: '도서관', maxResults: 5 },
  {
    category: 'leisure',
    value: 'movie_theater',
    label: '영화관',
    maxResults: 5,
  },
  {
    category: 'leisure',
    value: 'shopping_mall',
    label: '쇼핑몰',
    maxResults: 3,
  },
  {
    category: 'leisure',
    value: 'tourist_attraction',
    label: '랜드마크/명소',
    maxResults: 1,
  },

  // 종교 시설
  { category: 'religious', value: 'church', label: '교회', maxResults: 5 },
  { category: 'religious', value: 'temple', label: '절/사찰', maxResults: 5 },
] as const;

/**
 * 카테고리별 편의시설 그룹
 */
export const FACILITIES_BY_CATEGORY = {
  medical: {
    label: '의료 시설',
    facilities: REQUIRED_FACILITIES.filter((f) => f.category === 'medical'),
  },
  education: {
    label: '교육 시설',
    facilities: REQUIRED_FACILITIES.filter((f) => f.category === 'education'),
  },
  transportation: {
    label: '교통 시설',
    facilities: REQUIRED_FACILITIES.filter((f) => f.category === 'transportation'),
  },
  living: {
    label: '생활 편의시설',
    facilities: REQUIRED_FACILITIES.filter((f) => f.category === 'living'),
  },
  public: {
    label: '공공/행정 시설',
    facilities: REQUIRED_FACILITIES.filter((f) => f.category === 'public'),
  },
  leisure: {
    label: '문화/여가 시설',
    facilities: REQUIRED_FACILITIES.filter((f) => f.category === 'leisure'),
  },
  religious: {
    label: '종교 시설',
    facilities: REQUIRED_FACILITIES.filter((f) => f.category === 'religious'),
  },
} as const;

/**
 * 시설 value로 label(표시 이름)을 가져옵니다.
 */
export const getFacilityLabel = (facilityValue: string): string => {
  const facility = REQUIRED_FACILITIES.find((f) => f.value === facilityValue);
  return facility?.label || facilityValue; // 못 찾으면 원본 value 반환
};

/**
 * 시설의 최대 검색 개수 가져오기
 */
export const getFacilityMaxResults = (facilityValue: string): number => {
  const facility = REQUIRED_FACILITIES.find((f) => f.value === facilityValue);
  return facility?.maxResults || 5; // 기본값 5
};

export type FacilityValue = (typeof REQUIRED_FACILITIES)[number]['value'];
