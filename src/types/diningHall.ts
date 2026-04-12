export interface FullMenuItem {
  name: string;
  id?: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  favorited: boolean;
}

export interface FullMenuCategory {
  category: string;
  items: FullMenuItem[];
}

export interface FullMealMenu {
  count: number;
  categories: FullMenuCategory[];
}

export interface FullDiningHallDay {
  status: string;          // "open" | "soon" | "closed"
  hours: string;
  closedNote?: string;
  aiPickLabel?: string;
  aiPickName?: string;
  menus: Record<string, FullMealMenu>;  // e.g. { "Breakfast": {...}, "Lunch": {...} }
}

export interface FullDiningHall {
  id: string;
  name: string;
  emoji: string;
  emojiBg: string;
  mapsUrl: string;
  days: Record<string, FullDiningHallDay>;  // keyed by "YYYY-MM-DD"
}

export interface FullDiningHallsResponse {
  diningHalls: FullDiningHall[];
}