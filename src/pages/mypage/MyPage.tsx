import { getUserInfo } from '@/api/auth';
import UserInfoSection from '@/components/mypage/UserInfoSection';
import Loading from '@/components/shared/Loading';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { GetUserInfoResponseData } from '@/types/auth';
import { GetSimulationResponseData } from '@/types/profile';
import { getSimulations } from '@/api/profile';
import SimulationListSection from '../../components/mypage/SimulationListSection';
import WithdrawAccount from '@/components/mypage/WithdrawAccount';

const MyPage = () => {
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState<GetUserInfoResponseData | null>(null);
  const [simulations, setSimulations] = useState<GetSimulationResponseData[]>([]);

  // 데이터 로딩
  const fetchData = async () => {
    if (!token) return;
    try {
      setLoading(true);

      const accountRes = await getUserInfo(token);
      setUserInfo(accountRes.data);

      try {
        const simulationRes = await getSimulations(token);
        setSimulations(simulationRes.data || []); // null/undefined 처리
      } catch (simulationError) {
        console.warn('시뮬레이션 데이터 로딩 실패:', simulationError);
        setSimulations([]); // 빈 배열로 설정
      }
    } catch (error) {
      console.error('유저 정보 로딩 실패', error);
      alert('사용자 정보를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  if (loading) {
    return <Loading message="내 정보를 불러오는 중..." />;
  }

  if (!userInfo) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-lg text-gray-600">사용자 정보를 불러올 수 없습니다.</p>
        <button
          onClick={fetchData}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 pt-24 space-y-12">
      {/* 페이지 헤더 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">{userInfo.name}님, 환영합니다</h1>
        <p className="text-lg text-gray-600 mt-2">내 정보와 추천 결과를 관리하세요.</p>
      </div>

      {/* 계정 정보  */}
      <UserInfoSection userInfo={userInfo} onUpdate={fetchData} />

      {/* 저장된 시뮬레이션 */}
      <SimulationListSection simulations={simulations} />

      {/* 회원 탈퇴 */}
      <WithdrawAccount />
    </div>
  );
};

export default MyPage;
