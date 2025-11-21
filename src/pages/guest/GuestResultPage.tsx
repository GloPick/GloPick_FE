import { Button } from '@/components/shared';
import { useModalStore } from '@/store/modalStore';
import { PostGuestCountryResponseData, SingleRecommendation } from '@/types/guest';
import { getFlagUrl } from '@/utils/formatters';
import { useLocation, useNavigate } from 'react-router-dom';

const GuestResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const state = location.state as {
    recommendations: SingleRecommendation[];
    userProfile: PostGuestCountryResponseData['userProfile'];
  };
  const recommendations = state?.recommendations;

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
        <p className="text-lg">추천 결과를 불러올 수 없습니다 😢</p>
        <Button className="mt-4" onClick={() => navigate('/guest-input')}>
          다시 시도하기
        </Button>
      </div>
    );
  }

  const topCountry = recommendations[0];
  const otherCountries = recommendations.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      <section className="relative rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-r from-[#1F2A44] via-[#30477D] to-[#3B82F6] text-white py-16 px-8 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />

        <h2 className="text-xl font-semibold text-blue-100 mb-2">
          분석 결과, 당신에게 가장 잘 맞는 국가는
        </h2>

        <div className="flex flex-col items-center mt-4 relative z-10">
          {/* 국기 */}
          <img
            src={getFlagUrl(topCountry.country.code, 80)}
            alt={`${topCountry.country.name} flag`}
            className="w-16 h-10 rounded-md shadow-lg border border-white/20"
          />

          <h1 className="text-5xl font-extrabold mt-4">{topCountry.country.name}</h1>

          <p className="mt-2 text-blue-100 text-lg font-medium">
            종합 점수{' '}
            <span className="text-white font-bold">{topCountry.totalScore.toFixed(1)}</span>점
          </p>

          <p className="text-blue-200 text-sm mt-3 max-w-md">
            삶의 질, 고용 안정성, 안전성 등 주요 지표에서 우수한 성과를 보이는 국가입니다.
          </p>
          <p className="text-sm text-blue-100 mt-2">
            회원가입 후 도시 추천과 상세 시뮬레이션이 가능합니다.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1F2A44]/80 to-transparent" />
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          다른 추천 국가 목록
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {otherCountries.map((item) => (
            <div
              key={item.country.code}
              className="relative border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-lg hover:-translate-y-1 transition-all text-center"
            >
              <span className="absolute top-4 left-4 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                #{item.rank}위
              </span>

              {/* 국기 */}
              <img
                src={getFlagUrl(item.country.code, 80)}
                alt={`${item.country.name} flag`}
                className="w-12 h-8 mx-auto rounded-sm shadow-sm border mt-2"
              />

              <h4 className="text-lg font-bold text-gray-900 mt-4">{item.country.name}</h4>
              <p className="text-sm text-gray-600 mt-1">
                종합 점수{' '}
                <span className="font-bold text-gray-800">{item.totalScore.toFixed(1)}</span>점
              </p>

              <Button
                variant="secondary"
                className="mt-4 w-full py-2 text-sm"
                onClick={() => openModal('signup')}
              >
                상세 결과는 로그인 후 확인
              </Button>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center pt-8">
        <p className="text-xl font-semibold text-gray-700 mb-4">
          결과를 저장하고 나만의 최적화된 이주 계획을 세우세요.
        </p>
        <Button
          className="w-80 py-4 text-xl text-blue-700 font-bold hover:text-blue-500"
          onClick={() => openModal('signup')}
        >
          회원가입 하러가기 →
        </Button>
      </div>
    </div>
  );
};

export default GuestResultPage;
