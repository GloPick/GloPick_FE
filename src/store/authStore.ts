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
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  hydrate: () => void;
  isTokenExpired: () => boolean;
}

interface JwtPayload {
  exp?: number;
  iat?: number;
  sub?: string;
}

let logoutTimer: ReturnType<typeof setTimeout> | null = null;

function clearLogoutTimer() {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
    logoutTimer = null;
  }
}

function setupLogoutTimer(token: string, set: (partial: Partial<AuthState>) => void) {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return;
    const expiresInMs = decoded.exp * 1000 - Date.now();
    if (expiresInMs <= 0) {
      set({ token: null, user: null });
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      alert('로그인 세션이 만료되었습니다.');
      return;
    }
    clearLogoutTimer();
    logoutTimer = setTimeout(() => {
      set({ token: null, user: null });
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      alert('로그인 세션이 만료되었습니다.');
    }, expiresInMs);
  } catch (error) {
    console.error('유효하지 않은 토큰:', error);
    set({ token: null, user: null, isAuthenticated: false });
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    clearLogoutTimer();
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  hasHydrated: false,
  isAuthenticated: false,

  login: (token, user) => {
    set({ token, user, isAuthenticated: true });
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    setupLogoutTimer(token, set);
  },

  logout: () => {
    set({ token: null, user: null, isAuthenticated: false });
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    clearLogoutTimer();
  },

  hydrate: () => {
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');
    if (token && user) {
      set({ token, user: JSON.parse(user), hasHydrated: true, isAuthenticated: true });
      setupLogoutTimer(token, set);
    } else {
      set({ hasHydrated: true, isAuthenticated: false });
    }
  },

  isTokenExpired: () => {
    const token = get().token;
    if (!token) return true;
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;
      return decoded.exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  },
}));
