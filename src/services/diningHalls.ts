import { BASE_URL, authHeaders, withAuthQuery } from '../services/api';
import { DiningHall } from '../screens/DiningHall/types';

export interface DiningHallsResponse {
  diningHalls: DiningHall[];
}

export async function fetchDiningHalls(date: string): Promise<DiningHallsResponse> {
  const url = withAuthQuery(`${BASE_URL}/dining-halls/full?date=${date}`);
  const res = await fetch(url, { headers: authHeaders(false) });
  if (!res.ok) throw new Error('Failed to fetch dining halls');
  return res.json();
}
