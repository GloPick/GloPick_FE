import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useModalStore } from '@/store/modalStore';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { openModal } = useModalStore();
  const hasRun = useRef(false); // 실행 여부 추적 ref

  useEffect(() => {
    if (hasRun.current) return; // 두 번째 실행 방지
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const name = params.get('name') || '카카오 사용자';
    const email = params.get('email') || '카카오 이메일 없음';

    if (token && name) {
      login(token, { name, email });
      alert('카카오 로그인에 성공했습니다.');
      navigate('/');
    } else {
      alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
      navigate('/');
      openModal('login');
    }
  }, [login, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-gray-700">
      <p className="text-lg font-medium">카카오 로그인 처리 중입니다...</p>
      <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요.</p>
    </div>
  );
}
