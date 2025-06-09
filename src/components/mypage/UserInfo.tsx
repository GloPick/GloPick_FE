import { getUserInfo } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

interface UserInfo {
  name: string;
  email: string;
  birth: string;
  phone: string;
}

const UserInfo = () => {
  const { token } = useAuthStore();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) return;

      try {
        const response = await getUserInfo(token);
        setUserInfo(response.data);
      } catch (error) {
        console.error('사용자 정보 조회 실패', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  if (!userInfo) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-primary mb-6">내 정보</h2>

      <div className="grid gap-4 text-gray-800">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">이름</span>
          <span className="text-base">{userInfo.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">이메일</span>
          <span className="text-base">{userInfo.email}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">생년월일</span>
          <span className="text-base">{formatDate(userInfo.birth)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">연락처</span>
          <span className="text-base">{userInfo.phone}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
          정보 수정
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-red text-white rounded-lg hover:opacity-90 transition">
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
