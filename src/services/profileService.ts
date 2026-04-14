import { BASE_URL, authHeaders, withAuthQuery } from './api';

export type ProfileMeResponse = {
  id: string;
  email: string;
  name: string;
  birthday: string | null;
  gender: string | null;
  height: number | null;
  weight: number | null;
  goalWeight: number | null;
  dietType: string | null;
  avatarUrl: string | null;
  createdAt: string;
};

export type FoodLogSummaryResponse = {
  range: string;
  currentStreak: number;
  longestStreak: number;
  averageDailyCalories: number;
  averageDailyProtein: number;
  totalMealsLogged: number;
};

export async function fetchProfileMe(): Promise<ProfileMeResponse> {
  const url = withAuthQuery(`${BASE_URL}/users/me`);
  const res = await fetch(url, { headers: authHeaders(false) });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `GET profile failed (${res.status})`);
  }
  return res.json();
}

export async function fetchFoodLogSummary(
  range: 'week' | 'month' | 'all' = 'week',
): Promise<FoodLogSummaryResponse> {
  const url = withAuthQuery(`${BASE_URL}/users/me/food-log/summary?range=${range}`);
  const res = await fetch(url, { headers: authHeaders(false) });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `GET food log summary failed (${res.status})`);
  }
  return res.json();
}
