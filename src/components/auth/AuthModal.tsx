import { useEffect, useRef } from 'react';
import { useModalStore } from '@/store/modalStore';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuthStore } from '@/store/authStore';
import { KakaoIcon } from '@/assets/icon/KakaoIcon';
import { SocialDivider } from './SocialDivider';

export default function AuthModal() {
  const { modalType, isOpen, openModal, closeModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const { token } = useAuthStore();

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeModal]);

  // 모달 생성 시 페이지 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleClickAuth = (type: 'login' | 'signup') => {
    if (token) {
      alert('이미 로그인 상태입니다.');
      return;
    }
    openModal(type);
  };

  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  if (!isOpen || (modalType !== 'login' && modalType !== 'signup')) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* 이미지 */}
        <div className="hidden md:flex bg-white p-6 items-center justify-center">
          <img src="/assets/auth__svg.svg" alt="login visual" className="w-[350px]" />
        </div>

        {/* 폼 영역 */}
        <div className="flex-1 p-6 relative">
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 text-gray-400 hover:text-black"
          >
            <X />
          </button>

          {modalType === 'login' ? (
            <>
              <LoginForm />

              <SocialDivider />
              <button
                type="button"
                onClick={handleKakaoLogin}
                className="w-full py-3 flex items-center justify-center bg-[#FEE500] text-black text-sm font-semibold rounded-md hover:bg-opacity-90 transition"
              >
                <KakaoIcon />
                <span className="ml-2">카카오 로그인</span>
              </button>

              <div className="text-sm mt-4 text-center">
                계정이 없으신가요?{' '}
                <span
                  className="text-primary font-semibold cursor-pointer"
                  onClick={() => handleClickAuth('signup')}
                >
                  회원가입
                </span>
              </div>
            </>
          ) : (
            <>
              <SignupForm />

              <SocialDivider />
              <button
                type="button"
                onClick={handleKakaoLogin}
                className="w-full py-3 flex items-center justify-center bg-[#FEE500] text-black text-sm font-semibold rounded-md hover:bg-opacity-90 transition"
              >
                <KakaoIcon />
                <span className="ml-2">카카오 로그인</span>
              </button>
              <div className="text-sm mt-4 text-center">
                이미 계정이 있으신가요?{' '}
                <span
                  className="text-primary font-semibold cursor-pointer"
                  onClick={() => handleClickAuth('login')}
                >
                  로그인
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
