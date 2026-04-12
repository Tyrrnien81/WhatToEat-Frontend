import { BASE_URL } from '../services/api';
import { DiningHall } from '../screens/DiningHall/types';

export interface DiningHallsResponse {
  diningHalls: DiningHall[];
}

export async function fetchDiningHalls(date: string): Promise<DiningHallsResponse> {
  const res = await fetch(`${BASE_URL}/dining-halls/full?date=${date}`);
  if (!res.ok) throw new Error('Failed to fetch dining halls');
  return res.json();
}
