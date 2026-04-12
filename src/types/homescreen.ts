export type FoodItem = {
  id: number;
  name: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  station?: string;
};

export type Combo = {
  id: string;
  name: string;
  label?: string;
  items: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  diningHall: string;
  logged: boolean;
};

export type AddonItem = FoodItem & {
  icons: string[];
};

export type DailyGoals = {
  date: string;
  calories: { goal: number; consumed: number };
  protein: { goal: number; consumed: number };
  carbs: { goal: number; consumed: number };
  fat: { goal: number; consumed: number };
};