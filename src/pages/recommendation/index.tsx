import { postGPTRecommend } from '@/api/gpt';
import FlowSteps from '@/components/recommendation/FlowSteps';
import RecommendationCard from '@/components/recommendation/RecommendationCard';
import { useAuthStore } from '@/store/authStore';
import { GPTRecommendData } from '@/types/gpt';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Recommendation = () => {
  const { id } = useParams();
  const { token } = useAuthStore();
  const [recommendations, setRecommendations] = useState<GPTRecommendData[]>([]);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!id || !token) {
        alert('유효하지 않은 접근입니다.');
        navigate('/main');
        return;
      }
      try {
        const resopnse = await postGPTRecommend(id, token);
        setRecommendations(resopnse.data.rankings);
      } catch (error) {
        console.log(error);
        alert('추천 결과를 불러오는데 실패했습니다.');
      } finally {
        // setLoading(false);
      }
    };
    fetchRecommendations();
  }, [id, token, navigate]);

  const handleSelectCountry = (country: string) => {
    navigate('/', { state: { selectedCountry: country } });
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
