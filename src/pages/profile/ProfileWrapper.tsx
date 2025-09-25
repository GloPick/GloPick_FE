import useLeaveWarning from '@/hooks/useLeavingWarning';
import { ProfileFormData } from '@/types/profile';
import { useState } from 'react';
import {
  User,
  CheckCircle,
  ArrowLeft,
  Shield,
  Globe,
  Building,
  CreditCard,
  BarChart3,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProfileWrapper = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    // 1단계: 기본 정보
    language: '',
    expectedSalary: 0,
    jobField: { code: '', nameKo: '', nameEn: '' },
    priorities: {
      first: 'language',
      second: 'salary',
      third: 'job',
    },
    // 2단계: 추천받은 국가 정보
    // recommendedCountries: [],
    // selectedCountry: null,
    // 3단계: 카테고리 선택
    // selectedCategory: null,
    // 4단계: 추천받은 도시 정보
    // recommendedCities: [],
    // selectedCity: null,
    // 5단계: 추가 정보
    // additionalInfo: {
    //   settlementBudget: 0,
    //   hasVisa: false,
    //   departureAirport: '',
    // },
  });
  const [formChanged, setFormChanged] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  useLeaveWarning(formChanged);

  // 6단계 플로우
  const steps = [
    {
      number: 1,
      title: '기본 정보',
      icon: User,
      description: '언어, 연봉, 직무, 우선순위',
    },
    {
      number: 2,
      title: '국가 추천',
      icon: Globe,
      description: '맞춤 국가 선택',
    },
    {
      number: 3,
      title: '카테고리 선택',
      icon: CheckCircle,
      description: '치안, 자연환경, 취업, 인프라',
    },
    {
      number: 4,
      title: '도시 추천',
      icon: Building,
      description: '해당 국가 내 맞춤 도시 선택',
    },
    {
      number: 5,
      title: '추가 정보',
      icon: CreditCard,
      description: '정착비용, 비자, 출발공항',
    },
    {
      number: 6,
      title: '시뮬레이션',
      icon: BarChart3,
      description: '최종 분석 결과',
    },
  ];

  // 단계별 설명 텍스트
  const getStepDescription = (step: number) => {
    switch (step) {
      case 1:
        return '언어 능력, 희망 연봉, 희망 직무 분야와 중요하게 생각하는 우선순위를 입력해주세요.';
      case 2:
        return '입력하신 정보를 바탕으로 추천된 5개 국가 중 관심있는 국가를 선택해주세요.';
      case 3:
        return '선택하신 국가에서 가장 중요하게 생각하는 요소를 선택해주세요.';
      case 4:
        return '선택하신 카테고리를 바탕으로 추천된 3개 도시 중 원하는 도시를 선택해주세요.';
      case 5:
        return '정확한 시뮬레이션을 위해 정착 예산, 비자 보유 여부, 출발 공항 정보를 입력해주세요.';
      case 6:
        return '모든 정보를 종합하여 상세한 이주 시뮬레이션 결과를 제공해드립니다.';
      default:
        return '';
    }
  };

  // 이전 단계로 이동
  const handlePrevStep = () => {
    if (currentStep === 1) {
      navigate('/main');
    }
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // 다음 단계로 이동 (API 호출 포함)
  const handleNextStep = async () => {
    try {
      // 1단계: 기본정보 + 우선순위 API 호출
      if (currentStep === 1) {
        // TODO: 기본정보 및 우선순위 API 호출
        const response = await postUserProfile({
          language: formData.language,
          expectedSalary: formData.expectedSalary,
          jobField: formData.jobField,
          priorities: formData.priorities,
        });
        //   // 국가 추천 결과 저장
        //   setFormData((prev) => ({
        //     ...prev,
        //     recommendedCountries: response.countries,
        //   }));
      }

      // // 3단계: 카테고리 선택 후 도시 추천 API 호출
      // if (currentStep === 3) {
      //   // TODO: 카테고리 기반 도시 추천 API 호출
      //   const response = await getCityRecommendations({
      //     countryId: formData.selectedCountry?.id,
      //     category: formData.selectedCategory,
      //   });
      //   setFormData((prev) => ({
      //     ...prev,
      //     recommendedCities: response.cities,
      //   }));
      // }

      // // 5단계: 최종 시뮬레이션 API 호출
      // if (currentStep === 5) {
      //   // TODO: 최종 시뮬레이션 API 호출
      //   const response = await getSimulationResult({
      //     ...formData,
      //     additionalInfo: formData.additionalInfo,
      //   });
      //   // 시뮬레이션 결과 페이지로 이동하거나 결과 저장
      // }

      // setCurrentStep((prev) => Math.min(6, prev + 1));
    } catch (error) {
      console.error('API 호출 오류:', error);
      alert('처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 헤더 영역 */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handlePrevStep}
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">개인 맞춤 이주 시뮬레이션</h1>
                <p className="text-sm text-gray-500 mt-1">6단계로 완성하는 정밀한 이주 분석</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Shield size={16} />
              <span>개인정보 안전 보호</span>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* 프로그레스 바 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 overflow-x-auto pb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <motion.div
                  key={step.number}
                  className="flex flex-col items-center relative min-w-[120px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* 연결선 */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-6 left-16 w-16 h-0.5 -z-10 transition-colors duration-500 ${
                        isCompleted ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    />
                  )}

                  {/* 스텝 아이콘 */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  {/* 스텝 정보 */}
                  <div className="text-center">
                    <h3
                      className={`font-semibold text-xs transition-colors ${
                        isActive
                          ? 'text-blue-600'
                          : isCompleted
                            ? 'text-green-600'
                            : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-tight">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 현재 단계 안내 */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              단계 {currentStep} / {steps.length}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {steps[currentStep - 1]?.title}
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {getStepDescription(currentStep)}
            </p>
          </div>

          {/* 입력 폼 영역 */}
          <div className="bg-gray-50 rounded-xl p-8 min-h-[500px]">
            {/* Step 1: 기본 정보 입력 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  기본 정보 및 우선순위 입력
                </h3>
                {/* TODO: 기본정보 입력 컴포넌트 */}
                <div className="text-center py-16">
                  <User size={32} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">기본정보 입력 폼 컴포넌트</p>
                </div>
              </div>
            )}

            {/* Step 2: 국가 선택 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">추천 국가 선택</h3>
                {/* TODO: 국가 선택 컴포넌트 */}
                <div className="text-center py-16">
                  <Globe size={32} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">국가 선택 컴포넌트</p>
                </div>
              </div>
            )}

            {/* Step 3: 카테고리 선택 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">중요 카테고리 선택</h3>
                {/* TODO: 카테고리 선택 컴포넌트 */}
                <div className="text-center py-16">
                  <CheckCircle size={32} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">카테고리 선택 컴포넌트</p>
                </div>
              </div>
            )}

            {/* Step 4: 도시 선택 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">추천 도시 선택</h3>
                {/* TODO: 도시 선택 컴포넌트 */}
                <div className="text-center py-16">
                  <Building size={32} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">도시 선택 컴포넌트</p>
                </div>
              </div>
            )}

            {/* Step 5: 추가 정보 */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">추가 정보 입력</h3>
                {/* TODO: 추가정보 입력 컴포넌트 */}
                <div className="text-center py-16">
                  <CreditCard size={32} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">추가정보 입력 컴포넌트</p>
                </div>
              </div>
            )}

            {/* Step 6: 시뮬레이션 결과 */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">시뮬레이션 결과</h3>
                {/* TODO: 시뮬레이션 결과 컴포넌트 */}
                <div className="text-center py-16">
                  <BarChart3 size={32} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">시뮬레이션 결과 컴포넌트</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* 하단 안내 */}
        <motion.div
          className="bg-amber-50 border border-amber-200 rounded-xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-amber-500 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div>
              <h4 className="font-medium text-amber-800 mb-1">진행 안내</h4>
              <p className="text-sm text-amber-700">
                {currentStep <= 2 && '정확한 분석을 위해 실제 정보를 입력해주세요.'}
                {currentStep === 3 &&
                  '선택하신 국가에 대한 상세 분석을 위해 중요 카테고리를 선택해주세요.'}
                {currentStep >= 4 && '최종 시뮬레이션을 위해 모든 정보를 정확히 입력해주세요.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 네비게이션 버튼 */}
        <motion.div
          className="flex justify-between items-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            disabled={currentStep === 1}
            className="px-6 py-3 text-gray-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          >
            <ArrowLeft size={16} />
            이전 단계
          </button>

          <div className="flex gap-3">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              임시 저장
            </button>
            <button
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
              onClick={handleNextStep}
            >
              {currentStep === 6
                ? '결과 확인'
                : currentStep === 5
                  ? '시뮬레이션 시작'
                  : '다음 단계'}
              {currentStep < 6 && <span>→</span>}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileWrapper;
