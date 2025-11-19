import { postGuestCountry } from '@/api/guest';
import { Button } from '@/components/shared';
import Loading from '@/components/shared/Loading';
import { PostGuestCountryPayloadData } from '@/types/guest';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import InputForm from '@/components/profile/InputForm';
import QOLWeightInputGroup from '@/components/profile/QOLWeightInputGroup';
import WeightInputGroup from '@/components/profile/WeightInputGroup';

interface LocalProfileData {
  jobField: string;
  language: string;
}
interface LocalQolWeights {
  income: number;
  jobs: number;
  health: number;
  safety: number;
  lifeSatisfaction: number;
}
interface LocalOverallWeights {
  qolWeight: number;
  jobWeight: number;
  languageWeight: number;
}

const steps = [
  { id: 1, title: '기본 정보 입력' },
  { id: 2, title: 'QOL 설정' },
  { id: 3, title: '항목 중요도 설정' },
];

const GuestInputPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [data, setData] = useState<LocalProfileData>({ jobField: '', language: '' });
  const [qol, setQol] = useState<LocalQolWeights>({
    income: 20,
    jobs: 20,
    health: 20,
    safety: 20,
    lifeSatisfaction: 20,
  });
  const [weights, setWeights] = useState<LocalOverallWeights>({
    qolWeight: 40,
    jobWeight: 30,
    languageWeight: 30,
  });

  const qolTotal = useMemo(() => Object.values(qol).reduce((sum, val) => sum + val, 0), [qol]);
  const weightsTotal = useMemo(
    () => weights.languageWeight + weights.jobWeight + weights.qolWeight,
    [weights],
  );

  const validateStep = (): boolean => {
    setGlobalError(null);
    if (step === 1 && (!data.jobField || !data.language)) {
      setGlobalError('직무와 언어를 모두 선택해주세요.');
      return false;
    }
    if (step === 2 && qolTotal !== 100) {
      setGlobalError('QOL 세부 항목의 합계가 100%가 되어야 합니다.');
      return false;
    }
    if (step === 3 && weightsTotal !== 100) {
      setGlobalError('직무, 언어, QOL 중요도의 합계가 100%가 되어야 합니다.');
      return false;
    }
    return true;
  };

  const nextStep = () => validateStep() && setStep(Math.min(step + 1, 3));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setGlobalError(null);

    const payload: PostGuestCountryPayloadData = {
      language: data.language,
      desiredJob: data.jobField,
      qualityOfLifeWeights: qol,
      weights: {
        languageWeight: weights.languageWeight,
        jobWeight: weights.jobWeight,
        qolWeight: weights.qolWeight,
      },
    };

    setLoading(true);
    try {
      const response = await postGuestCountry(payload);

      if (!response.success || !response.data) {
        throw new Error(response.message || '국가 추천 결과를 불러오는 데 실패했습니다.');
      }

      // 성공 시, 결과 페이지로 이동하며 데이터 전달
      navigate('/guest/result', {
        state: {
          recommendations: response.data.recommendations,
          userProfile: response.data.userProfile,
          // ... 기타 필요한 정보 (appliedWeights 등)
        },
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
              {/* InputForm에 로컬 상태 및 핸들러 전달 */}
              <InputForm
                jobField={data.jobField}
                language={data.language}
                onCategoryChange={(v) => setData((prev) => ({ ...prev, jobField: v }))}
                onLanguageChange={(v) => setData((prev) => ({ ...prev, language: v }))}
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
              {/* QOLWeightInputGroup에 로컬 상태 및 핸들러 전달 */}
              <QOLWeightInputGroup qol={qol} onChange={setQol} />
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
              {/* WeightInputGroup에 로컬 상태 및 핸들러 전달 */}
              <WeightInputGroup weights={weights} onWeightsChange={setWeights} />
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
              결과 보기 →
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

export default GuestInputPage;
