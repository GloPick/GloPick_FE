import { CityRecommendation, CountryRecommendation } from '@/types/profile';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecommendationState {
  profileId: string | null;
  recommendationId: string | null;
  inputId: string | null;
  countries: CountryRecommendation[] | null;
  selectedCountry?: CountryRecommendation | null;
  cities: CityRecommendation[] | null;

  setProfileId: (profileId: string) => void;
  setRecommendationId: (recommendationId: string) => void;
  setInputId: (inputId: string) => void;
  setCountries: (data: CountryRecommendation[]) => void;
  setSelectedCountry: (country: CountryRecommendation) => void;
  setCities: (cities: CityRecommendation[]) => void;
  reset: () => void;
}

export const useRecommendationStore = create<RecommendationState>()(
  persist(
    (set) => ({
      profileId: null,
      recommendationId: null,
      inputId: null,
      countries: [],
      selectedCountry: null,
      cities: [],

      setProfileId: (profileId: string) => set({ profileId }),
      setRecommendationId: (recommendationId: string) => set({ recommendationId }),
      setInputId: (inputId: string) => set({ inputId }),
      setCountries: (data: CountryRecommendation[]) => set({ countries: data }),
      setSelectedCountry: (country: CountryRecommendation) => set({ selectedCountry: country }),
      setCities: (cities: CityRecommendation[]) => set({ cities }),
      reset: () =>
        set({
          profileId: null,
          recommendationId: null,
          inputId: null,
          countries: [],
          selectedCountry: null,
          cities: [],
        }),
    }),
    {
      name: 'recommendation-storage',
      partialize: (state) => ({
        profileId: state.profileId,
        recommendationId: state.recommendationId,
        inputId: state.inputId,
        countries: state.countries,
        selectedCountry: state.selectedCountry,
        cities: state.cities,
      }),
    },
  ),
);
