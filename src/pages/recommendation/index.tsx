import {
  getCountryRecommend,
  postCityRecommend,
  postSimulationForm,
  postSimulationResult,
} from '@/api/simulation';
import FlowSteps from '@/components/recommendation/FlowSteps';
import RecommendationCard from '@/components/recommendation/CountryRecommendationCard';
import SimulationForm from '@/components/simulation/SimulationForm';
import { useAuthStore } from '@/store/authStore';
import { PostProfilePayloadData } from '@/types/resume';
import {
  CountryRanking,
  PostCityResponseData,
  PostSimulationFormPayloadData,
  PostSimulationResponseData,
} from '@/types/simulation';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CityRecommendationCard from '@/components/recommendation/CityRecommendationCard';

const Recommendation = () => {
  const { recommendationId } = useParams<{
    recommendationId: string;
  }>();
  const { token } = useAuthStore();

  const [recommendedCountry, setRecommendedCountry] = useState<CountryRanking[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedRankIndex, setSelectedRankIndex] = useState<number>(0);
  const [profileId, setProfileId] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const [recommendedCities, setRecommendCities] = useState<PostCityResponseData[]>([]);
  const [inputId, setInputId] = useState<string>('');
  const [simulationResult, setSimulationResult] = useState<PostSimulationResponseData | null>(null);

  const [profile, setProfile] = useState<PostProfilePayloadData | null>(null);
  const navigate = useNavigate();

  // 국가 추천 결과 불러오기
  useEffect(() => {
    const fetchCountryRecommendation = async () => {
      if (!recommendationId || !token) {
        return;
      }
      try {
        const response = await getCountryRecommend(token);
        const target = response.data.find((item) => item.recommendationId === recommendationId);
        if (!target) {
          alert('추천 결과가 존재하지 않습니다.');
          navigate('/main');
          return;
        }

        setRecommendedCountry(target.rankings);
        setProfileId(target.profileId);
        setProfile(target.profile);
      } catch (error) {
        console.error(error);
        alert('추천 결과 불러오기 실패');
        navigate('/main');
      }
    };

    fetchCountryRecommendation();
  }, [recommendationId, token]);

  // 국가 선택 시
  const handleSelectCountry = (country: string, index: number) => {
    setSelectedCountry(country);
    setSelectedRankIndex(index);
    setCurrentStep(2);
  };

  // 시뮬레이션 폼 제출 시 & 도시 추천
  const handleSubmitSimulation = async (formData: PostSimulationFormPayloadData) => {
    if (!profileId || !recommendationId || !token) return;

    try {
      const response = await postSimulationForm(
        recommendationId,
        profileId,
        {
          ...formData,
        },
        token,
      );

      const inputId = response.data.inputId;
      setInputId(inputId);
      setCurrentStep(3);

      const cityResponse = await postCityRecommend(inputId, token);
      const cityData = cityResponse.data;

      if (Array.isArray(cityData)) {
        // 성공 응답
        setRecommendCities(cityData);
      } else if ('recommendedCities' in cityData) {
        // 이미 추천된 경우
        const formatted: PostCityResponseData[] = cityData.recommendedCities.map(
          (name: string) => ({
            name,
            summary: '요약 정보가 제공되지 않았습니다.',
          }),
        );
        setRecommendCities(formatted);
        alert('이미 추천된 도시 목록입니다.');
      } else {
        alert('도시 추천 응답 형식이 예상과 다릅니다.');
      }
    } catch (error) {
      console.error(error);
      alert('시뮬레이션 정보를 저장 또는 도시 추천에 실패했습니다.');
    }
  };

  // 도시 선택 및 시뮬레이션
  const handleSelectCity = async (cityIndex: number) => {
    if (!inputId || !token) return;
    try {
      const response = await postSimulationResult(inputId, cityIndex, token);
      setSimulationResult(response.data);
      setCurrentStep(4);
    } catch (error) {
      console.error(error);
      alert('최종 시뮬레이션 생성 실패');
    }
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
      <FlowSteps currentStep={currentStep} />

      {/* step 1. 추천 카드 선택 */}
      {currentStep === 1 && recommendedCountry.length === 0 ? (
        <p className="text-center text-gray-500">추천 결과를 불러오고 있습니다...</p>
      ) : currentStep === 1 ? (
        <div className="w-full max-w-5xl px-4 sm:px-6 md:px-8 mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-primary">🗺️ 국가 추천 결과</h2>
            <p className="text-sm text-gray-500 mt-1">원하는 국가를 선택해주세요.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
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
        </div>
      ) : null}

      {/* step 2. 추가 정보 입력 */}
      {currentStep === 2 && (
        <div className="w-full px-4 sm:px-6 md:px-8">
          <SimulationForm onSubmit={handleSubmitSimulation} selectedCountry={selectedCountry} />
        </div>
      )}

      {/* step 3. 도시 추천 결과 */}
      {currentStep === 3 && recommendedCities.length === 0 ? (
        <p className="text-center text-gray-500">추천 결과를 불러오고 있습니다...</p>
      ) : currentStep === 3 ? (
        <div className="w-full max-w-5xl px-4 sm:px-6 md:px-8 mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-primary">🏙️ 도시 추천 결과</h2>
            <p className="text-sm text-gray-500 mt-1">도시를 클릭하여 시뮬레이션을 시작해보세요.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedCities.map((city, idx) => (
              <CityRecommendationCard
                key={city.name}
                city={city}
                onSelect={() => handleSelectCity(idx)}
              />
            ))}
          </div>
        </div>
      ) : null}

      {/* step 4. 시뮬레이션 결과 */}
      {currentStep === 4 && simulationResult && (
        <div className="w-full max-w-4xl mt-10">
          <h2 className="text-xl font-bold text-center mb-6 text-primary">최종 시뮬레이션 결과</h2>
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <p>
              <strong>추천 도시:</strong> {simulationResult.result.recommendedCity}
            </p>
            <p>
              <strong>국가:</strong> {simulationResult.result.country}
            </p>

            <div>
              <h3 className="text-lg font-semibold mt-4">📍 지역 정보</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  <strong>대중교통:</strong> {simulationResult.result.localInfo.publicTransport}
                </li>
                <li>
                  <strong>치안 수준:</strong> {simulationResult.result.localInfo.safetyLevel}
                </li>
                <li>
                  <strong>기후 요약:</strong> {simulationResult.result.localInfo.climateSummary}
                </li>
                <li>
                  <strong>필수 시설:</strong>{' '}
                  {simulationResult.result.localInfo.essentialFacilities.join(', ')}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mt-4">🏠 주거 정보</h3>
              <p>
                <strong>단기:</strong>{' '}
                {simulationResult.result.initialSetup.shortTermHousingOptions.join(', ')}
              </p>
              <p>
                <strong>장기:</strong>{' '}
                {simulationResult.result.initialSetup.longTermHousingPlatforms.join(', ')}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mt-4">💼 직업 정보</h3>
              <p>
                <strong>일반 직무:</strong>{' '}
                {simulationResult.result.jobReality.commonJobs.join(', ')}
              </p>
              <p>
                <strong>구직 플랫폼:</strong>{' '}
                {simulationResult.result.jobReality.jobSearchPlatforms.join(', ')}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mt-4">🌏 문화 통합</h3>
              <p>
                <strong>한인 커뮤니티 링크:</strong>
              </p>
              <ul className="list-disc ml-5">
                {simulationResult.result.culturalIntegration.koreanResourcesLinks.map(
                  (link, idx) => (
                    <li key={idx}>
                      <a
                        href={link}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link}
                      </a>
                    </li>
                  ),
                )}
              </ul>
              <p>
                <strong>프로그램:</strong>{' '}
                {simulationResult.result.culturalIntegration.culturalIntegrationPrograms.join(', ')}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mt-4">📊 종합 지표</h3>
              <p>
                <strong>취업 가능성:</strong> {simulationResult.result.employmentProbability}%
              </p>
              <p>
                <strong>이주 적합도:</strong> {simulationResult.result.migrationSuitability}%
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mt-4">✈️ 항공편 링크</h3>
              <a
                href={simulationResult.flightLinks.googleFlights}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Flights 보기
              </a>
              <br />
              <a
                href={simulationResult.flightLinks.skyscanner}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
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

export default Recommendation;
