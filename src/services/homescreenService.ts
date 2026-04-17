import { BASE_URL, authHeaders, withAuthQuery } from './api';
import { toLocalYmd } from '../utils/dateLocal';

/** Call at request time — module-level "today" breaks across midnight and used to use UTC. */
function todayLocal(): string {
  return toLocalYmd(new Date());
}

async function parseJson<T>(res: Response, label: string): Promise<T> {
  const text = await res.text();
  if (!res.ok) {
    const hint = text.trim().slice(0, 200) || res.statusText;
    throw new Error(`${label} (${res.status}): ${hint}`);
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`${label}: expected JSON, got: ${text.trim().slice(0, 120)}`);
  }
}

export const getRecommendedCombos = async (mealType?: string) => {
  const qs = new URLSearchParams({ date: todayLocal() });
  if (mealType) qs.set('mealType', mealType);
  const url = withAuthQuery(`${BASE_URL}/recommendations/combo?${qs.toString()}`);
  const res = await fetch(url, { headers: authHeaders(false) });
  return parseJson(res, 'GET /recommendations/combo');
};

export const getDailyGoals = async () => {
  const qs = new URLSearchParams({ date: todayLocal() });
  const url = withAuthQuery(`${BASE_URL}/goals/daily?${qs.toString()}`);
  const res = await fetch(url, { headers: authHeaders(false) });
  return parseJson(res, 'GET /goals/daily');
};

export const logMeal = async (mealType: string, items: object[]) => {
  const url = withAuthQuery(`${BASE_URL}/meals/log`);
  const res = await fetch(url, {
    method: 'POST',
    headers: authHeaders(true),
    body: JSON.stringify({ date: todayLocal(), mealType, items }),
  });
  return parseJson(res, 'POST /meals/log');
};

export const getAddons = async (mealType?: string) => {
  const qs = new URLSearchParams({ date: todayLocal() });
  if (mealType) qs.set('mealType', mealType);
  const url = withAuthQuery(`${BASE_URL}/recommendations/addons?${qs.toString()}`);
  const res = await fetch(url, { headers: authHeaders(false) });
  return parseJson(res, 'GET /recommendations/addons');
};
