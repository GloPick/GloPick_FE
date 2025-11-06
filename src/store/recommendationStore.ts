import { CityRecommendation, CountryRecommendation } from '@/types/profile';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecommendationState {
  profileId: string | null;
  recommendationId: string | null;
  countries: CountryRecommendation[] | null;
  selectedCountry?: CountryRecommendation | null;
  cities: CityRecommendation[] | null;

  setProfileId: (profileId: string) => void;
  setRecommendationId: (recommendationId: string) => void;
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
      countries: [],
      selectedCountry: null,
      cities: [],

      setProfileId: (profileId: string) => set({ profileId }),
      setRecommendationId: (recommendationId: string) => set({ recommendationId }),
      setCountries: (data: CountryRecommendation[]) => set({ countries: data }),
      setSelectedCountry: (country: CountryRecommendation) => set({ selectedCountry: country }),
      setCities: (cities: CityRecommendation[]) => set({ cities }),
      reset: () =>
        set({
          profileId: null,
          recommendationId: null,
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
        countries: state.countries,
        selectedCountry: state.selectedCountry,
        cities: state.cities,
      }),
    },
  ),
);
