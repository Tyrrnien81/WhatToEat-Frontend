import { BASE_URL, DEFAULT_USER_ID } from './api';

const userId = DEFAULT_USER_ID;
const today = new Date().toISOString().split('T')[0];

export const getRecommendedCombos = async (mealType?: string) => {
  const url = `${BASE_URL}/recommendations/combo?user_id=${userId}&date=${today}${mealType ? `&mealType=${mealType}` : ''}`;
  const res = await fetch(url);
  return res.json();
};

export const getDailyGoals = async () => {
  const url = `${BASE_URL}/goals/daily?user_id=${userId}&date=${today}`;
  const res = await fetch(url);
  return res.json();
};

export const logMeal = async (mealType: string, items: object[]) => {
  const res = await fetch(`${BASE_URL}/meals/log?user_id=${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date: today, mealType, items }),
  });
  return res.json();
};

export const getAddons = async (mealType?: string) => {
  const url = `${BASE_URL}/recommendations/addons?user_id=${userId}&date=${today}${mealType ? `&mealType=${mealType}` : ''}`;
  const res = await fetch(url);
  return res.json();
};