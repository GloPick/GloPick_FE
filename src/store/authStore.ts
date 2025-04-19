import { create } from 'zustand';

interface AuthState {
  token: string | null;
  email: string | null;
  name: string | null;
  setAuth: (data: { token: string; email: string; name: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  email: null,
  name: null,
  setAuth: ({ token, email, name }) => set({ token, email, name }),
  logout: () => set({ token: null }),
}));
