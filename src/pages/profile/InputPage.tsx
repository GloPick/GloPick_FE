import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeightInputGroup from '../../components/profile/WeightInputGroup';
import InputForm from '@/components/profile/InputForm';
import { InputFormState, Weights } from '@/types/profile';
import { postCountryRecommendation } from '@/api/profile';
import { useAuthStore } from '@/store/authStore';
import { Button, Loading } from '@/components/shared';
import { PERSISTENCE_KEY } from '@/constants';

// 로컬 스토리지에서 초기 상태 로드
const loadInitialData = () => {
  const saved = localStorage.getItem(PERSISTENCE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved data', e);
    }
  }
  // 기본 초기값
  return {
    data: { jobCategory: '', desiredSalary: '', language: '' } as InputFormState,
    weights: { salary: 34, job: 33, language: 33 } as Weights,
  };
};

const InputPage: React.FC = () => {
  const navigate = useNavigate();
  const initial = loadInitialData();
  const { token } = useAuthStore();

  // 상태 관리
  const [data, setData] = useState<InputFormState>(initial.data);
  const [weights, setWeights] = useState<Weights>(initial.weights);
  const [currentTotal, setCurrentTotal] = useState<number>(100);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // [Persistence] 상태 변경 시 localStorage에 저장
  useEffect(() => {
    const fullState = { data, weights };
    localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(fullState));
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
    const hasAllFields = data.jobCategory && data.language && data.desiredSalary;
    const salaryNumeric = parseInt(data.desiredSalary || '0');
    const isSalaryValid = !isNaN(salaryNumeric) && salaryNumeric >= 10000000;
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

    const requestData = {
      jobCategory: data.jobCategory,
      desiredSalary: parseInt(data.desiredSalary),
      language: data.language,
      weights: weights,
    };

    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      setLoading(false);
      return;
    }

    // 1단계 API 호출: 국가 추천 리스트 받기
    try {
      const response = await postCountryRecommendation(requestData, token);

      if (!response.success) {
        throw new Error('국가 추천 결과를 불러오는 데 실패했습니다.');
      }

      const recommendedCountries = response.data.countries;

      // 성공 시, 2단계 페이지로 이동하며 데이터 전달
      navigate('/countries', {
        state: { initialData: requestData, results: recommendedCountries },
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
                onCategoryChange={(val) => onFieldChange('jobCategory', val)}
                onSalaryChange={(val) => onFieldChange('desiredSalary', val)}
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
