import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useModalStore } from '@/store/modalStore';

interface AccessRouteProps {
  access: 'private' | 'guest';
}

const AccessRoute = ({ access }: AccessRouteProps) => {
  const token = useAuthStore((state) => state.token);
  const openModal = useModalStore((state) => state.openModal);

  if (access === 'private') {
    if (!token) {
      openModal('login');
      return <Navigate to="/" replace />;
    }
  }

  if (access === 'guest') {
    if (token) {
      return <Navigate to="/main" replace />;
    }
  }

  return <Outlet />;
};

export default AccessRoute;
