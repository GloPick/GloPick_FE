import React from 'react';
import { deleteUser } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

const WithdrawAccount = () => {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    if (!token) return;
    if (window.confirm('정말로 회원에서 탈퇴하시겠습니까? 모든 정보가 영구적으로 삭제됩니다.')) {
      try {
        await deleteUser(token);
        alert('회원 탈퇴가 완료되었습니다.');
        logout();
        navigate('/');
      } catch (error) {
        console.error('회원 탈퇴 실패:', error);
        alert('회원 탈퇴 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <section className="bg-red-50 border border-red-300 rounded-xl p-6">
      <h2 className="text-xl font-bold text-red-800">회원 탈퇴</h2>
      <p className="text-red-700 mt-2 text-sm">
        회원 탈퇴 시 계정 정보, 생성한 프로필, 시뮬레이션 결과 등 모든 데이터가 영구적으로 삭제되며
        복구할 수 없습니다.
      </p>

      <button
        className="mt-6 w-40 px-4 py-2 text-base font-semibold bg-red-600 text-white rounded-lg 
                   shadow-md hover:bg-red-700 transition duration-300 focus:ring-2 focus:ring-red-500"
        onClick={handleWithdraw}
      >
        회원 탈퇴
      </button>
    </section>
  );
};

export default WithdrawAccount;
