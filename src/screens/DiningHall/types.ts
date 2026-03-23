// ─── Shared Types ─────────────────────────────────────────────────────────────
// Used across DiningHallsScreen and all child components.

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
    status: StatusType;
    hours: string;
    closedNote?: string;
    aiPickLabel: string;
    aiPickName: string;
    menus: Record<MealType, MealMenu>;
    }

    export interface DiningHall {
    id: string;
    name: string;
    emoji: string;
    emojiBg: string;
    mapsUrl: string;
    // Keyed by date string 'YYYY-MM-DD'
    // TODO: Replace with API → GET /api/dining-halls/{id}/menu?date=YYYY-MM-DD
    days: Record<string, DiningHallDay>;
}