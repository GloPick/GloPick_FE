import React, { useState } from 'react';
import { Button, Loading } from '@/components/shared';
import { useNavigate } from 'react-router-dom';
import { COUNTRY_CODE_MAP } from '@/constants';
import { useRecommendationStore } from '@/store/recommendationStore';
import { CountryRecommendation } from '@/types/profile';
import { Search } from 'lucide-react';
import { useModalStore } from '@/store/modalStore';
import ScoreDetailModal from './ScoreDetailModal';

const CountryRecommendationPage = () => {
  const navigate = useNavigate();
  const { openModal, isOpen, modalType } = useModalStore();
  const { profileId, countries } = useRecommendationStore();

  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryRecommendation | null>(null);

  if (loading) return <Loading message="AI가 맞춤 국가를 분석 중입니다..." />;
  if (!countries || countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
        <p className="text-lg">추천 결과가 없습니다 😢</p>
        <Button className="mt-4" onClick={() => navigate(-1)}>
          다시 시도하기
        </Button>
      </div>
    );
  }

  const topCountry = countries[0];
  const otherCountries = countries.slice(1);

  // 국기 코드 변환 함수
  const getFlagUrl = (code: string, size: number) => {
    const alpha2 = COUNTRY_CODE_MAP[code] || code.slice(0, 2).toLowerCase();
    return `https://flagcdn.com/w${size}/${alpha2}.png`;
  };

  const handleOpenDetailModal = (item: CountryRecommendation) => {
    setSelectedCountry(item);
    openModal('scoreDetail');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-10 pb-12">
      <div className="space-y-12">
        {/* ====================== */}
        {/* 1위 국가 카드 */}
        {/* ====================== */}
        <section className="relative rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-r from-[#1F2A44] via-[#30477D] to-[#3B82F6] text-white py-16 px-8 text-center mb-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />

          <h2 className="text-xl font-semibold text-blue-100 mb-2">
            분석 결과, 당신에게 가장 잘 맞는 국가는
          </h2>

          <div className="flex flex-col items-center mt-4 relative z-10">
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

            {/* 돋보기 버튼 */}
            <button
              onClick={() => handleOpenDetailModal(topCountry)}
              className="text-blue-200 hover:text-white mt-2"
              aria-label="점수 상세 보기"
            >
              <Search size={20} strokeWidth={3} />
            </button>

            <p className="text-blue-200 text-sm mt-3 max-w-md">
              삶의 질, 고용 안정성, 안전성 등 주요 지표에서 우수한 성과를 보이는 국가입니다.
            </p>

            <Button
              className="mt-6 w-52 text-base font-bold shadow-md bg-transparent text-white 
             border-2 border-white rounded-full py-3 transition-all duration-300 
             ease-in-out hover:bg-white hover:text-blue-700 hover:shadow-lg
             focus:outline-none focus:ring-2 focus:ring-white/50"
              onClick={() =>
                navigate('/cities', {
                  state: {
                    country: topCountry.country,
                    profileId,
                  },
                })
              }
            >
              도시 추천 보기 →
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1F2A44]/80 to-transparent" />
        </section>

        {/* ====================== */}
        {/* 2~5위 국가 리스트 */}
        {/* ====================== */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            다른 추천 국가도 확인해보세요
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

                <img
                  src={getFlagUrl(item.country.code, 80)}
                  alt={`${item.country.name} flag`}
                  className="w-12 h-8 mx-auto rounded-sm shadow-sm mt-2"
                />

                <h4 className="text-lg font-bold text-gray-900 mt-4">{item.country.name}</h4>
                {/* 점수 */}
                <div className="flex items-center justify-center space-x-2 mt-1">
                  <p className="text-sm font-semibold text-gray-600">
                    점수 {item.totalScore.toFixed(1)}점
                  </p>
                  {/* 돋보기 버튼 */}
                  <button
                    onClick={() => handleOpenDetailModal(item)}
                    className="text-gray-600 hover:text-blue-600"
                    aria-label="점수 상세 보기"
                  >
                    <Search size={15} strokeWidth={3} />
                  </button>
                </div>

                {/* 인구/고용률 */}
                <div className="text-xs text-gray-500 mt-3 space-y-1">
                  <div className="flex items-center justify-center space-x-1.5">
                    <span>인구: {item.country.population.toLocaleString()}명</span>
                  </div>
                  {/* employmentRate가 있을 때만 표시 */}
                  {item.country.employmentRate ? (
                    <div className="flex items-center justify-center space-x-1.5">
                      <span>고용률: {item.country.employmentRate.toFixed(1)}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-1.5">
                      <span className="text-gray-400">고용률: N/A</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow" />

                <Button
                  variant="none"
                  className="mt-4 w-full py-2 text-sm font-bold bg-transparent border-2 border-blue-800 text-blue-700 rounded-full transition-all duration-300 ease-in-out hover:bg-blue-800 hover:text-white"
                  onClick={() =>
                    navigate('/cities', {
                      state: {
                        country: item.country,
                        profileId,
                      },
                    })
                  }
                >
                  도시 보기
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 점수 상세 모달 */}
      {isOpen && modalType === 'scoreDetail' && selectedCountry && (
        <ScoreDetailModal item={selectedCountry} />
      )}
    </div>
  );
};

export default CountryRecommendationPage;
