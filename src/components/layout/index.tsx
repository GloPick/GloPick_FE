import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

const Layout = () => {
  const hydrate = useAuthStore((state) => state.hydrate);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // 복구되기 전엔 렌더링 X
  if (!hasHydrated) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
