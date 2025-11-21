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
      const [accountRes, simulationRes] = await Promise.all([
        getUserInfo(token),
        getSimulations(token),
      ]);
      setUserInfo(accountRes.data);
      setSimulations(simulationRes.data);
    } catch (error) {
      console.error('데이터 로딩 실패', error);
      alert('데이터를 불러오는 데 실패했습니다.');
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
    return <div>데이터를 불러올 수 없습니다.</div>;
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
