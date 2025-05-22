import SimulationResultCard from '@/components/simulation/SimulationResultCard';

const dummySimulationResult = {
  result: {
    country: '캐나다',
    recommendedCity: '밴쿠버',
    localInfo: {
      publicTransport: 'SkyTrain, 버스, Seabus 등 다양한 교통수단이 잘 갖춰져 있습니다.',
      safetyLevel: '전반적으로 안전한 도시로 평가되며, 관광지 주변은 비교적 혼잡할 수 있습니다.',
      climateSummary: '온화한 해양성 기후로 겨울에도 비교적 따뜻하며, 비가 자주 내립니다.',
      essentialFacilities: ['병원', '마트', '은행', '한인마트'],
    },
    initialSetup: {
      shortTermHousingOptions: ['호텔', '에어비앤비', '게스트하우스'],
      longTermHousingPlatforms: ['Zillow', 'Rentals.ca', 'Kijiji'],
    },
    jobReality: {
      commonJobs: ['프론트엔드 개발자', 'UX 디자이너', 'QA 엔지니어'],
      jobSearchPlatforms: ['LinkedIn', 'Indeed', 'JobBank'],
    },
    culturalIntegration: {
      koreanResourcesLinks: ['https://vankorean.com', 'https://hellovancouver.ca'],
      culturalIntegrationPrograms: ['밴쿠버 한인회 모임', '영어/한국어 언어교환 프로그램'],
    },
    employmentProbability: 87,
    migrationSuitability: 78,
  },
  flightLinks: {
    googleFlights:
      'https://www.google.com/flights?hl=ko#flt=/m/05qtj..2024-08-01;c:KRW;e:1;sd:1;t:f',
    skyscanner: 'https://www.skyscanner.co.kr/transport/flights/icn/yvr/',
  },
};

const Test = () => {
  return (
    <SimulationResultCard
      result={dummySimulationResult.result}
      flightLinks={dummySimulationResult.flightLinks}
    />
  );
};
export default Test;
