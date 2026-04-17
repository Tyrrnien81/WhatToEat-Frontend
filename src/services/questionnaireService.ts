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

const SUBMIT_TIMEOUT_MS = 60_000;

/**
 * POST /questionnaire. Resolves on success or 409 (already saved — treat as OK for onboarding).
 */
export async function submitQuestionnaire(body: QuestionnaireSubmitBody): Promise<void> {
  const url = withAuthQuery(`${BASE_URL}/questionnaire`);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: authHeaders(true),
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (res.status === 409) {
      return;
    }
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Questionnaire failed (${res.status})`);
    }
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'AbortError') {
      throw new Error(
        `Request timed out after ${SUBMIT_TIMEOUT_MS / 1000}s. Check EXPO_PUBLIC_API_BASE_URL and that the backend is reachable from your device.`,
      );
    }
    throw e;
  } finally {
    clearTimeout(timer);
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

/** PATCH /users/me/preferences — use snake_case keys expected by the API. */
export async function updatePreferences(patch: {
  birthday?: string;
  gender?: string;
  height?: number;
  height_unit?: 'cm' | 'ft';
  weight?: number;
  weight_unit?: 'kg' | 'lb';
  goal_weight?: number;
  diet_type?: string;
  dislikes?: string[];
  allergens?: string[];
  favorite_dining_halls?: string[];
}): Promise<void> {
  const url = withAuthQuery(`${BASE_URL}/users/me/preferences`);
  const res = await fetch(url, {
    method: 'PATCH',
    headers: authHeaders(true),
    body: JSON.stringify(patch),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `PATCH preferences failed (${res.status})`);
  }
}
