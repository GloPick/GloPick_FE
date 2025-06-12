import { Button } from '@/components/shared';
import { useModalStore } from '@/store/modalStore';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();

  const handleClick = (action: 'guest' | 'auth') => {
    if (action === 'guest') {
      navigate('/guest');
    } else if (action === 'auth') {
      openModal('signup');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-darkgray">
      <div className="w-full max-w-lg md:max-w-2xl  bg-background-basic px-6 py-12 text-center rounded-md">
        <h1 className="text-4xl md:text-5xl font-bold text-title mb-8">WELCOME</h1>

        <p className="text-base md:text-lg text-desc font-medium mb-12">
          <span className="text-lg font-semibold">GloPick</span>
          은 학력, 경력, 기술, 언어 능력을 기반으로
          <br />
          가장 잘 어울리는 국가와 직무를 AI가 분석해 추천해드립니다.
        </p>

        <div className="flex flex-row gap-4 justify-center">
          <Button className="bg-gray-2" onClick={() => handleClick('guest')}>
            비회원 체험하기
          </Button>
          <Button className="bg-gray-2" onClick={() => handleClick('auth')}>
            회원가입 하러가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
