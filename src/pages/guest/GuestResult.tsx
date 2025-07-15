import { Button } from '@/components/shared';
import { useModalStore } from '@/store/modalStore';
import { PostGuestCountryResponseData } from '@/types/guest';
import { useLocation, useNavigate } from 'react-router-dom';

interface GuestResultProps {
  result?: PostGuestCountryResponseData[];
}

const GuestResult = ({ result: propResult }: GuestResultProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const result =
    propResult || (location.state?.result as PostGuestCountryResponseData[] | undefined);

  if (!result || result.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-100 text-center px-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">추천 결과가 없습니다.</h2>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => navigate('/main?guest=true')}
          >
            다시 체험하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-title mb-8">
          AI가 추천한 국가와 직무를 확인해보세요!
        </h2>

        <ul className="space-y-6">
          {result.map((item, idx) => (
            <li key={idx} className="p-5 border-l-4 border-primary bg-gray-50 rounded-xl text-left">
              <div className="text-lg font-semibold text-primary">
                {idx + 1}위: {item.country} - {item.job}
              </div>
              <p className="text-sm text-gray-700 mt-1">{item.reason}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center space-y-6">
          <p className="text-base text-gray-700 font-medium">
            회원가입 후 <strong>도시 추천</strong>부터 <strong>이주 시뮬레이션</strong>까지 더
            자세한 정보를 받아볼 수 있어요.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => openModal('signup')}>회원가입</Button>
            <Button onClick={() => openModal('login')} variant="white">
              로그인
            </Button>
          </div>

          <button
            onClick={() => navigate('/guest', { state: { openForm: true } })}
            className="text-sm text-gray-500 underline hover:text-gray-700"
          >
            다른 이력으로 다시 체험하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestResult;
