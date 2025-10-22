import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeightInputGroup from '../../components/profile/WeightInputGroup';
import InputForm from '@/components/profile/InputForm';
import { InputFormState, PostCountryRecommendationPayload, Weights } from '@/types/profile';
import { getCountryRecommendation, postCountryRecommendation } from '@/api/profile';
import { useAuthStore } from '@/store/authStore';
import { Button, Loading } from '@/components/shared';
import { PERSISTENCE_KEY } from '@/constants';
import { toISCOJobField } from '@/utils/isco';

// 로컬 스토리지에서 초기 상태 로드
const loadInitialData = (): { data: InputFormState; weights: Weights } => {
  const saved = localStorage.getItem(PERSISTENCE_KEY);
  if (saved) {
    try {
      // JSON 파싱 및 유효성 검사
      const parsed = JSON.parse(saved);
      if (
        parsed?.data &&
        typeof parsed.data.jobField === 'string' &&
        typeof parsed.data.expectedSalary === 'string' &&
        typeof parsed.data.language === 'string' &&
        parsed?.weights &&
        typeof parsed.weights.languageWeight === 'number' &&
        typeof parsed.weights.salaryWeight === 'number' &&
        typeof parsed.weights.jobWeight === 'number'
      ) {
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved data', e);
    }
  }
  // 기본 초기값
  return {
    data: { jobField: '', expectedSalary: '', language: '' },
    weights: { salaryWeight: 40, jobWeight: 30, languageWeight: 30 },
  };
};

const InputPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  // 상태 관리
  const [data, setData] = useState<InputFormState>(() => loadInitialData().data);
  const [weights, setWeights] = useState<Weights>(() => loadInitialData().weights);
  const [currentTotal, setCurrentTotal] = useState<number>(100);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // [Persistence] 상태 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(PERSISTENCE_KEY, JSON.stringify({ data, weights }));
  }, [data, weights]);

  const onFieldChange = useCallback((field: keyof InputFormState, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setGlobalError(null); // 입력 시 에러 초기화
  }, []);

  const onWeightsChange = useCallback((newWeights: Weights, total: number) => {
    setWeights(newWeights);
    setCurrentTotal(total);
    setGlobalError(null);
  }, []);

  const isFormValid = useMemo(() => {
    const hasAllFields = data.jobField && data.language && data.expectedSalary;
    const salaryNumeric = parseInt(data.expectedSalary || '0');
    const isSalaryValid = !isNaN(salaryNumeric) && salaryNumeric >= 20000000;
    const isValidWeights = currentTotal === 100;

    return hasAllFields && isSalaryValid && isValidWeights;
  }, [data, currentTotal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    if (!isFormValid) {
      setGlobalError('모든 필수 정보를 입력해주세요.');
      return;
    }

    setLoading(true);

    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      setLoading(false);
      return;
    }

    const profileRequestData: PostCountryRecommendationPayload = {
      language: data.language,
      expectedSalary: parseInt(data.expectedSalary),
      jobField: toISCOJobField(data.jobField),
      weights: weights,
    };

    // 1단계 API 호출: 국가 추천 리스트 받기
    try {
      const profileResponse = await postCountryRecommendation(profileRequestData, token);

      if (!profileResponse || !profileResponse.data?.profileId) {
        throw new Error('국가 추천 결과를 불러오는 데 실패했습니다.');
      }

      const profileId = profileResponse.data.profileId;

      const countryResponse = await getCountryRecommendation(profileId, token);

      if (!countryResponse.success) {
        throw new Error('국가 추천 결과를 불러오는 데 실패했습니다.');
      }

      const recommendedCountries = countryResponse.data.recommendations;

      // 성공 시, 2단계 페이지로 이동하며 데이터 전달
      navigate('/countries', {
        state: { initialData: profileRequestData, profileId, results: recommendedCountries },
      });
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="국가 추천 분석 중..." />;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-full bg-white px-10 py-4 rounded-2xl space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 leading-tight">
          글로벌 커리어 <span className="text-blue-600">데이터로 맞춤 추천받기</span>
        </h1>

        <p className="text-center text-lg text-gray-700 font-medium">
          희망 직무, 연봉, 언어 조건을 설정하고, 당신의 목표에 가장 가까운 국가와 도시를 설계하세요.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              {/* 1. 기본 정보 입력 컴포넌트 */}
              <InputForm
                {...data}
                onCategoryChange={(val) => onFieldChange('jobField', val)}
                onSalaryChange={(val) => onFieldChange('expectedSalary', val)}
                onLanguageChange={(val) => onFieldChange('language', val)}
              />
            </div>

            <div className="md:w-1/2">
              {/* 2. 가중치 설정 그룹 컴포넌트 */}
              <WeightInputGroup weights={weights} onWeightsChange={onWeightsChange} />
            </div>
          </div>

          {/* 에러 및 제출 버튼 */}
          {globalError && (
            <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm">
              {globalError}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full py-4 text-lg font-semibold mt-4"
          >
            국가 추천받기 →
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InputPage;
