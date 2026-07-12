export interface TrendPoint {
    x: number;
    y: number;
}

export interface LinearTrend {
    slope: number;
    intercept: number;
}

// Линейная регрессия методом наименьших квадратов.
// Возвращает null, если данных недостаточно (меньше 2 точек или все точки на одной дате).
export function computeLinearTrend(points: TrendPoint[]): LinearTrend | null {
    const n = points.length;
    if (n < 2) return null;

    const sumX = points.reduce((sum, p) => sum + p.x, 0);
    const sumY = points.reduce((sum, p) => sum + p.y, 0);
    const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
    const sumXX = points.reduce((sum, p) => sum + p.x * p.x, 0);

    const denominator = n * sumXX - sumX * sumX;
    if (denominator === 0) return null;

    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
}

export const predictTrendY = (trend: LinearTrend, x: number): number =>
    trend.slope * x + trend.intercept;

const DAY_MS = 24 * 60 * 60 * 1000;

// Прогноз значения на N дней вперёд от последней точки данных.
// forecastDays, например [30, 60, 90].
export function forecastFromTrend(
    points: TrendPoint[],
    forecastDays: number[]
): { days: number; x: number; y: number }[] | null {
    if (points.length < 2) return null;

    const trend = computeLinearTrend(points);
    if (!trend) return null;

    const lastX = Math.max(...points.map((p) => p.x));

    return forecastDays.map((days) => {
        const x = lastX + days * DAY_MS;
        return { days, x, y: predictTrendY(trend, x) };
    });
}
