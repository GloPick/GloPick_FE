import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Globe, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components';
import ResumeForm from '@/components/resume/ResumeForm';
import ResumeCard from '@/components/resume/ResumeCard';
import ResumeEmptyModal from '@/components/resume/ResumeEmptyModal';
import Modal from '@/components/layout/Modal';
import PopularCountryChart from './PopularCountryChart';
import { ResumeData } from '@/types/resume';

const Main = () => {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showResumeList, setShowResumeList] = useState(false);

  const handleAddResume = (data: ResumeData) => {
    setResumes((prev) => [...prev, data]);
    setShowForm(false);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative w-full min-h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/main__img.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
            나의 이력으로 글로벌 커리어 시작하기
          </h1>
          <p className="text-white text-base md:text-xl font-semibold mb-10 max-w-2xl mx-auto drop-shadow">
            GloPick은 학력, 경력, 기술, 언어 능력을 기반으로
            <br />
            나에게 딱 맞는 국가와 직무를 추천해주는 AI 기반 이주 서비스입니다.
          </p>
        </div>
      </section>

      {/* 서비스 소개 카드 */}
      <section className="py-20 px-6 bg-background">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-title mb-12">
          GloPick에서 제공하는 서비스
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: <TrendingUp size={40} className="text-primary mx-auto mb-4 animate-pulse" />,
              title: '취업 성공률 분석',
              description: '이력 기반으로 취업 확률을 분석해 가장 유망한 국가와 직무를 추천합니다.',
            },
            {
              icon: <BarChart3 size={40} className="text-secondary mx-auto mb-4 animate-bounce" />,
              title: '이주 시뮬레이션',
              description: '예상 예산과 일정에 따라 이주 시뮬레이션 결과를 비교할 수 있어요.',
            },
            {
              icon: <Globe size={40} className="text-accent mx-auto mb-4 animate-ping" />,
              title: '국가별 추천 정보',
              description:
                '비자, 물가, 문화 등 국가별 상세 정보를 확인하고 맞춤 추천을 받아보세요.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-transform"
            >
              {item.icon}
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 이력 확인 및 추가 섹션 */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-title mb-6">나의 이력 관리</h2>
        <p className="text-base text-muted mb-8">
          입력한 이력을 불러오거나, 새로운 이력을 추가해 맞춤 추천을 받아보세요.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => setShowResumeList(true)}>이력 불러오기</Button>
          <Button variant="secondary" onClick={() => setShowForm(true)}>
            이력 추가하기
          </Button>
        </div>
      </section>

      {/* 인기 국가 순위 차트 */}
      <section className="py-20 px-6 bg-background">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-title mb-12">
          많은 사람들이 주목한 이주 국가 순위
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-4xl mx-auto">
            <PopularCountryChart />
          </div>
        </motion.div>
      </section>

      {/* 모달 - 이력 추가 */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <div className="max-h-[80vh] overflow-y-auto p-4">
            <ResumeForm onSubmit={handleAddResume} onClose={() => setShowForm(false)} />
          </div>
        </Modal>
      )}

      {/* 모달 - 이력 불러오기 */}
      {showResumeList && (
        <Modal onClose={() => setShowResumeList(false)}>
          {resumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {resumes.map((r, i) => (
                <ResumeCard key={i} data={r} />
              ))}
            </div>
          ) : (
            <ResumeEmptyModal onClose={() => setShowResumeList(false)} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Main;
