import Router from './router/Router';
import AuthModal from './components/auth/AuthModal';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';

function App() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    hydrate(); // 앱 로드 시 세션 복원
  }, [hydrate]);

  if (!hasHydrated) {
    return <div className="text-gray-500">세션 복원 중...</div>;
  }
  return (
    <>
      <Router>
        <AuthModal />
      </Router>
    </>
  );
}

export default App;
