import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeightInputGroup from '../../components/profile/WeightInputGroup';
import InputForm from '@/components/profile/InputForm';
import {
  InputFormState,
  PostCountryRecommendationPayload,
  QualityOfLifeWeights,
  Weights,
} from '@/types/profile';
import { getCountryRecommendation, postCountryRecommendation } from '@/api/profile';
import { useAuthStore } from '@/store/authStore';
import { Button, Loading } from '@/components/shared';
import { PERSISTENCE_KEY } from '@/constants';
import QOLWeightInputGroup from '@/components/profile/QOLWeightInputGroup';
import { AnimatePresence, motion } from 'framer-motion';

// 로컬 스토리지에서 초기 상태 로드
const loadInitialData = (): {
  data: InputFormState;
  qol: QualityOfLifeWeights;
  weights: Weights;
} => {
  const saved = localStorage.getItem(PERSISTENCE_KEY);
  if (saved) {
    try {
      // JSON 파싱 및 유효성 검사
      const parsed = JSON.parse(saved);
      if (
        parsed?.data &&
        typeof parsed.data.jobField === 'string' &&
        typeof parsed.data.language === 'string' &&
        parsed?.weights &&
        typeof parsed.weights.languageWeight === 'number' &&
        typeof parsed.weights.jobWeight === 'number' &&
        typeof parsed.weights.qolWeight === 'number' &&
        parsed?.qol &&
        typeof parsed.qol.income === 'number' &&
        typeof parsed.qol.jobs === 'number' &&
        typeof parsed.qol.health === 'number' &&
        typeof parsed.qol.safety === 'number' &&
        typeof parsed.qol.lifeSatisfaction === 'number'
      ) {
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved data', e);
    }
  }
  // 기본 초기값
  return {
    data: { jobField: '', language: '' },
    weights: { qolWeight: 40, jobWeight: 30, languageWeight: 30 },
    qol: { income: 20, jobs: 20, health: 20, safety: 20, lifeSatisfaction: 20 },
  };
};

const steps = [
  { id: 1, title: '기본 정보 입력' },
  {
    id: 2,
    title: 'QOL 설정',
  },
  { id: 3, title: '항목 중요도 설정' },
];

const InputPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  // 상태 관리
  const [step, setStep] = useState(1);
  const initial = useMemo(() => loadInitialData(), []);
  const [data, setData] = useState<InputFormState>(initial.data);
  const [qol, setQol] = useState<QualityOfLifeWeights>(initial.qol);
  const [weights, setWeights] = useState<Weights>(initial.weights);
  const initialQolTotal =
    initial.qol.income +
    initial.qol.jobs +
    initial.qol.health +
    initial.qol.safety +
    initial.qol.lifeSatisfaction;
  const initialWeightsTotal =
    initial.weights.qolWeight + initial.weights.jobWeight + initial.weights.languageWeight;
  const [qolTotal, setQolTotal] = useState<number>(initialQolTotal);
  const [currentTotal, setCurrentTotal] = useState<number>(initialWeightsTotal);

  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // [Persistence] 상태 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(PERSISTENCE_KEY, JSON.stringify({ data, weights, qol }));
  }, [data, weights, qol]);

  const onFieldChange = useCallback((field: keyof InputFormState, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setGlobalError(null); // 입력 시 에러 초기화
  }, []);

  const onQolChange = useCallback((newQol: QualityOfLifeWeights, total: number) => {
    setQol(newQol);
    setQolTotal(total);
  }, []);

  const onWeightsChange = useCallback((newWeights: Weights, total: number) => {
    setWeights(newWeights);
    setCurrentTotal(total);
    setGlobalError(null);
  }, []);

  const isFormValid = useMemo(() => {
    return data.jobField && data.language && currentTotal === 100 && qolTotal === 100;
  }, [data, currentTotal, qolTotal]);

  const handleSubmit = async () => {
    setGlobalError(null);

    if (!isFormValid) {
      setGlobalError('모든 필수 정보를 입력해주세요.');
      return;
    }

    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      setLoading(false);
      return;
    }

    const profileRequestData: PostCountryRecommendationPayload = {
      language: data.language,
      desiredJob: data.jobField,
      qualityOfLifeWeights: qol,
      languageWeight: weights.languageWeight,
      qualityOfLifeWeight: weights.qolWeight,
      jobWeight: weights.jobWeight,
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

      localStorage.removeItem(PERSISTENCE_KEY);
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

  const validateCurrentStep = (): boolean => {
    if (step === 1) {
      if (!data.jobField || !data.language) {
        setGlobalError('직무와 언어를 모두 선택해주세요.');
        return false;
      }
    }
    if (step === 2) {
      if (qolTotal !== 100) {
        setGlobalError('QOL 세부 항목의 합계가 100%가 되어야 합니다.');
        return false;
      }
    }
    if (step === 3) {
      if (currentTotal !== 100) {
        setGlobalError('직무, 언어, QOL 중요도의 합계가 100%가 되어야 합니다.');
        return false;
      }
    }
    setGlobalError(null);
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep((s) => Math.min(s + 1, 3));
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="flex justify-center px-6 py-14 bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="w-full max-w-4xl">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-10 relative">
          {steps.map((s, index) => (
            <div key={s.id} className="flex flex-col items-center w-1/3 relative">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold border-2 transition-all duration-300 ${
                  step >= s.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {s.id}
              </div>
              <p
                className={`text-sm mt-2 font-semibold ${
                  step === s.id ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {s.title}
              </p>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-full w-full h-[2px] -translate-x-1/2 ${
                    step > s.id ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* 단계별 내용 */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.section
              key="step1"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
            >
              <InputForm
                {...data}
                onCategoryChange={(v) => onFieldChange('jobField', v)}
                onLanguageChange={(v) => onFieldChange('language', v)}
              />
            </motion.section>
          )}

          {step === 2 && (
            <motion.section
              key="step2"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
            >
              <QOLWeightInputGroup qol={qol} onChange={onQolChange} />
            </motion.section>
          )}

          {step === 3 && (
            <motion.section
              key="step3"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
            >
              <WeightInputGroup weights={weights} onWeightsChange={onWeightsChange} />
            </motion.section>
          )}
        </AnimatePresence>

        {/* 하단 버튼 */}
        <div className="flex justify-between mt-10">
          {step > 1 ? (
            <Button variant="secondary" onClick={prevStep}>
              ← 이전
            </Button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <Button variant="primary" onClick={nextStep}>
              다음 →
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              국가 추천받기 →
            </Button>
          )}
        </div>

        {globalError && (
          <div className="mt-6 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm">
            {globalError}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputPage;
