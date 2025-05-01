import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Menu, User } from 'lucide-react';
import { useModalStore } from '@/store/modalStore';
import { useAuthStore } from '@/store/authStore';

const Header = () => {
  const navigate = useNavigate();
  const { logout, token, user } = useAuthStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useModalStore();

  useEffect(() => {
    setIsLoggedIn(!!token); // token이 있으면 로그인 상태
  }, [token]);

  const navItems = [
    { name: 'FAQ', to: '/faq' },
    ...(isLoggedIn ? [{ name: '커뮤니티', to: '/community' }] : []),
  ];

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
    navigate('/main');
  };

  return (
    <header className="w-full bg-transparent shadow-md px-4 py-3 flex justify-between items-center">
      {/* 로고 */}
      <Link to="/main" className="text-xl font-bold text-primary">
        GloPick
      </Link>

      {/* 데스크탑 메뉴 */}
      <nav className="hidden md:flex gap-6 items-center text-sm text-gray-700">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} className="hover:text-secondary">
            {item.name}
          </Link>
        ))}
        {isLoggedIn ? (
          <>
            <span className="text-gray-800">{user?.name}님</span>
            <button onClick={handleLogout} className="hover:text-secondary">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button onClick={() => openModal('login')} className="hover:text-secondary">
              <User size={18} />
            </button>
          </>
        )}
      </nav>

      {/* 모바일 햄버거 버튼 */}
      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="메뉴 열기"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="absolute top-12 left-0 w-full bg-white border-t border-gray-200 md:hidden shadow-md z-10">
          <nav className="flex flex-col gap-3 p-4 text-sm text-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-secondary"
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout} className="text-left hover:text-secondary">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    openModal('login');
                    setIsMenuOpen(false);
                  }}
                  className="text-left hover:text-secondary"
                >
                  로그인
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
