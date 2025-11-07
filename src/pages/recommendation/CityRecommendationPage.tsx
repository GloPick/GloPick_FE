import { useRecommendationStore } from '@/store/recommendationStore';
import { CityRecommendation } from '@/types/profile';
import { Button } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

const CityRecommendationPage = () => {
  const navigate = useNavigate();
  const { profileId, inputId, selectedCountry, cities } = useRecommendationStore();

  const handleClickCity = (clickedCity: CityRecommendation) => {
    navigate('/simulation/input', {
      state: {
        profileId: profileId,
        inputId: inputId,
        cities: cities,
        selectedCountry: selectedCountry,
        selectedCity: clickedCity.name,
      },
    });
  };

  if (!cities || cities.length === 0 || !selectedCountry) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
        <p className="text-lg">추천 결과가 없거나 잘못된 접근입니다 😢</p>
        <Button className="mt-4" onClick={() => navigate('/countries')}>
          국가 추천 결과로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      <section className="relative rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-r from-[#1F2A44] via-[#30477D] to-[#3B82F6] text-white py-16 px-8 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-blue-100 mb-2">
            GloPick이 추천하는 당신의 다음 목적지
          </h2>
          <h1 className="text-5xl font-extrabold mt-2 leading-tight">
            <span className="text-white">{selectedCountry.country.name}</span>의 추천 도시들
          </h1>
          <p className="text-blue-200 text-lg mt-6 max-w-xl">
            당신의 프로필을 기반으로 {selectedCountry.country.name} 내에서 가장 적합한 3곳의 도시를
            엄선했습니다. 각 도시를 클릭하여 자세한 정보를 확인하고 시뮬레이션을 시작하세요.
          </p>
        </div>
      </section>

      {/* ====================== */}
      {/* 추천 도시 리스트 */}
      {/* ====================== */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <div
              key={city.name}
              className="relative border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col text-left"
              onClick={() => handleClickCity(city)}
            >
              <h4 className="text-lg font-bold text-gray-900">{city.name}</h4>
              <p className="text-sm text-gray-600 mt-2 flex-grow">{city.summary}</p>

              <span className="mt-4 w-full text-center py-2 text-sm font-bold bg-transparent border-2 border-blue-700 text-blue-700 rounded-full">
                선택하기 →
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CityRecommendationPage;
