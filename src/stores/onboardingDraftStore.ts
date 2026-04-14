import { create } from 'zustand';

/** Fields collected across SetUp screens for POST /questionnaire */
export type OnboardingDraft = {
  birthday: string | null;
  gender: string | null;
  heightUnit: 'cm' | 'ft';
  /** cm value, or total inches when heightUnit is ft */
  heightValue: number | null;
  weight: number | null;
  weightUnit: 'kg' | 'lb';
  goalWeight: number | null;
  dietType: string | null;
  dislikes: string[];
  allergens: string[];
  favoriteDiningHalls: string[];
};

const emptyDraft = (): OnboardingDraft => ({
  birthday: null,
  gender: null,
  heightUnit: 'cm',
  heightValue: null,
  weight: null,
  weightUnit: 'kg',
  goalWeight: null,
  dietType: null,
  dislikes: [],
  allergens: [],
  favoriteDiningHalls: [],
});

type Store = OnboardingDraft & {
  setDraft: (p: Partial<OnboardingDraft>) => void;
  resetDraft: () => void;
};

export const useOnboardingDraft = create<Store>((set) => ({
  ...emptyDraft(),
  setDraft: (p) => set((s) => ({ ...s, ...p })),
  resetDraft: () =>
    set((s) => ({
      ...emptyDraft(),
      setDraft: s.setDraft,
      resetDraft: s.resetDraft,
    })),
}));

export function getOnboardingDraftSnapshot(): OnboardingDraft {
  const s = useOnboardingDraft.getState();
  return {
    birthday: s.birthday,
    gender: s.gender,
    heightUnit: s.heightUnit,
    heightValue: s.heightValue,
    weight: s.weight,
    weightUnit: s.weightUnit,
    goalWeight: s.goalWeight,
    dietType: s.dietType,
    dislikes: s.dislikes,
    allergens: s.allergens,
    favoriteDiningHalls: s.favoriteDiningHalls,
  };
}
