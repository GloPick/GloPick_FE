import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { useModalStore } from '@/store/modalStore';
import { useAuthStore } from '@/store/authStore';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, token } = useAuthStore();
  const { openModal } = useModalStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 현재 페이지가 메인 페이지인지 확인
  const isMainPage = location.pathname === '/';

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      // 메인 페이지에서만 스크롤 감지
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // 메인 페이지가 아니거나 메인 페이지이지만 50px 이상 스크롤되었을 때
  const isOpaque = !isMainPage || isScrolled;

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 px-4 py-3
    transition-all duration-300 ease-in-out
    ${isOpaque ? 'bg-white shadow-md' : 'bg-transparent'}
  `;
  const textColor = isOpaque ? 'text-gray-700' : 'text-white';
  const logoColor = isOpaque ? 'text-gray-800' : 'text-white';
  const logoSubColor = isOpaque ? 'text-blue-600' : 'text-blue-300';
  const buttonStyle = isOpaque
    ? 'bg-primary text-white hover:opacity-90'
    : 'bg-white text-blue-700 hover:bg-white/90';

  const navItems = [{ name: token ? '마이페이지' : '체험하기', to: token ? '/mypage' : '/guest' }];

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* 로고 */}
        <Link
          to="/"
          className={`text-3xl font-extrabold tracking-tight transition-colors ${
            !isOpaque ? 'text-shadow-md' : ''
          }`}
        >
          <span className={logoSubColor}>Glo</span>
          <span className={logoColor}>Pick</span>
        </Link>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm font-semibold ${textColor} hover:text-blue-700 transition-colors`}
            >
              {item.name}
            </Link>
          ))}

          {token ? (
            <button
              onClick={handleLogout}
              className={`text-sm font-semibold ${textColor} hover:text-blue-600 transition-colors`}
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={() => openModal('login')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${buttonStyle}`}
            >
              로그인 / 회원가입
            </button>
          )}
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button
          className={`md:hidden ${textColor}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="메뉴 열기"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-white border-t border-gray-200 md:hidden shadow-lg z-10 animate-fade-in-down">
          <nav className="flex flex-col gap-4 p-4 text-gray-700">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="font-semibold hover:text-blue-600">
                {item.name}
              </Link>
            ))}
            <hr />
            {token ? (
              <button
                onClick={handleLogout}
                className="text-left font-semibold hover:text-blue-700"
              >
                로그아웃
              </button>
            ) : (
              <button onClick={() => openModal('login')} className="text-left font-semibold">
                로그인 / 회원가입
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
