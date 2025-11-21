import { InputFormState, QualityOfLifeWeights, Weights } from '@/types/recommendation';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProfileState {
  data: InputFormState;
  qol: QualityOfLifeWeights;
  weights: Weights;
  step: number;

  setData: (field: keyof InputFormState, value: string) => void;
  setQol: (qol: QualityOfLifeWeights) => void;
  setWeights: (weights: Weights) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      data: { jobField: '', language: '' },
      qol: { income: 20, jobs: 20, health: 20, safety: 20, lifeSatisfaction: 20 },
      weights: { qolWeight: 40, jobWeight: 30, languageWeight: 30 },
      step: 1,

      setData: (field, value) =>
        set((state) => ({
          data: { ...state.data, [field]: value },
        })),
      setQol: (qol) => set({ qol }),
      setWeights: (weights) => set({ weights }),
      setStep: (step: number) => set({ step }),
      reset: () =>
        set({
          data: { jobField: '', language: '' },
          qol: { income: 20, jobs: 20, health: 20, safety: 20, lifeSatisfaction: 20 },
          weights: { qolWeight: 40, jobWeight: 30, languageWeight: 30 },
          step: 1,
        }),
    }),
    {
      name: 'profile-storage',
    },
  ),
);
