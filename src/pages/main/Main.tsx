import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useModalStore } from '@/store/modalStore';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const { token } = useAuthStore();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const handleStartService = () => {
    if (!token) {
      alert('로그인 후 이용 가능합니다.');
      openModal('login');
      return;
    }
    navigate('/profile');
  };

  const handleGuestService = () => {
    if (token) {
      const confirmed = window.confirm(
        '이미 로그인되어 있습니다.\n개인 맞춤 추천을 바로 받아보시겠습니까?',
      );
      if (confirmed) {
        navigate('/profile');
      }
      return;
    }
    navigate('/guest');
  };

  return (
    <div className="w-full">
      <section
        className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/main__img.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 z-0" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white font-medium text-sm shadow-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              AI 기반 글로벌 인재 이동 최적화 플랫폼
            </div>

            <h1 className="font-bold text-white leading-snug">
              <span className="block text-3xl md:text-4xl font-bold text-white/90 mb-4">
                데이터 기반 정량 분석을 통한 개인 맞춤형 해외 이주 최적화 솔루션
              </span>
              <div
                className="text-7xl font-extrabold mb-4 flex items-center justify-center tracking-tight"
                style={{ textShadow: '3px 3px 10px rgba(0, 0, 0, 0.8)' }}
              >
                <span className="text-blue-300">Glo</span>
                <span className="text-white">Pick</span>
              </div>
            </h1>

            <div className="space-y-4">
              <p className="text-white text-xl md:text-2xl font-semibold max-w-4xl mx-auto leading-relaxed">
                사용자 정보와 선호 조건을 종합적으로 분석하여,
                <br /> 성공적인 정착 가능성이 가장 높은 해외 취업 및 이주 지역을 정밀하게
                제공합니다.
              </p>
              <p className="text-white/80 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                데이터에 근거한 최적의 이주 / 취업 전략을 수립해드립니다.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8">
              <button
                onClick={handleStartService}
                className="group text-white text-xl font-bold hover:text-blue-300 transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                추천받기
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>

              <button
                onClick={handleGuestService}
                className="group text-white/80 text-lg font-medium hover:text-white transition-all duration-300 flex items-center gap-2 cursor-pointer border-b border-transparent hover:border-white/60"
              >
                서비스 미리보기
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </div>

            <div className="pt-8">
              <p className="text-white/60 text-sm max-w-2xl mx-auto leading-relaxed">
                * 국가별 취업 가능성과 이주 조건은 실제 통계와 알고리즘 기반으로 분석됩니다.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Main;
