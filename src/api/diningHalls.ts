import { DiningHall } from '../screens/DiningHall/types';
 
const BASE_URL = 'http://10.141.125.249:8000';
 
export interface DiningHallsResponse {
  diningHalls: DiningHall[];
}
 
export async function fetchDiningHalls(date: string): Promise<DiningHallsResponse> {
  const res = await fetch(`${BASE_URL}/dining-halls/full?date=${date}`);
  if (!res.ok) throw new Error('Failed to fetch dining halls');
  return res.json();
}