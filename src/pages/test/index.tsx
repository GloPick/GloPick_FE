import FlowSteps from '@/components/recommendation/FlowSteps';
import RecommendationCard from '@/components/recommendation/CountryRecommendationCard';
import SimulationForm from '@/components/simulation/SimulationForm';
import { useState } from 'react';

const Test = () => {
  const [recommendedCountry] = useState([
    {
      country: '미국',
      job: '프론트엔드 개발자',
      reason: '실리콘밸리 등 IT 산업이 발달하고, 프론트엔드 개발자 수요가 높습니다.',
    },
    {
      country: '캐나다',
      job: '프론트엔드 개발자',
      reason: '원격 근무가 활성화되어 있고, 영어 환경에 적합합니다.',
    },
    {
      country: '호주',
      job: '프론트엔드 개발자',
      reason: 'IT 산업 성장 중이며, 영어를 잘하면 취업에 유리합니다.',
    },
  ]);

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedRankIndex, setSelectedRankIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [recommendedCities] = useState([
    {
      name: '포틀랜드, 오리건',
      summary: '자연환경이 좋고, 대중교통이 잘 발달된 도시입니다.',
    },
    {
      name: '매디슨, 위스콘신',
      summary: '추운 날씨와 문화생활이 풍부한 도시입니다.',
    },
    {
      name: '보이지, 아이다호',
      summary: '저렴한 생활비와 친절한 이웃들이 있는 도시입니다.',
    },
  ]);

  const [simulationResult] = useState({
    data: {
      simulationResult: {
        result: {
          recommendedCity: '밴프',
          estimatedMonthlyCost: {
            total: '270',
          },
          jobOpportunity: '원격 근무 가능 직종 많음',
          culturalTips: '다문화 친화적이며 영어 사용 환경',
          warnings: '비자 준비 필요',
        },
      },
      flightLinks: {
        googleFlights: 'https://www.google.com/travel/flights?q=Flights+from+ICN+to+YYC',
        skyscanner: 'https://www.skyscanner.co.kr/transport/flights/icn/yyc/',
      },
    },
  });

  const handleSelectCountry = (country: string, index: number) => {
    setSelectedCountry(country);
    setSelectedRankIndex(index);
    setCurrentStep(2);
  };

  const handleSubmitSimulation = () => {
    setCurrentStep(3);
  };

  const handleSelectCity = () => {
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4 md:px-8">
      {/* Hero section */}
      <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
        <img
          src="/assets/recommend__img.jpg"
          alt="recommendation visual"
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-white text-2xl md:text-4xl font-bold mb-4 drop-shadow-md">
            당신에게 맞는 글로벌 커리어를 추천합니다
          </h1>
          <p className="text-white text-sm md:text-lg font-semibold max-w-xl">
            입력한 이력을 기반으로 AI가 추천하는 국가와 직무를 확인해보세요.
            <br />
            기술 스택, 경력, 언어 능력 등을 종합 분석하여 가장 적합한 옵션을 제시합니다.
          </p>
        </div>
      </div>

      <FlowSteps currentStep={currentStep} />

      {/* Step 1: 국가 선택 */}
      {currentStep === 1 && (
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {recommendedCountry.map((item, idx) => (
            <RecommendationCard
              key={item.country}
              country={item.country}
              job={item.job}
              reason={item.reason}
              onSelect={() => handleSelectCountry(item.country, idx)}
            />
          ))}
        </div>
      )}

      {/* Step 2: 시뮬레이션 폼 입력 */}
      {currentStep === 2 && (
        <div className="w-full min-h-[60vh] flex justify-center items-start mt-10 px-4">
          <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">
              선택한 국가: <span className="text-primary">{selectedCountry}</span>
            </h2>
            <SimulationForm
              onSubmit={handleSubmitSimulation}
              profileId="dummy"
              recommendationId="dummy"
              selectedRankIndex={selectedRankIndex}
            />
          </div>
        </div>
      )}

      {/* Step 3: 도시 추천 결과 */}
      {currentStep === 3 && (
        <div className="w-full max-w-4xl mt-10">
          <h2 className="text-xl font-bold text-center mb-6">도시 추천 결과</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedCities.map((city, idx) => (
              <div
                key={city.name}
                className="bg-white p-4 rounded-xl shadow-md cursor-pointer hover:shadow-lg"
                onClick={handleSelectCity}
              >
                <h3 className="text-lg font-semibold text-primary mb-2">{city.name}</h3>
                <p className="text-sm text-gray-700">{city.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: 최종 시뮬레이션 결과 */}
      {currentStep === 4 && simulationResult && (
        <div className="w-full max-w-4xl mt-10">
          <h2 className="text-xl font-bold text-center mb-6 text-primary">최종 시뮬레이션 결과</h2>
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <p>
              <strong>추천 도시:</strong>{' '}
              {simulationResult.data.simulationResult.result.recommendedCity}
            </p>
            <p>
              <strong>비용:</strong> 총{' '}
              {simulationResult.data.simulationResult.result.estimatedMonthlyCost.total} 만원
            </p>
            <p>
              <strong>취업 기회:</strong>{' '}
              {simulationResult.data.simulationResult.result.jobOpportunity}
            </p>
            <p>
              <strong>문화 팁:</strong> {simulationResult.data.simulationResult.result.culturalTips}
            </p>
            <p>
              <strong>주의 사항:</strong> {simulationResult.data.simulationResult.result.warnings}
            </p>
            <div>
              <a
                href={simulationResult.data.flightLinks.googleFlights}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Google Flights 보기
              </a>
              <br />
              <a
                href={simulationResult.data.flightLinks.skyscanner}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Skyscanner 보기
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Test;
