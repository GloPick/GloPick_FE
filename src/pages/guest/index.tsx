import { postGuestCountry } from '@/api/guest';
import { Button } from '@/components';
import Modal from '@/components/layout/Modal';
import ResumeForm from '@/components/resume/ResumeForm';
import Loading from '@/components/shared/Loading';
import { PostGuestCountryPayloadData, PostGuestCountryResponseData } from '@/types/guest';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Guest = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: PostGuestCountryPayloadData) => {
    setLoading(true);

    try {
      const response = await postGuestCountry({
        education: data.education,
        experience: data.experience,
        skills: data.skills,
        languages: data.languages,
        desiredSalary: data.desiredSalary,
        desiredJob: data.desiredJob,
        additionalNotes: data.additionalNotes,
      });

      if (response.code === 200 && response.data) {
        navigate('/guest/result', {
          state: {
            result: response.data.recommendedCountries.rankings as PostGuestCountryResponseData[],
          },
        });
      } else {
        alert(response.message || '추천 요청에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };

  return (
    <div className="h-[80vh] bg-white px-6 py-16 flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl text-center">
        <p className="text-lg text-gray-500 font-medium mb-4">비회원 체험 전용</p>
        <h1 className="text-5xl font-extrabold text-title mb-6">반갑습니다!</h1>

        <p className="text-xl text-muted mb-2">GloPick은 당신의 이력을 바탕으로</p>
        <p className="text-xl text-muted mb-6">
          <strong>가장 어울리는 국가와 직무</strong>를 AI가 추천해드려요.
        </p>

        <p className="text-md text-gray-500 mb-10">
          ※ 비회원 체험에선 국가 추천 기능만 제공합니다.
        </p>

        {!showForm && (
          <Button
            className="bg-primary text-white text-lg px-8 py-4 font-semibold rounded-xl"
            onClick={() => setShowForm(true)}
          >
            이력 입력하고 추천받기 →
          </Button>
        )}
      </div>

      {showForm && (
        <Modal
          onClose={() => {
            setShowForm(false);
          }}
        >
          <div className="max-h-[80vh] overflow-y-auto p-4">
            <ResumeForm onSubmit={handleSubmit} onClose={() => setShowForm(false)} />
          </div>
        </Modal>
      )}

      {loading && <Loading message="AI가 입력하신 이력을 기반으로 추천 국가를 생성 중입니다." />}
    </div>
  );
};

export default Guest;
