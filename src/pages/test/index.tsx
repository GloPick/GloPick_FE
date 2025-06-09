import UserInfo from '@/components/mypage/UserInfo';
import SimulationResultCard from '@/components/simulation/SimulationResultCard';

const dummySimulationResult = {
  result: {
    country: '미국',
    recommendedCity: '매디슨',
    localInfo: {
      publicTransport:
        '버스가 주요 교통수단입니다. 하지만 운전면허가 있으므로 차량 이용이 가능합니다.',
      safetyLevel: '대한민국과 비교하여 치안이 좋으나, 항상 주의가 필요합니다.',
      climateSummary: '사계절이 뚜렷하며 겨울에는 매우 추워집니다.',
      koreanCommunity: '한인 마트와 한식당이 몇 군데 있습니다.',
      essentialFacilities: [
        'University Hospital',
        "Woodman's Food Market",
        'Chicago Consulate General',
      ],
      culturalTips: '현지인들은 친절하며, 다양한 문화를 존중합니다.',
      warnings: '겨울철 눈길 운전에 주의해야 합니다.',
    },
    estimatedMonthlyCost: {
      housing: '100만원',
      food: '40만원',
      transportation: '20만원',
      etc: '30만원',
      total: '190만원',
      oneYearCost: '2280만원',
      costCuttingTips: '대중교통을 이용하거나, 중고 가구를 활용하는 것이 좋습니다.',
      cpi: '대한민국 보다 1.2배 정도 물가가 높은 편입니다.',
    },
    nearestAirport: {
      name: 'Dane County Regional Airport',
      city: '매디슨',
      code: 'MSN',
    },
    initialSetup: {
      shortTermHousingOptions: ['호텔', '호스텔', '에어비앤비'],
      longTermHousingPlatforms: ['Zillow', 'Apartments.com'],
      mobilePlan: '선불 심카드가 편리합니다 (예: AT&T, T-Mobile)',
      bankAccount: '여권과 주소 증빙만으로 계좌 개설이 가능합니다.',
    },
    jobReality: {
      commonJobs: ['원격 근무가 가능한 IT, 마케팅, 디자인 등의 직종이 추천됩니다.'],
      jobSearchPlatforms: ['Indeed', 'LinkedIn', 'Glassdoor'],
      languageRequirement: '영어 중급 이상 필수',
      visaLimitationTips: '취업 비자는 고용주 스폰서가 필요합니다.',
    },
    culturalIntegration: {
      koreanPopulationRate: '전체 인구의 약 0.5% 이므로 한국인이 많지 않습니다.',
      foreignResidentRatio: '8.5%',
      koreanResourcesLinks: [
        'https://www.koreanmadison.org',
        'https://www.facebook.com/groups/2204690880',
      ],
    },
  },
  flightLinks: {
    googleFlights:
      'https://www.google.com/travel/flights?q=Flights from Incheon%20International%20Airport%20(ICN) to MSN/one way',
    skyscanner: 'https://www.skyscanner.co.kr/transport/flights/icn/msn/',
  },
  scores: {
    employmentProbability: 88,
    migrationSuitability: 59,
  },
};

const Test = () => {
  return (
    // <SimulationResultCard
    //   result={dummySimulationResult.result}
    //   flightLinks={dummySimulationResult.flightLinks}
    //   scores={dummySimulationResult.scores}
    // />
    <section className="mb-6">
      <UserInfo />
    </section>
  );
};
export default Test;
