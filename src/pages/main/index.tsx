import { useState } from 'react';
import { TrendingUp, Globe, BarChart3, FolderOpen, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components';
import ResumeForm from '@/components/resume/ResumeForm';
import ResumeCard from '@/components/resume/ResumeCard';
import ResumeEmptyModal from '@/components/resume/ResumeEmptyModal';
import Modal from '@/components/layout/Modal';
import PopularChart from './PopularChart';
import { GetProfileResponseData, PostProfilePayloadData } from '@/types/resume';
import { deleteResume, editResume, getResume, postResume } from '@/api/resume';
import { useAuthStore } from '@/store/authStore';
import { useModalStore } from '@/store/modalStore';
import { useNavigate } from 'react-router-dom';
import { postCountryRecommend } from '@/api/simulation';
import Loading from '@/components/shared/Loading';

const Main = () => {
  const { token } = useAuthStore(); // 로그인 여부 확인
  const { openModal } = useModalStore(); // 로그인 모달 제어
  const navigate = useNavigate();

  const [resumes, setResumes] = useState<GetProfileResponseData[]>([]);
  const [editingResume, setEditingResume] = useState<GetProfileResponseData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showResumeList, setShowResumeList] = useState(false);
  const [showEmptyModal, setShowEmptyModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // 이력 추가하기 버튼 클릭
  const handleClickAddResume = () => {
    if (!token) {
      alert('로그인 후 이용 가능합니다.');
      openModal('login');
      return;
    }
    setShowForm(true); // 로그인된 경우에만 폼 열기
  };

  // 이력 등록 및 수정 버튼 클릭
  const handleSubmitResume = async (data: PostProfilePayloadData) => {
    //   const isGuest = !token || searchParams.get('guest') === 'true';
    //   setLoading(true);

    //   try {
    //     if (isGuest) {
    //       // 비회원 추천 요청
    //       const res = await postGuestCountry({
    //         education: data.education,
    //         experience: data.experience,
    //         skills: data.skills,
    //         languages: data.languages,
    //         desiredSalary: data.desiredSalary,
    //         desiredJob: data.desiredJob,
    //         additionalNotes: data.additionalNotes,
    //       });

    //       if (res.code === 200) {
    //         navigate('/guest', {
    //           state: { result: res.data.recommendedCountries.rankings },
    //         });
    //       } else {
    //         alert(res.message || '추천 요청에 실패했습니다.');
    //       }
    //     } else {
    //       // 회원: 수정 or 등록
    //       if (editingResume) {
    //         const res = await editResume(editingResume.profileId, data, token);
    //         if (res.code === 200 && res.data) {
    //           setResumes((prev) =>
    //             prev.map((item) =>
    //               item.profileId === editingResume.profileId ? { ...item, ...res.data } : item,
    //             ),
    //           );
    //           alert('이력이 수정되었습니다.');
    //         } else {
    //           alert(res.message);
    //         }
    //       } else {
    //         const res = await postResume(data, token);
    //         if (res.code === 201) {
    //           alert('이력이 등록되었습니다.');
    //           const updated = await getResume(token);
    //           if (updated.code === 200 && updated.data) {
    //             setResumes(updated.data);
    //           }
    //         } else {
    //           alert(res.message);
    //         }
    //       }
    //     }
    //   } catch (err) {
    //     console.error(err);
    //     alert('처리 중 오류가 발생했습니다.');
    //   } finally {
    //     setLoading(false);
    //     setShowForm(false);
    //     setEditingResume(null);
    //   }
    // };
    if (!token) return;

    try {
      if (editingResume) {
        // 수정
        const res = await editResume(editingResume.profileId, data, token);
        if (res.code === 200 && res.data) {
          setResumes((prev) =>
            prev.map((item) =>
              item.profileId === editingResume.profileId ? { ...item, ...res.data } : item,
            ),
          );
          alert('이력이 수정되었습니다.');
        } else {
          alert(res.message);
        }
      } else {
        // 등록
        const res = await postResume(data, token);
        if (res.code === 201) {
          alert('이력이 등록되었습니다.');

          const updated = await getResume(token);
          if (updated.code === 200 && updated.data) {
            setResumes(updated.data);
          }
        } else {
          alert(res.message);
        }
      }
    } catch (err) {
      console.error(err);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setShowForm(false);
      setEditingResume(null);
    }
  };

  // 이력 불러오기 버튼 클릭
  const handleLoadResume = async () => {
    if (!token) {
      alert('로그인 후 이용 가능합니다.');
      openModal('login');
      return;
    }

    try {
      const res = await getResume(token);
      if (res.code === 200 && res.data.length > 0) {
        setResumes(res.data);
        setShowResumeList(true);
      } else {
        setShowEmptyModal(true);
      }
    } catch (err) {
      alert('이력 조회 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  const handleGenerateRecommendation = async (profileId: string) => {
    if (!token) {
      alert('로그인 후 이용해주세요');
      openModal('login');
      return;
    }

    try {
      setLoading(true);
      const response = await postCountryRecommend(profileId, token);
      if (response.code === 200) {
        const recommendationId = response.data.recommendationId;
        navigate(`/recommend/${recommendationId}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const resData = error?.response?.data;

      // 이미 추천받은 이력일 때
      if (
        error?.response?.status === 400 &&
        resData?.message === '이미 추천받은 이력입니다.' &&
        resData?.data?.recommendationId
      ) {
        const existingId = resData.data.recommendationId;
        alert('이미 추천받은 이력입니다. 해당 페이지로 이동합니다.');
        navigate(`/recommend/${existingId}`);
      } else {
        alert('추천 생성 중 오류가 발생했습니다.');
        console.error(error);
      }
    }
    setLoading(false);
  };

  // 이력 삭제 버튼 클릭
  const handleDeleteResume = async (profileId: string) => {
    const confirm = window.confirm('이력을 삭제하시겠습니까?');
    if (!confirm) return;

    if (!token) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }

    try {
      const res = await deleteResume(profileId, token);
      if (res.code === 200) {
        alert('이력이 삭제되었습니다.');
        setResumes((prev) => prev.filter((resume) => resume.profileId !== profileId));
      } else {
        alert(res.message || '이력 삭제에 실패했습니다.');
      }
    } catch (err) {
      alert('이력 삭제 중 오류가 발생했습니다.');
      console.error(err);
    }
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
      <section className="bg-white w-full py-20 px-6 md:px-12 rounded-xl max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-title mb-6">
          나의 이력 관리
        </h2>
        <p className="text-center text-muted text-base md:text-lg mb-10">
          입력한 이력을 불러오거나, 새로운 이력을 추가해 맞춤 추천을 받아보세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 이력 불러오기 카드 */}
          <div className="bg-background-gray rounded-xl p-6 flex flex-col justify-between shadow hover:shadow-lg transition">
            <div>
              <h3 className="text-xl font-semibold mb-2">이력 불러오기</h3>
              <p className="text-sm text-gray-600 mb-4">
                저장된 이력이 있다면 지금 확인하고 이어서 진행할 수 있어요.
              </p>
            </div>
            <Button
              variant="primary"
              className="flex items-center justify-center gap-2"
              onClick={handleLoadResume}
            >
              <FolderOpen className="mr-2" size={18} />
              이력 불러오기
            </Button>
          </div>

          {/* 이력 추가하기 카드 */}
          <div className="bg-background-gray rounded-xl p-6 flex flex-col justify-between shadow hover:shadow-lg transition">
            <div>
              <h3 className="text-xl font-semibold mb-2">이력 추가하기</h3>
              <p className="text-sm text-gray-600 mb-4">
                새롭게 이력을 입력해 맞춤 국가와 직무 추천을 받아보세요.
              </p>
            </div>
            <Button
              variant="secondary"
              className="flex items-center justify-center gap-2"
              onClick={handleClickAddResume}
            >
              <PlusCircle className="mr-2" size={18} />
              이력 추가하기
            </Button>
          </div>
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
            <PopularChart />
          </div>
        </motion.div>
      </section>

      {/* 모달 - 이력 추가 */}
      {showForm && (
        <Modal
          onClose={() => {
            setShowForm(false);
            setEditingResume(null);
          }}
        >
          <div className="max-h-[80vh] overflow-y-auto p-4">
            <ResumeForm
              initialData={editingResume ?? undefined}
              onSubmit={handleSubmitResume}
              onClose={() => setShowForm(false)}
            />
          </div>
        </Modal>
      )}

      {/* 모달 - 이력 불러오기 */}
      {showResumeList && (
        <Modal onClose={() => setShowResumeList(false)}>
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">저장된 이력</h2>
            <div className="grid gap-4">
              {resumes.map((resume) => (
                <ResumeCard
                  key={resume.profileId}
                  data={resume}
                  onEdit={(resume: GetProfileResponseData) => {
                    setEditingResume(resume);
                    setShowForm(true);
                  }}
                  onDelete={handleDeleteResume}
                  onRecommend={() => handleGenerateRecommendation(resume.profileId)}
                />
              ))}
            </div>
          </div>
        </Modal>
      )}

      {showEmptyModal && (
        <Modal onClose={() => setShowEmptyModal(false)}>
          <ResumeEmptyModal
            onClose={() => setShowEmptyModal(false)}
            onAddClick={() => {
              setShowEmptyModal(false);
              setShowForm(true);
            }}
          />
        </Modal>
      )}

      {loading && <Loading message="이력 기반으로 추천 국가 생성 중" />}
    </div>
  );
};

export default Main;
