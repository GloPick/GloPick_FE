import { deleteUser, getUserInfo, putUserInfo } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { PutUserInfoPayloadData } from '@/types/auth';
import { useEffect, useState } from 'react';
import Modal from '../layout/Modal';
import EditUserModal from './EditUserModal';
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  name: string;
  email: string;
  birth: string;
  phone: string;
}

const UserInfo = () => {
  const navigate = useNavigate();

  const { token, logout } = useAuthStore();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

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

  const handleUpdateUser = async (formData: PutUserInfoPayloadData) => {
    if (!token) return;

    try {
      const response = await putUserInfo(formData, token);
      setUserInfo(response.data);
      alert('정보가 수정되었습니다.');
    } catch (error) {
      console.error(error);
      alert('정보 수정에 실패했습니다.');
    }
  };

  const handleDeleteUser = async () => {
    const confirm = window.confirm('회원을 탈퇴하시겠습니까?');
    if (!confirm) return;

    if (!token) return;

    try {
      const response = await deleteUser(token);
      if (response.code === 200) {
        alert('회원이 탈퇴되었습니다.');
        logout();
        navigate('/');
      } else {
        alert(response.message || '회원 탈퇴에 실패했습니다.');
      }
    } catch (error) {
      alert('회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error(error);
    }
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
        <button
          className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          onClick={() => setIsEditOpen(true)}
        >
          정보 수정
        </button>
        <button
          className="px-4 py-2 text-sm font-medium bg-red text-white rounded-lg hover:opacity-90 transition"
          onClick={handleDeleteUser}
        >
          회원 탈퇴
        </button>
      </div>

      {isEditOpen && (
        <Modal onClose={() => setIsEditOpen(false)}>
          <EditUserModal
            initData={userInfo}
            onClose={() => setIsEditOpen(false)}
            onSubmit={handleUpdateUser}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserInfo;
