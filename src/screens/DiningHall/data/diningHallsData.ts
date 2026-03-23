import { DiningHall } from '../types';

// ─── Date helpers ─────────────────────────────────────────────────────────────
// Returns 'YYYY-MM-DD' for today + offset days
export function dateKey(offsetDays: number = 0): string {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
    }

    // ─── Mock Data ────────────────────────────────────────────────────────────────
    // TODO: Replace with TanStack Query → GET /api/dining-halls?date=YYYY-MM-DD
    // Each hall has a `days` object keyed by 'YYYY-MM-DD'.
    // At runtime, generate keys using dateKey(0..4) so data always aligns to today.

    const TODAY = dateKey(0);
    const D1    = dateKey(1);
    const D2    = dateKey(2);
    const D3    = dateKey(3);
    const D4    = dateKey(4);

    export const DINING_HALLS: DiningHall[] = [
    {
        id: 'gordon',
        name: 'Gordon Avenue Market',
        emoji: '🏛️',
        emojiBg: '#FFE8D6',
        mapsUrl: 'https://www.google.com/maps/place/Gordon+Dining+and+Event+Center/@43.0711999,-89.4011868,16z',
        days: {
        [TODAY]: {
            status: 'open',
            hours: 'Closes 8:00 PM',
            aiPickLabel: 'High Protein',
            aiPickName: 'Roasted Turkey Breast',
            menus: {
            breakfast: {
                count: 18,
                categories: [
                {
                    category: 'Great Greens',
                    items: [
                    { name: 'Odyssey Strawberry Greek Yogurt' },
                    { name: 'Fruit Grapes Whole' },
                    { name: 'Oatmeal (VN)' },
                    { name: 'Honeydew Melon Slices' },
                    { name: 'Build Your Own Yogurt Bar' },
                    ],
                },
                {
                    category: 'Gordon Delicious',
                    items: [
                    { name: 'Egg Salad Filling' },
                    { name: 'Hummus Homemade Roasted Beet (VN)' },
                    { name: 'Avocado Toast' },
                    { name: 'Build Your Own Breakfast Sandwich' },
                    { name: 'Build Your Own Sandwich' },
                    ],
                },
                {
                    category: 'Eggcetera',
                    items: [
                    { name: 'Scrambled Eggs' },
                    { name: 'Scrambled Egg Whites' },
                    { name: 'Scrambled Tofu (VN)' },
                    { name: 'Make Your Own Waffle w/Fruit & Cream' },
                    { name: 'Hard Cooked Egg' },
                    { name: 'Biscuits & Pork Gravy' },
                    { name: 'Redstone Potatoes' },
                    { name: 'Bacon' },
                    { name: 'Turkey Sausage Patties' },
                    { name: 'Jackfruit Sausage Patty' },
                    ],
                },
                ],
            },
            lunch: {
                count: 14,
                categories: [
                {
                    category: '1849',
                    items: [
                    { name: 'Spinach & Mushroom Fried Rice (VN)' },
                    { name: 'Chicken Drumstick Teriyaki Glazed' },
                    { name: 'Haddock Ginger Glazed' },
                    { name: 'Sesame Spinach (VN)' },
                    { name: 'Kung Pao Brussel Sprouts (VN)' },
                    { name: 'Thai Style Red Quinoa & Vegetables (VN)' },
                    ],
                },
                {
                    category: 'Great Greens',
                    items: [
                    { name: 'Tofu (VN)' },
                    { name: 'Black Beans (VN)' },
                    { name: 'Garden Vegetable Soup (VN)' },
                    { name: 'Chicken Chili' },
                    { name: 'Build Your Own Salad' },
                    { name: 'Build Your Own Yogurt Bar' },
                    ],
                },
                {
                    category: 'Buckingham Bakery',
                    items: [
                    { name: 'Cookies & Cream Brownie' },
                    { name: 'Rice Krispie Bar' },
                    { name: 'Cookie M&M' },
                    { name: 'Double Chocolate Chip Cookie' },
                    ],
                },
                ],
            },
            dinner: {
                count: 30,
                categories: [
                {
                    category: 'Entree',
                    items: [
                    { name: 'Roasted Turkey Breast', favorited: true },
                    { name: 'Turkey Gravy' },
                    { name: 'Biscuits & Pork Gravy' },
                    { name: 'Tofu Brown Rice & Veggies (VN)' },
                    ],
                },
                {
                    category: 'Sides',
                    items: [
                    { name: 'Corn (VN)' },
                    { name: 'Steamed Baby Carrots (VN)' },
                    { name: 'Wild Rice & Cranberry Pilaf (VN)' },
                    { name: 'Baby Baker Potatoes (VN)' },
                    ],
                },
                {
                    category: 'Gordon Buona Cucina',
                    items: [
                    { name: 'Pasta (VN)' },
                    { name: 'Whole Grain Pasta (VN)' },
                    { name: 'Zucchini Noodles (VN)' },
                    { name: 'Gluten Free Rotini (VN)' },
                    { name: 'Homemade Alfredo Sauce' },
                    { name: 'Homestyle Marinara Sauce (VN)' },
                    { name: 'Giardiniera Chicken' },
                    { name: 'Jackfruit Meatballs (VN)' },
                    { name: 'Hawaiian Roll' },
                    ],
                },
                {
                    category: 'Gordon Que Rico',
                    items: [
                    { name: 'Cheese Pizza Slice (Veg)' },
                    { name: 'Pepperoni Pizza Slice' },
                    { name: 'Vegan Taco Filling (VN)' },
                    { name: 'Pork Carnita' },
                    { name: 'Beef Taco Meat' },
                    { name: 'Cilantro Lime White Rice (VN)' },
                    { name: 'Pinto Beans (VN)' },
                    ],
                },
                {
                    category: 'Fired Up',
                    items: [
                    { name: "Crispy Buffalo Chik'n Sandwich (VN)" },
                    { name: 'Crispy Buffalo Chicken Sandwich' },
                    { name: 'Straight Cut Fries (VN)' },
                    ],
                },
                {
                    category: 'Buckingham Bakery',
                    items: [
                    { name: 'Peach Crumb Bar' },
                    { name: 'Marble Cake w/Chocolate Frosting' },
                    { name: 'Double Chocolate Chip Cookie' },
                    { name: 'Oatmeal Raisin Cookie' },
                    ],
                },
                {
                    category: 'Great Greens',
                    items: [
                    { name: 'Tempeh' },
                    { name: 'Diced Chicken' },
                    { name: 'Quinoa (VN)' },
                    { name: 'Garbanzo Beans (VN)' },
                    { name: 'Garden Vegetable Soup (VN)' },
                    { name: 'Chicken Chili' },
                    ],
                },
                ],
            },
            },
        },
        [D1]: {
            status: 'open',
            hours: 'Closes 8:00 PM',
            aiPickLabel: 'Comfort Food',
            aiPickName: 'Beef & Chicken Meatballs',
            menus: {
            breakfast: {
                count: 12,
                categories: [
                {
                    category: 'Eggcetera',
                    items: [
                    { name: 'Scrambled Eggs' },
                    { name: 'French Toast' },
                    { name: 'Bacon' },
                    { name: 'Hash Browns (VN)' },
                    ],
                },
                {
                    category: 'Great Greens',
                    items: [
                    { name: 'Overnight Oats (VN)' },
                    { name: 'Banana' },
                    { name: 'Mixed Berry Yogurt' },
                    ],
                },
                ],
            },
            lunch: {
                count: 12,
                categories: [
                {
                    category: 'Gordon Buona Cucina',
                    items: [
                    { name: 'Penne Pasta (VN)' },
                    { name: 'Beef & Chicken Meatballs' },
                    { name: 'Italian Meat Sauce' },
                    { name: 'Homestyle Marinara Sauce (VN)' },
                    { name: 'Garlic Bread' },
                    ],
                },
                {
                    category: 'Great Greens',
                    items: [
                    { name: 'Caesar Salad' },
                    { name: 'Minestrone Soup (VN)' },
                    { name: 'Build Your Own Salad' },
                    ],
                },
                ],
            },
            dinner: {
                count: 14,
                categories: [
                {
                    category: 'Entree',
                    items: [
                    { name: 'Beef & Chicken Meatballs', favorited: true },
                    { name: 'Italian Roasted Normandy Vegetables (VN)' },
                    { name: 'Baked Ziti' },
                    ],
                },
                {
                    category: 'Sides',
                    items: [
                    { name: 'Roasted Broccoli (VN)' },
                    { name: 'Garlic Mashed Potatoes' },
                    ],
                },
                {
                    category: 'Buckingham Bakery',
                    items: [
                    { name: 'Tiramisu' },
                    { name: 'Biscotti' },
                    { name: 'Chocolate Chip Cookie' },
                    ],
                },
                ],
            },
            },
        },
        [D2]: {
            status: 'open',
            hours: 'Closes 8:00 PM',
            aiPickLabel: 'Plant Based',
            aiPickName: 'Spinach & Mushroom Fried Rice',
            menus: {
            breakfast: {
                count: 10,
                categories: [
                {
                    category: 'Eggcetera',
                    items: [
                    { name: 'Veggie Omelette' },
                    { name: 'Steel Cut Oatmeal (VN)' },
                    { name: 'Turkey Sausage Patty' },
                    ],
                },
                {
                    category: 'Great Greens',
                    items: [
                    { name: 'Acai Bowl (VN)' },
                    { name: 'Fresh Fruit Cup (VN)' },
                    ],
                },
                ],
            },
            lunch: {
                count: 11,
                categories: [
                {
                    category: '1849',
                    items: [
                    { name: 'Spinach & Mushroom Fried Rice (VN)', favorited: true },
                    { name: 'General Tso Tofu (VN)' },
                    { name: 'Steamed Dumplings' },
                    { name: 'Edamame (VN)' },
                    ],
                },
                {
                    category: 'Great Greens',
                    items: [
                    { name: 'Miso Soup (VN)' },
                    { name: 'Seaweed Salad (VN)' },
                    { name: 'Build Your Own Salad' },
                    ],
                },
                ],
            },
            dinner: {
                count: 12,
                categories: [
                {
                    category: 'Entree',
                    items: [
                    { name: 'Kung Pao Chicken' },
                    { name: 'Mapo Tofu (VN)' },
                    { name: 'Vegetable Lo Mein (VN)' },
                    ],
                },
                {
                    category: 'Sides',
                    items: [
                    { name: 'White Rice (VN)' },
                    { name: 'Brown Rice (VN)' },
                    { name: 'Stir Fried Bok Choy (VN)' },
                    ],
                },
                {
                    category: 'Buckingham Bakery',
                    items: [
                    { name: 'Mango Pudding (VN)' },
                    { name: 'Sesame Ball (VN)' },
                    ],
                },
                ],
            },
            },
        },
        [D3]: {
            status: 'open',
            hours: 'Closes 8:00 PM',
            aiPickLabel: 'Bold Flavors',
            aiPickName: 'Crispy Buffalo Chicken Sandwich',
            menus: {
            breakfast: {
                count: 9,
                categories: [
                {
                    category: 'Eggcetera',
                    items: [
                    { name: 'Breakfast Burrito' },
                    { name: 'Scrambled Eggs' },
                    { name: 'Chorizo' },
                    ],
                },
                {
                    category: 'Great Greens',
                    items: [
                    { name: 'Greek Yogurt Parfait' },
                    { name: 'Pineapple Chunks (VN)' },
                    ],
                },
                ],
            },
            lunch: {
                count: 10,
                categories: [
                {
                    category: 'Fired Up',
                    items: [
                    { name: 'Crispy Buffalo Chicken Sandwich', favorited: true },
                    { name: "Crispy Buffalo Chik'n Sandwich (VN)" },
                    { name: 'Straight Cut Fries (VN)' },
                    { name: 'Coleslaw (VN)' },
                    ],
                },
                {
                    category: 'Great Greens',
                    items: [
                    { name: 'Garden Vegetable Soup (VN)' },
                    { name: 'Build Your Own Salad' },
                    ],
                },
                ],
            },
            dinner: {
                count: 13,
                categories: [
                {
                    category: 'Gordon Que Rico',
                    items: [
                    { name: 'Carne Asada' },
                    { name: 'Vegan Taco Filling (VN)' },
                    { name: 'Pork Carnita' },
                    { name: 'Flour Tortillas' },
                    { name: 'Cilantro Lime White Rice (VN)' },
                    { name: 'Black Beans (VN)' },
                    ],
                },
                {
                    category: 'Sides',
                    items: [
                    { name: 'Elote Corn' },
                    { name: 'Guacamole & Chips (VN)' },
                    ],
                },
                {
                    category: 'Buckingham Bakery',
                    items: [
                    { name: 'Churro' },
                    { name: 'Tres Leches Cake' },
                    ],
                },
                ],
            },
            },
        },
        [D4]: {
            status: 'open',
            hours: 'Closes 8:00 PM',
            aiPickLabel: 'Lean & Clean',
            aiPickName: 'Atlantic Salmon Power Bowl',
            menus: {
            breakfast: {
                count: 8,
                categories: [
                {
                    category: 'Great Greens',
                    items: [
                    { name: 'Granola & Berries (VN)' },
                    { name: 'Smoothie Bowl (VN)' },
                    { name: 'Hard Cooked Egg' },
                    ],
                },
                {
                    category: 'Eggcetera',
                    items: [
                    { name: 'Egg White Omelette' },
                    { name: 'Turkey Sausage Patty' },
                    ],
                },
                ],
            },
            lunch: {
                count: 10,
                categories: [
                {
                    category: 'Create-A-Bowl',
                    items: [
                    { name: 'Atlantic Salmon', favorited: true },
                    { name: 'Tofu (VN)' },
                    { name: 'Quinoa (VN)' },
                    { name: 'Steamed Broccoli (VN)' },
                    { name: 'White Basmati Rice (VN)' },
                    ],
                },
                {
                    category: 'Great Greens',
                    items: [
                    { name: 'Lentil Soup (VN)' },
                    { name: 'Build Your Own Salad' },
                    ],
                },
                ],
            },
            dinner: {
                count: 11,
                categories: [
                {
                    category: 'Entree',
                    items: [
                    { name: 'Herb Roasted Salmon' },
                    { name: 'Lemon Chicken' },
                    { name: 'Stuffed Bell Peppers (VN)' },
                    ],
                },
                {
                    category: 'Sides',
                    items: [
                    { name: 'Wild Rice Pilaf (VN)' },
                    { name: 'Roasted Asparagus (VN)' },
                    { name: 'Honey Glazed Carrots' },
                    ],
                },
                {
                    category: 'Buckingham Bakery',
                    items: [
                    { name: 'Lemon Blueberry Cake' },
                    { name: 'Oatmeal Raisin Cookie' },
                    ],
                },
                ],
            },
            },
        },
        },
    },
    {
        id: 'rheta',
        name: "Rheta's Market",
        emoji: '🍜',
        emojiBg: '#E8F4FF',
        mapsUrl: "https://www.google.com/maps/place/Rheta's+Market/@43.073974,-89.404274,16z",
        days: {
        [TODAY]: {
            status: 'open',
            hours: 'Closes 9:00 PM',
            aiPickLabel: 'Balanced Meal',
            aiPickName: 'Giardiniera Chicken Pasta',
            menus: {
            breakfast: { count: 6, categories: [{ category: 'Fired Up', items: [{ name: 'Breakfast Burrito' }, { name: 'Denver Omelet' }, { name: 'Turkey Sausage Patty' }] }, { category: 'Great Greens', items: [{ name: 'Oatmeal (VN)' }, { name: 'Yogurt Parfait' }, { name: 'Bagel & Cream Cheese' }] }] },
            lunch: { count: 8, categories: [{ category: 'Global Kitchen', items: [{ name: 'Giardiniera Chicken' }, { name: 'Pasta (VN)' }, { name: 'Homestyle Marinara Sauce (VN)' }, { name: 'Homemade Alfredo Sauce' }] }, { category: 'Great Greens', items: [{ name: 'Sweet Corn (VN)' }, { name: 'Build Your Own Salad' }] }] },
            dinner: { count: 5, categories: [{ category: 'Global Kitchen', items: [{ name: 'Pad Thai', favorited: true }, { name: 'Miso Soup (VN)' }, { name: 'Edamame (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }, { name: 'Hearty Vegetable Soup (VN)' }] }] },
            },
        },
        [D1]: { status: 'open', hours: 'Closes 9:00 PM', aiPickLabel: 'Asian Fusion', aiPickName: 'Pad Thai', menus: { breakfast: { count: 5, categories: [{ category: 'Fired Up', items: [{ name: 'Pancakes' }, { name: 'Scrambled Eggs' }] }, { category: 'Great Greens', items: [{ name: 'Fresh Fruit (VN)' }, { name: 'Oatmeal (VN)' }] }] }, lunch: { count: 7, categories: [{ category: 'Global Kitchen', items: [{ name: 'Pad Thai', favorited: true }, { name: 'Spring Rolls' }, { name: 'Steamed Rice (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Tom Yum Soup (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 6, categories: [{ category: 'Global Kitchen', items: [{ name: 'Green Curry (VN)' }, { name: 'Chicken Satay' }, { name: 'Jasmine Rice (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }, { name: 'Coconut Soup (VN)' }] }] } } },
        [D2]: { status: 'open', hours: 'Closes 9:00 PM', aiPickLabel: 'Mediterranean', aiPickName: 'Falafel Wrap', menus: { breakfast: { count: 5, categories: [{ category: 'Fired Up', items: [{ name: 'Veggie Omelette' }, { name: 'Pita & Hummus (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Granola (VN)' }, { name: 'Fresh Fruit (VN)' }] }] }, lunch: { count: 7, categories: [{ category: 'Global Kitchen', items: [{ name: 'Falafel Wrap', favorited: true }, { name: 'Tabbouleh (VN)' }, { name: 'Hummus & Pita (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Lentil Soup (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 6, categories: [{ category: 'Global Kitchen', items: [{ name: 'Shawarma Chicken' }, { name: 'Roasted Vegetables (VN)' }, { name: 'Couscous (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }, { name: 'Harira Soup (VN)' }] }] } } },
        [D3]: { status: 'soon', hours: 'Closes 2:00 PM', aiPickLabel: 'Brunch Special', aiPickName: 'Avocado Toast', menus: { breakfast: { count: 6, categories: [{ category: 'Fired Up', items: [{ name: 'Avocado Toast', favorited: true }, { name: 'Smoked Salmon Bagel' }, { name: 'Eggs Benedict' }] }, { category: 'Great Greens', items: [{ name: 'Açaí Bowl (VN)' }, { name: 'Fresh Juice (VN)' }] }] }, lunch: { count: 5, categories: [{ category: 'Global Kitchen', items: [{ name: 'Quiche' }, { name: 'Croissant Sandwich' }] }, { category: 'Great Greens', items: [{ name: 'Tomato Bisque' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 0, categories: [] } } },
        [D4]: { status: 'open', hours: 'Closes 9:00 PM', aiPickLabel: 'Comfort Food', aiPickName: 'Mac & Cheese', menus: { breakfast: { count: 4, categories: [{ category: 'Fired Up', items: [{ name: 'Waffles' }, { name: 'Sausage Links' }] }, { category: 'Great Greens', items: [{ name: 'Oatmeal (VN)' }, { name: 'Fresh Fruit (VN)' }] }] }, lunch: { count: 6, categories: [{ category: 'Global Kitchen', items: [{ name: 'Mac & Cheese', favorited: true }, { name: 'Grilled Chicken' }, { name: 'Coleslaw (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Tomato Soup (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 5, categories: [{ category: 'Global Kitchen', items: [{ name: 'BBQ Ribs' }, { name: 'Cornbread' }, { name: 'Baked Beans (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Coleslaw (VN)' }, { name: 'Build Your Own Salad' }] }] } } },
        },
    },
    {
        id: 'liz',
        name: "Liz's Market",
        emoji: '🥗',
        emojiBg: '#E8FFE8',
        mapsUrl: "https://www.google.com/maps/place/Liz's+Market/@43.0767289,-89.4095358,16z",
        days: {
        [TODAY]: { status: 'soon', hours: 'Closes 2:30 PM', aiPickLabel: 'Lean & Clean', aiPickName: 'Atlantic Salmon Power Bowl', menus: { breakfast: { count: 5, categories: [{ category: 'Fired Up', items: [{ name: 'Acai Bowl (VN)' }, { name: 'Avocado Toast', favorited: true }, { name: 'Veggie Omelette' }] }, { category: 'Great Greens', items: [{ name: 'Granola & Berries (VN)' }, { name: 'Smoothie (VN)' }] }] }, lunch: { count: 6, categories: [{ category: 'Create-A-Bowl', items: [{ name: 'Atlantic Salmon' }, { name: 'Tofu (VN)' }, { name: 'Quinoa (VN)' }, { name: 'Steamed Broccoli (VN)' }, { name: 'White Basmati Rice (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }] }] }, dinner: { count: 4, categories: [{ category: 'Create-A-Bowl', items: [{ name: 'Poke Bowl' }, { name: 'Veggie Sushi Roll (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }, { name: 'Miso Soup (VN)' }] }] } } },
        [D1]: { status: 'open', hours: 'Closes 7:00 PM', aiPickLabel: 'Fresh & Light', aiPickName: 'Poke Bowl', menus: { breakfast: { count: 4, categories: [{ category: 'Great Greens', items: [{ name: 'Smoothie Bowl (VN)' }, { name: 'Chia Pudding (VN)' }, { name: 'Fresh Fruit (VN)' }] }] }, lunch: { count: 5, categories: [{ category: 'Create-A-Bowl', items: [{ name: 'Poke Bowl', favorited: true }, { name: 'Brown Rice (VN)' }, { name: 'Edamame (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Miso Soup (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 4, categories: [{ category: 'Create-A-Bowl', items: [{ name: 'Grilled Tuna' }, { name: 'Soba Noodles (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }, { name: 'Seaweed Soup (VN)' }] }] } } },
        [D2]: { status: 'open', hours: 'Closes 7:00 PM', aiPickLabel: 'Plant Power', aiPickName: 'Buddha Bowl', menus: { breakfast: { count: 4, categories: [{ category: 'Great Greens', items: [{ name: 'Overnight Oats (VN)' }, { name: 'Avocado Toast (VN)' }, { name: 'Mixed Berries (VN)' }] }] }, lunch: { count: 5, categories: [{ category: 'Create-A-Bowl', items: [{ name: 'Buddha Bowl', favorited: true }, { name: 'Falafel (VN)' }, { name: 'Hummus (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Lentil Soup (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 4, categories: [{ category: 'Create-A-Bowl', items: [{ name: 'Stuffed Peppers (VN)' }, { name: 'Quinoa Pilaf (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }, { name: 'Vegetable Soup (VN)' }] }] } } },
        [D3]: { status: 'closed', hours: 'Opens 11:00 AM', closedNote: 'Closed · Opens today at 11:00 AM', aiPickLabel: 'Lean & Clean', aiPickName: 'Grain Bowl', menus: { breakfast: { count: 0, categories: [] }, lunch: { count: 5, categories: [{ category: 'Create-A-Bowl', items: [{ name: 'Grain Bowl', favorited: true }, { name: 'Grilled Chicken' }, { name: 'Roasted Veggies (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Tomato Soup (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 4, categories: [{ category: 'Create-A-Bowl', items: [{ name: 'Salmon Rice Bowl' }, { name: 'Tofu Bowl (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }, { name: 'Miso Soup (VN)' }] }] } } },
        [D4]: { status: 'open', hours: 'Closes 7:00 PM', aiPickLabel: 'High Protein', aiPickName: 'Grilled Salmon Bowl', menus: { breakfast: { count: 4, categories: [{ category: 'Great Greens', items: [{ name: 'Protein Smoothie (VN)' }, { name: 'Hard Boiled Eggs' }, { name: 'Greek Yogurt' }] }] }, lunch: { count: 5, categories: [{ category: 'Create-A-Bowl', items: [{ name: 'Grilled Salmon Bowl', favorited: true }, { name: 'Quinoa (VN)' }, { name: 'Steamed Edamame (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Bone Broth Soup' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 4, categories: [{ category: 'Create-A-Bowl', items: [{ name: 'Tuna Steak' }, { name: 'Brown Rice (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }, { name: 'Miso Soup (VN)' }] }] } } },
        },
    },
    {
        id: 'fourlakes',
        name: 'Four Lakes Market',
        emoji: '🏔️',
        emojiBg: '#E8F0FF',
        mapsUrl: 'https://www.google.com/maps/place/Four+Lakes+Market/@43.0777477,-89.4203371,17z',
        days: {
        [TODAY]: { status: 'open', hours: 'Closes 7:30 PM', aiPickLabel: 'Comfort Fuel', aiPickName: 'Beef Bulgogi Bowl', menus: { breakfast: { count: 6, categories: [{ category: 'Create-A-Bowl', items: [{ name: 'Bulgogi Beef' }, { name: 'Bulgogi Chicken' }, { name: 'Bulgogi Portabella (VN)' }, { name: 'White Basmati Rice (VN)' }, { name: 'Firecracker Slaw (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Fruit Cup (VN)' }] }] }, lunch: { count: 8, categories: [{ category: 'Que Rico', items: [{ name: 'Beef Taco Meat' }, { name: 'Turkey Barbacoa' }, { name: 'Vegetable Fajita (VN)' }, { name: 'Black Beans (VN)' }, { name: 'Spanish Rice (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Mac & Cheese' }, { name: 'Chicken Sandwich' }, { name: 'Coleslaw (VN)' }] }] }, dinner: { count: 5, categories: [{ category: 'Fired Up', items: [{ name: 'Hearty Beef Stew', favorited: true }, { name: 'Lentil Soup (VN)' }, { name: 'Sourdough Bread' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }, { name: 'Vegetable Soup (VN)' }] }] } } },
        [D1]: { status: 'open', hours: 'Closes 7:30 PM', aiPickLabel: 'BBQ Night', aiPickName: 'Smoked Brisket', menus: { breakfast: { count: 5, categories: [{ category: 'Fired Up', items: [{ name: 'Pancakes' }, { name: 'Scrambled Eggs' }, { name: 'Bacon' }] }, { category: 'Great Greens', items: [{ name: 'Fresh Fruit (VN)' }, { name: 'Oatmeal (VN)' }] }] }, lunch: { count: 6, categories: [{ category: 'Fired Up', items: [{ name: 'Smoked Brisket', favorited: true }, { name: 'BBQ Chicken' }, { name: 'Cornbread' }] }, { category: 'Great Greens', items: [{ name: 'Baked Beans (VN)' }, { name: 'Coleslaw (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 5, categories: [{ category: 'Fired Up', items: [{ name: 'Baby Back Ribs' }, { name: 'Pulled Pork' }, { name: 'Mac & Cheese' }] }, { category: 'Great Greens', items: [{ name: 'Coleslaw (VN)' }, { name: 'Build Your Own Salad' }] }] } } },
        [D2]: { status: 'open', hours: 'Closes 7:30 PM', aiPickLabel: 'Taco Tuesday', aiPickName: 'Carne Asada Tacos', menus: { breakfast: { count: 5, categories: [{ category: 'Fired Up', items: [{ name: 'Huevos Rancheros' }, { name: 'Breakfast Quesadilla' }] }, { category: 'Great Greens', items: [{ name: 'Fresh Fruit (VN)' }, { name: 'Yogurt Parfait' }, { name: 'Oatmeal (VN)' }] }] }, lunch: { count: 7, categories: [{ category: 'Que Rico', items: [{ name: 'Carne Asada Tacos', favorited: true }, { name: 'Veggie Tacos (VN)' }, { name: 'Spanish Rice (VN)' }, { name: 'Black Beans (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Elote Corn' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 6, categories: [{ category: 'Que Rico', items: [{ name: 'Enchiladas' }, { name: 'Tamales' }, { name: 'Refried Beans (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Guacamole & Chips (VN)' }, { name: 'Build Your Own Salad' }] }] } } },
        [D3]: { status: 'open', hours: 'Closes 7:30 PM', aiPickLabel: 'Harvest Special', aiPickName: 'Roasted Butternut Squash Soup', menus: { breakfast: { count: 5, categories: [{ category: 'Fired Up', items: [{ name: 'Pumpkin Pancakes' }, { name: 'Apple Cinnamon Oatmeal (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Mixed Berries (VN)' }, { name: 'Yogurt Parfait' }, { name: 'Granola (VN)' }] }] }, lunch: { count: 6, categories: [{ category: 'Fired Up', items: [{ name: 'Roasted Butternut Squash Soup', favorited: true }, { name: 'Turkey Harvest Sandwich' }, { name: 'Sweet Potato Fries (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Kale Caesar Salad' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 6, categories: [{ category: 'Fired Up', items: [{ name: 'Roast Chicken' }, { name: 'Stuffing' }, { name: 'Cranberry Sauce (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Roasted Root Vegetables (VN)' }, { name: 'Build Your Own Salad' }] }] } } },
        [D4]: { status: 'open', hours: 'Closes 7:30 PM', aiPickLabel: 'Seafood Friday', aiPickName: 'Fish & Chips', menus: { breakfast: { count: 4, categories: [{ category: 'Fired Up', items: [{ name: 'French Toast' }, { name: 'Scrambled Eggs' }] }, { category: 'Great Greens', items: [{ name: 'Fresh Fruit (VN)' }, { name: 'Oatmeal (VN)' }] }] }, lunch: { count: 6, categories: [{ category: 'Fired Up', items: [{ name: 'Fish & Chips', favorited: true }, { name: 'Clam Chowder' }, { name: 'Coleslaw (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Garden Salad (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 5, categories: [{ category: 'Fired Up', items: [{ name: 'Baked Cod' }, { name: 'Shrimp Scampi' }, { name: 'Rice Pilaf (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Steamed Vegetables (VN)' }, { name: 'Build Your Own Salad' }] }] } } },
        },
    },
    {
        id: 'carson',
        name: "Carson's Market",
        emoji: '🌮',
        emojiBg: '#FFF0E8',
        mapsUrl: "https://www.google.com/maps/place/Carson's+Market/@43.0767289,-89.4095358,16z",
        days: {
        [TODAY]: { status: 'closed', hours: 'Opens 5:00 PM', closedNote: 'Closed · Opens today at 5:00 PM', aiPickLabel: 'Bold Flavors', aiPickName: 'Carne Asada Tacos', menus: { breakfast: { count: 0, categories: [] }, lunch: { count: 0, categories: [] }, dinner: { count: 6, categories: [{ category: 'Que Rico', items: [{ name: 'Carne Asada Tacos', favorited: true }, { name: 'Veggie Tacos (VN)' }, { name: 'Spanish Rice (VN)' }, { name: 'Black Beans (VN)' }, { name: 'Build Your Own Que Rico' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }] }] } } },
        [D1]: { status: 'open', hours: 'Opens 11:00 AM', aiPickLabel: 'Tex-Mex', aiPickName: 'Chicken Burrito Bowl', menus: { breakfast: { count: 0, categories: [] }, lunch: { count: 6, categories: [{ category: 'Que Rico', items: [{ name: 'Chicken Burrito Bowl', favorited: true }, { name: 'Veggie Tacos (VN)' }, { name: 'Spanish Rice (VN)' }, { name: 'Black Beans (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Guacamole & Chips (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 5, categories: [{ category: 'Que Rico', items: [{ name: 'Enchiladas' }, { name: 'Tamales' }, { name: 'Refried Beans (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }, { name: 'Tortilla Soup' }] }] } } },
        [D2]: { status: 'open', hours: 'Opens 11:00 AM', aiPickLabel: 'Nacho Night', aiPickName: 'Loaded Nachos', menus: { breakfast: { count: 0, categories: [] }, lunch: { count: 5, categories: [{ category: 'Que Rico', items: [{ name: 'Loaded Nachos', favorited: true }, { name: 'Queso Dip' }, { name: 'Pico de Gallo (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Black Bean Soup (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 5, categories: [{ category: 'Que Rico', items: [{ name: 'Birria Tacos' }, { name: 'Consommé' }, { name: 'Cilantro Lime Rice (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }, { name: 'Tortilla Soup' }] }] } } },
        [D3]: { status: 'open', hours: 'Opens 11:00 AM', aiPickLabel: 'Quesadilla Special', aiPickName: 'Chicken Quesadilla', menus: { breakfast: { count: 0, categories: [] }, lunch: { count: 5, categories: [{ category: 'Que Rico', items: [{ name: 'Chicken Quesadilla', favorited: true }, { name: 'Veggie Quesadilla (VN)' }, { name: 'Sour Cream' }] }, { category: 'Great Greens', items: [{ name: 'Tortilla Soup' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 4, categories: [{ category: 'Que Rico', items: [{ name: 'Carnitas Bowl' }, { name: 'Spanish Rice (VN)' }, { name: 'Black Beans (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }] }] } } },
        [D4]: { status: 'open', hours: 'Opens 11:00 AM', aiPickLabel: 'Weekend Special', aiPickName: 'Breakfast Burrito', menus: { breakfast: { count: 4, categories: [{ category: 'Fired Up', items: [{ name: 'Breakfast Burrito', favorited: true }, { name: 'Huevos Rancheros' }, { name: 'Chorizo & Eggs' }] }, { category: 'Great Greens', items: [{ name: 'Fresh Fruit (VN)' }] }] }, lunch: { count: 5, categories: [{ category: 'Que Rico', items: [{ name: 'Weekend Special Bowl' }, { name: 'Spanish Rice (VN)' }, { name: 'Pinto Beans (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Elote Corn' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 4, categories: [{ category: 'Que Rico', items: [{ name: 'Fajita Night' }, { name: 'Flour Tortillas' }, { name: 'Peppers & Onions (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }] }] } } },
        },
    },
    {
        id: 'lowell',
        name: 'Lowell Market',
        emoji: '🌿',
        emojiBg: '#F5E8FF',
        mapsUrl: 'https://www.google.com/maps/place/Lowell+Market/@43.0762606,-89.3983387,17z',
        days: {
        [TODAY]: { status: 'closed', hours: 'Opens 11:00 AM', closedNote: 'Closed · Opens tomorrow at 11:00 AM', aiPickLabel: 'Plant Based', aiPickName: 'Garden Power Bowl', menus: { breakfast: { count: 0, categories: [] }, lunch: { count: 5, categories: [{ category: 'Delicious', items: [{ name: 'Italian Pork Sub' }, { name: 'Lemon Pepper Chicken Salad' }, { name: 'Homemade Hummus (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Falafel Wrap' }, { name: 'Lentil Soup (VN)', favorited: true }] }] }, dinner: { count: 5, categories: [{ category: 'Fired Up', items: [{ name: 'Garden Power Bowl (VN)' }, { name: 'Stuffed Bell Peppers (VN)' }, { name: 'Wild Rice Pilaf (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }, { name: 'Roasted Cauliflower (VN)' }] }] } } },
        [D1]: { status: 'open', hours: 'Closes 8:00 PM', aiPickLabel: 'Vegan Special', aiPickName: 'Jackfruit Tacos', menus: { breakfast: { count: 4, categories: [{ category: 'Great Greens', items: [{ name: 'Steel Cut Oatmeal (VN)' }, { name: 'Fresh Fruit Bowl (VN)' }, { name: 'Whole Grain Toast (VN)' }] }] }, lunch: { count: 5, categories: [{ category: 'Delicious', items: [{ name: 'Jackfruit Tacos', favorited: true }, { name: 'Roasted Beets (VN)' }, { name: 'Hummus & Pita (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Lentil Soup (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 4, categories: [{ category: 'Fired Up', items: [{ name: 'Vegan Stir Fry (VN)' }, { name: 'Brown Rice (VN)' }, { name: 'Tofu (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Build Your Own Salad' }] }] } } },
        [D2]: { status: 'open', hours: 'Closes 8:00 PM', aiPickLabel: 'Grain Bowl', aiPickName: 'Farro & Roasted Vegetable Bowl', menus: { breakfast: { count: 3, categories: [{ category: 'Great Greens', items: [{ name: 'Overnight Oats (VN)' }, { name: 'Mixed Berries (VN)' }, { name: 'Almond Butter Toast (VN)' }] }] }, lunch: { count: 5, categories: [{ category: 'Delicious', items: [{ name: 'Farro & Roasted Vegetable Bowl', favorited: true }, { name: 'Grilled Portobello' }, { name: 'Tahini Dressing (VN)' }] }, { category: 'Great Greens', items: [{ name: 'White Bean Soup (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 4, categories: [{ category: 'Fired Up', items: [{ name: 'Mushroom Risotto (VN)' }, { name: 'Roasted Asparagus (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Tomato Basil Soup (VN)' }, { name: 'Build Your Own Salad' }] }] } } },
        [D3]: { status: 'open', hours: 'Closes 8:00 PM', aiPickLabel: 'Soup & Sandwich', aiPickName: 'Grilled Cheese & Tomato Soup', menus: { breakfast: { count: 3, categories: [{ category: 'Great Greens', items: [{ name: 'Granola (VN)' }, { name: 'Banana' }, { name: 'Yogurt Parfait' }] }] }, lunch: { count: 5, categories: [{ category: 'Delicious', items: [{ name: 'Grilled Cheese', favorited: true }, { name: 'BLT Sandwich' }, { name: 'Tomato Soup (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Minestrone Soup (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 4, categories: [{ category: 'Fired Up', items: [{ name: 'Baked Mac & Cheese' }, { name: 'Roasted Tomatoes (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Lentil Soup (VN)' }, { name: 'Build Your Own Salad' }] }] } } },
        [D4]: { status: 'open', hours: 'Closes 8:00 PM', aiPickLabel: 'Weekend Brunch', aiPickName: 'Shakshuka', menus: { breakfast: { count: 5, categories: [{ category: 'Fired Up', items: [{ name: 'Shakshuka', favorited: true }, { name: 'Avocado Toast (VN)' }, { name: 'Fresh Squeezed OJ (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Fresh Fruit Bowl (VN)' }, { name: 'Granola (VN)' }] }] }, lunch: { count: 5, categories: [{ category: 'Delicious', items: [{ name: 'Veggie Wrap (VN)' }, { name: 'Caprese Sandwich' }, { name: 'Pesto Pasta (VN)' }] }, { category: 'Great Greens', items: [{ name: 'Gazpacho (VN)' }, { name: 'Build Your Own Salad' }] }] }, dinner: { count: 4, categories: [{ category: 'Fired Up', items: [{ name: 'Vegetable Paella (VN)' }, { name: 'Patatas Bravas (VN)' }] }, { category: 'Great Greens', items: [{ name: 'White Bean Soup (VN)' }, { name: 'Build Your Own Salad' }] }] } } },
        },
    },
];