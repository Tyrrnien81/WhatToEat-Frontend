export type StatusType = 'open' | 'soon' | 'closed';
export type SortOption = 'Relevance' | 'Open Now' | 'Closest';
export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface MenuItem {
  name: string;
  favorited?: boolean;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface MealMenu {
  count: number;
  categories: MenuCategory[];
}

export interface DiningHallDay {
  status: string;          // ← changed from StatusType to string
  hours: string;
  closedNote?: string;
  aiPickLabel?: string;    // ← made optional
  aiPickName?: string;     // ← made optional
  menus: Record<string, MealMenu>;  // ← changed from Record<MealType, ...> to Record<string, ...>
}

export interface DiningHall {
  id: string;
  name: string;
  emoji: string;
  emojiBg: string;
  mapsUrl: string;
  days: Record<string, DiningHallDay>;
}