import { postSimulation } from '@/api/profile';
import { Loading } from '@/components/shared';
import MultiSelectDropdown from '@/components/shared/MultiSelectButton';
import SelectDropdown from '@/components/shared/SelectDropdown';
import { AIRPORT_OPTIONS, BUDGET_OPTIONS, FacilityValue } from '@/constants';
import { useAuthStore } from '@/store/authStore';
import { useRecommendationStore } from '@/store/recommendationStore';
import { PostSimulationPayload } from '@/types/profile';
import { Button } from '@headlessui/react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SimulationInputPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCountry, cities, profileId, inputId } = useRecommendationStore();
  const { selectedCity } = location.state || {};
  const { token } = useAuthStore();

  // 1. 폼 상태 관리
  const [initialBudget, setInitialBudget] = useState('');
  const [requiredFacilities, setRequiredFacilities] = useState<FacilityValue[]>([]);
  const [departureAirport, setDepartureAirport] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof PostSimulationPayload, string>>>({});
  const [loading, setLoading] = useState(false);

  const handleFacilityChange = (value: FacilityValue) => {
    const isSelected = requiredFacilities.includes(value);
    if (isSelected) {
      setRequiredFacilities(requiredFacilities.filter((f) => f !== value));
    } else {
      if (requiredFacilities.length < 5) {
        setRequiredFacilities([...requiredFacilities, value]);
      } else {
        alert('필수 편의시설은 최대 5개까지 선택할 수 있습니다.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    const selectedCityIndex = cities?.findIndex((c) => c.name === selectedCity) ?? -1;

    if (
      selectedCityIndex === null ||
      !initialBudget ||
      requiredFacilities.length === 0 ||
      !departureAirport
    ) {
      setErrors({
        initialBudget: !initialBudget ? '초기 정착 예산을 선택해주세요.' : undefined,
        requiredFacilities:
          requiredFacilities.length === 0
            ? '필수 편의시설을 최소 1개 이상 선택해주세요.'
            : undefined,
        departureAirport: !departureAirport ? '출발 공항을 선택해주세요.' : undefined,
      });
      return;
    }

    if (selectedCityIndex === -1) {
      console.error('선택된 도시를 스토어에서 찾을 수 없습니다.');
      return;
    }

    if (!inputId) {
      console.error('추천 입력 ID가 없습니다.');
      return;
    }

    const payload = {
      selectedCityIndex,
      initialBudget,
      requiredFacilities,
      departureAirport,
    };

    setLoading(true);
    try {
      const response = await postSimulation(inputId, payload, token);
      navigate('/simulation/result', {
        state: {
          simulation: response.data.result,
          flightLinks: response.data.flightLinks,
          simulationId: response.data.simulationId,
        },
      });
    } catch (error) {
      console.error('시뮬레이션 생성 실패:', error);
      alert('시뮬레이션 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="시뮬레이션 생성 중..." />;
  }

  if (!selectedCity || !selectedCountry || !profileId) {
    console.log('필수 정보 누락:', { selectedCity, selectedCountry, profileId });
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
        <p className="text-lg">잘못된 접근입니다 😢</p>
        <Button className="mt-4" onClick={() => navigate('/recommendation/country')}>
          국가 추천 결과로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* 페이지 헤더 */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">{selectedCity} 시뮬레이션</h2>
          <p className="text-lg text-gray-600 mt-2">
            {selectedCountry.country.name}에서의 정착을 위한 세부 정보를 입력해주세요.
          </p>
        </div>
      </div>

      {/* 폼 영역 */}
      <div className="bg-white border-y border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6 p-8 md:p-10">
          {/* 초기 정착 예산 */}
          <div>
            <SelectDropdown
              label="초기 정착 예산"
              value={initialBudget}
              onChange={setInitialBudget}
              options={BUDGET_OPTIONS}
              placeholder="예산 범위 선택"
              error={errors.initialBudget}
              required
            />
            <p className="text-sm text-gray-500 mt-2 px-1">
              초기 3개월간의 생활비 및 주거 비용을 포함한 예산입니다.
            </p>
          </div>

          {/* 출발 공항 */}
          <div>
            <SelectDropdown
              label="주요 출발 공항"
              value={departureAirport}
              onChange={setDepartureAirport}
              options={AIRPORT_OPTIONS}
              placeholder="공항 선택"
              error={errors.departureAirport}
              required
            />
            <p className="text-sm text-gray-500 mt-2 px-1">
              항공권 가격 조회를 위해 주로 이용하시는 공항을 선택합니다.
            </p>
          </div>

          {/* 필수 편의시설 */}
          <div>
            <MultiSelectDropdown
              label="필수 편의시설 (최대 5개)"
              selectedValues={requiredFacilities}
              onChange={handleFacilityChange}
              maxSelect={5}
              error={errors.requiredFacilities}
              required
            />
            <p className="text-sm text-gray-500 mt-2 px-1">
              선택한 시설이 가까운 주거 지역을 우선적으로 추천합니다.
            </p>
          </div>

          {/* 제출 버튼 */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full py-3 px-5 text-base font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              시뮬레이션 시작하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimulationInputPage;
