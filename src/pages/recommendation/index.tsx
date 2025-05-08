import FlowSteps from '@/components/recommendation/FlowSteps';
import RecommendationCard from '@/components/recommendation/RecommendationCard';
import { useNavigate } from 'react-router-dom';

const Recommendation = () => {
  const navigate = useNavigate();

  const handleSelectCountry = (country: string) => {
    navigate('/', { state: { selectedCountry: country } });
  };

  // 예시 데이터 (실제로는 GPT 응답을 전달받음)
  const recommendations = [
    {
      country: '캐나다',
      job: '프론트엔드 개발자',
      reason: 'React 경험과 영어 능력을 기반으로 북미 시장에 적합합니다.',
    },
    {
      country: '독일',
      job: '백엔드 엔지니어',
      reason: 'Node.js 경험이 많고, 유럽 취업 비자 발급이 용이합니다.',
    },
    {
      country: '호주',
      job: 'UX 디자이너',
      reason: '다문화 환경에서 디자인 경험을 살릴 수 있습니다.',
    },
  ];

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

      {/* 플로우 스텝 */}
      <FlowSteps currentStep={1} />

      {/* 추천 결과 카드 */}
      <div className="grid md:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <RecommendationCard
            key={item.country}
            country={item.country}
            job={item.job}
            reason={item.reason}
            onSelect={() => handleSelectCountry(item.country)}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
