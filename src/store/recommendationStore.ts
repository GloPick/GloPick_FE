import { CountryRecommendation } from '@/types/profile';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecommendationState {
  profileId: string | null;
  countries: CountryRecommendation[] | null;
  selectedCountry?: CountryRecommendation | null;
  setProfileId: (profileId: string) => void;
  setCountries: (data: CountryRecommendation[]) => void;
  setSelectedCountry: (country: CountryRecommendation) => void;
  reset: () => void;
}

export const useRecommendationStore = create<RecommendationState>()(
  persist(
    (set) => ({
      profileId: null,
      countries: [],
      selectedCountry: null,

      setProfileId: (profileId: string) => set({ profileId }),
      setCountries: (data: CountryRecommendation[]) => set({ countries: data }),
      setSelectedCountry: (country: CountryRecommendation) => set({ selectedCountry: country }),
      reset: () => set({ profileId: null, countries: [], selectedCountry: null }),
    }),
    {
      name: 'recommendation-storage',
      partialize: (state) => ({
        profileId: state.profileId,
        countries: state.countries,
        selectedCountry: state.selectedCountry,
      }),
    },
  ),
);
