import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  hasHydrated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  hydrate: () => void;
}

interface JwtPayload {
  exp: number;
}

let logoutTimer: ReturnType<typeof setTimeout> | null = null;

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  hasHydrated: false,

  login: (token, user) => {
    set({ token, user });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // 자동 로그아웃 타이머 설정
    const decoded = jwtDecode<JwtPayload>(token);
    const expiresInMs = decoded.exp * 1000 - Date.now();

    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      set({ token: null, user: null });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('로그인 세션이 만료되었습니다.');
    }, expiresInMs);
  },

  logout: () => {
    set({ token: null, user: null });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (logoutTimer) clearTimeout(logoutTimer);
  },

  hydrate: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      set({ token, user: JSON.parse(user), hasHydrated: true });

      // 로그인 유지 중에도 만료 타이머 설정
      const decoded = jwtDecode<JwtPayload>(token);
      const expiresInMs = decoded.exp * 1000 - Date.now();

      if (logoutTimer) clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        set({ token: null, user: null });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('로그인 세션이 만료되었습니다.');
      }, expiresInMs);
    } else {
      set({ hasHydrated: true });
    }
  },
}));
