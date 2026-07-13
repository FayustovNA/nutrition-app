import { computeLinearTrend, TrendPoint } from './linearTrend';
import { getFatSecretDiary } from '../api/fatsecret';

const DAY_MS = 24 * 60 * 60 * 1000;
const WEIGHT_WINDOW_DAYS = 30;
const TARGET_WINDOW_DAYS = 30;
const LAST_DAYS_COUNT = 5;

const MEAL_TRANSLATIONS: Record<string, string> = {
    Breakfast: 'Завтрак',
    Lunch: 'Обед',
    Dinner: 'Ужин',
    Other: 'Перекус',
};

export interface DiaryEntryLike {
    date: string;
    calories_actual?: number;
    calories_target?: number;
    protein_actual?: number;
    protein_target?: number;
    fat_actual?: number;
    fat_target?: number;
    carbohydrate_actual?: number;
    carbohydrate_target?: number;
    weight_actual?: number;
}

export interface AiFoodItem {
    name: string;
    meal: string;
    calories: number;
    protein: number;
    fat: number;
    carbohydrate: number;
    units: number;
}

export interface AiDayWithFoods {
    date: string;
    caloriesActual: number;
    caloriesTarget: number;
    proteinActual: number;
    proteinTarget: number;
    fatActual: number;
    fatTarget: number;
    carbsActual: number;
    carbsTarget: number;
    weightActual: number | null;
    // null означает, что запрос состава дневника за этот день не удался
    foods: AiFoodItem[] | null;
}

export interface AiWeightDynamics {
    rangeDays: number;
    pointsCount: number;
    startWeight: number | null;
    endWeight: number | null;
    deltaKg: number | null;
    weeklyRateKg: number | null;
}

export interface AiTargetAverages {
    calories: number;
    protein: number;
    fat: number;
    carbohydrate: number;
}

export interface AiDiaryContext {
    lastDays: AiDayWithFoods[];
    weightDynamics: AiWeightDynamics;
    targetAverages: AiTargetAverages;
}

function pickLastDaysWithFood(statsData: DiaryEntryLike[], count: number): DiaryEntryLike[] {
    return [...statsData]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .filter((item) => (item.calories_actual || 0) > 0)
        .slice(-count);
}

// Тот же запрос, что уходит при клике на карточку дневника (GET /fatsecret/foods_daily/) —
// тянет реальный состав дня (конкретные продукты), а не только сводные цифры.
async function fetchFoodsForDay(date: string, username: string): Promise<AiFoodItem[] | null> {
    try {
        const response: any = await getFatSecretDiary(date, username);
        const entries = response?.food_entries?.food_entry;
        if (!Array.isArray(entries)) return null;

        return entries.map((entry: any) => ({
            name: entry.food_entry_name,
            meal: MEAL_TRANSLATIONS[entry.meal] || entry.meal,
            calories: Math.round(parseFloat(entry.calories || '0')),
            protein: Math.round(parseFloat(entry.protein || '0')),
            fat: Math.round(parseFloat(entry.fat || '0')),
            carbohydrate: Math.round(parseFloat(entry.carbohydrate || '0')),
            units: parseFloat(entry.number_of_units || '0'),
        }));
    } catch (error) {
        console.error(`Не удалось загрузить состав дневника за ${date}:`, error);
        return null;
    }
}

// Собирает контекст для AI-помощника: состав дневника (конкретные продукты) за последние
// N дней — по одному запросу на день, как при открытии карточки дневника, — плюс динамика
// веса и средний план КБЖУ за месяц (эти два блока уже есть в statsData, без доп. запросов).
// Это тот же payload, который в будущем уйдёт агенту в мета-промт.
export async function buildAiDiaryContext(statsData: DiaryEntryLike[], username: string): Promise<AiDiaryContext> {
    const sorted = [...statsData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const lastDaysBase = pickLastDaysWithFood(statsData, LAST_DAYS_COUNT);
    const lastDays: AiDayWithFoods[] = await Promise.all(
        lastDaysBase.map(async (item) => ({
            date: item.date,
            caloriesActual: Math.round(item.calories_actual || 0),
            caloriesTarget: Math.round(item.calories_target || 0),
            proteinActual: Math.round(item.protein_actual || 0),
            proteinTarget: Math.round(item.protein_target || 0),
            fatActual: Math.round(item.fat_actual || 0),
            fatTarget: Math.round(item.fat_target || 0),
            carbsActual: Math.round(item.carbohydrate_actual || 0),
            carbsTarget: Math.round(item.carbohydrate_target || 0),
            weightActual: item.weight_actual && item.weight_actual > 0 ? item.weight_actual : null,
            foods: await fetchFoodsForDay(item.date, username),
        }))
    );

    const now = Date.now();
    const weightWindowStart = now - WEIGHT_WINDOW_DAYS * DAY_MS;
    const weightPoints: TrendPoint[] = sorted
        .filter((item) => (item.weight_actual || 0) > 0 && new Date(item.date).getTime() >= weightWindowStart)
        .map((item) => ({ x: new Date(item.date).getTime(), y: item.weight_actual! }));

    const trend = computeLinearTrend(weightPoints);
    const startWeight = weightPoints[0]?.y ?? null;
    const endWeight = weightPoints[weightPoints.length - 1]?.y ?? null;
    const deltaKg =
        startWeight !== null && endWeight !== null ? parseFloat((endWeight - startWeight).toFixed(1)) : null;
    const weeklyRateKg = trend ? parseFloat((trend.slope * 7 * DAY_MS).toFixed(2)) : null;

    const targetWindowStart = now - TARGET_WINDOW_DAYS * DAY_MS;
    const monthEntries = sorted.filter((item) => new Date(item.date).getTime() >= targetWindowStart);
    const average = (getValue: (item: DiaryEntryLike) => number | undefined): number => {
        const values = monthEntries.map((item) => getValue(item) || 0).filter((value) => value > 0);
        if (values.length === 0) return 0;
        return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
    };

    return {
        lastDays,
        weightDynamics: {
            rangeDays: WEIGHT_WINDOW_DAYS,
            pointsCount: weightPoints.length,
            startWeight,
            endWeight,
            deltaKg,
            weeklyRateKg,
        },
        targetAverages: {
            calories: average((item) => item.calories_target),
            protein: average((item) => item.protein_target),
            fat: average((item) => item.fat_target),
            carbohydrate: average((item) => item.carbohydrate_target),
        },
    };
}
