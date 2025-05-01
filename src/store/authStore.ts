import { create } from 'zustand';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  login: (token, user) => {
    set({ token, user });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  logout: () => {
    set({ token: null, user: null });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
}));
