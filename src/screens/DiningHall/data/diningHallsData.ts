/**
 * Legacy mock dining data removed — the app loads halls via `fetchDiningHalls` + TanStack Query
 * (`DiningHallsScreen`). Kept as a tiny module so old import paths fail clearly.
 */
import type { DiningHall } from '../types';

export const DINING_HALLS: DiningHall[] = [];
