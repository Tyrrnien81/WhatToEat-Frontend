import { BASE_URL, authHeaders, withAuthQuery } from './api';
import type { OnboardingDraft } from '../stores/onboardingDraftStore';

export type QuestionnaireSubmitBody = {
  birthday: string;
  gender: string;
  height: number;
  height_unit: 'cm' | 'ft';
  weight: number;
  weight_unit: 'kg' | 'lb';
  goal_weight: number;
  diet_type: string;
  dislikes: string[];
  allergens: string[];
  favorite_dining_halls: string[];
};

export type PreferencesResponse = {
  birthday: string;
  gender: string;
  height: number;
  weight: number;
  goal_weight: number;
  diet_type: string;
  dislikes: string[];
  allergens: string[];
  favorite_dining_halls: string[];
  target_calories: number;
  target_protein_g: number;
  target_carbs_g: number;
  target_fat_g: number;
};

function normalizeAllergens(ids: string[]): string[] {
  if (ids.includes('none')) return ['none'];
  return Array.from(new Set(ids.filter((id) => id !== 'none')));
}

/** Returns null if required onboarding fields are missing. */
export function buildQuestionnairePayload(d: OnboardingDraft): QuestionnaireSubmitBody | null {
  if (
    !d.birthday ||
    !d.gender ||
    d.heightValue == null ||
    d.weight == null ||
    d.goalWeight == null ||
    !d.dietType
  ) {
    return null;
  }
  return {
    birthday: d.birthday,
    gender: d.gender,
    height: d.heightValue,
    height_unit: d.heightUnit,
    weight: d.weight,
    weight_unit: d.weightUnit,
    goal_weight: d.goalWeight,
    diet_type: d.dietType,
    dislikes: d.dislikes,
    allergens: normalizeAllergens(d.allergens),
    favorite_dining_halls: d.favoriteDiningHalls.slice(0, 3),
  };
}

export async function submitQuestionnaire(body: QuestionnaireSubmitBody): Promise<void> {
  const url = withAuthQuery(`${BASE_URL}/questionnaire`);
  const res = await fetch(url, {
    method: 'POST',
    headers: authHeaders(true),
    body: JSON.stringify(body),
  });
  if (res.status === 409) {
    throw new Error('Preferences already saved. Use profile edit to update.');
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Questionnaire failed (${res.status})`);
  }
}

export async function fetchPreferences(): Promise<PreferencesResponse> {
  const url = withAuthQuery(`${BASE_URL}/users/me/preferences`);
  const res = await fetch(url, { headers: authHeaders(false) });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `GET preferences failed (${res.status})`);
  }
  return res.json();
}
