import { create } from 'zustand';

interface ModalState {
  modalType: 'login' | 'signup' | 'editUserInfo' | 'scoreDetail' | null;
  isOpen: boolean;
  openModal: (type: ModalState['modalType']) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  isOpen: false,
  openModal: (type) => set({ modalType: type, isOpen: true }),
  closeModal: () => set({ modalType: null, isOpen: false }),
}));
