const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// Номер недели относительно startDate (неделя 1 — та, что содержит startDate)
export const getWeekNumber = (date: string | number, startDate: string | number): number =>
    Math.floor((new Date(date).getTime() - new Date(startDate).getTime()) / WEEK_MS) + 1;

export interface WeeklyAverage {
    week: string;
    avgActual: number;
    avgTarget: number;
}

export interface WeeklyAveragesConfig<T> {
    getDate: (item: T) => string;
    getActual: (item: T) => number;
    // Опционально: если метрика без плана (например вес), можно не передавать — план всегда будет 0
    getTarget?: (item: T) => number;
    weeksToKeep?: number;
    // Способ округления среднего (калории/белок — до целого, вес — до десятых)
    round?: (value: number) => number;
}

// Группирует statsData по неделям от startDate, усредняет actual/target по каждой неделе,
// оставляет последние weeksToKeep недель и дополняет двумя будущими неделями с нулевыми значениями.
export function getWeeklyAverages<T>(
    statsData: T[],
    startDate: string | undefined,
    { getDate, getActual, getTarget, weeksToKeep = 9, round = Math.round }: WeeklyAveragesConfig<T>
): WeeklyAverage[] {
    if (!startDate) return [];

    const groupedByWeek: { [week: string]: { actual: number[]; target: number[] } } = {};

    statsData.forEach((item) => {
        const weekKey = `W ${getWeekNumber(getDate(item), startDate)}`;

        if (!groupedByWeek[weekKey]) {
            groupedByWeek[weekKey] = { actual: [], target: [] };
        }

        const actualValue = getActual(item);
        const targetValue = getTarget ? getTarget(item) : 0;
        if (actualValue > 0) groupedByWeek[weekKey].actual.push(actualValue);
        if (targetValue > 0) groupedByWeek[weekKey].target.push(targetValue);
    });

    const sortedWeeks = Object.keys(groupedByWeek)
        .map((week) => {
            const { actual, target } = groupedByWeek[week];

            const avgActual = actual.length
                ? round(actual.reduce((sum, val) => sum + val, 0) / actual.length)
                : 0;
            const avgTarget = target.length
                ? round(target.reduce((sum, val) => sum + val, 0) / target.length)
                : 0;

            return { week, avgActual, avgTarget };
        })
        .sort((a, b) => parseInt(a.week.split(' ')[1], 10) - parseInt(b.week.split(' ')[1], 10));

    const recentWeeks = sortedWeeks.slice(-weeksToKeep);

    // Добавим 2 будущие недели
    let lastWeekNumber = 0;
    if (recentWeeks.length > 0) {
        lastWeekNumber = parseInt(recentWeeks[recentWeeks.length - 1].week.split(' ')[1], 10);
    }

    for (let i = 1; i <= 2; i++) {
        recentWeeks.push({
            week: `W ${lastWeekNumber + i}`,
            avgActual: 0,
            avgTarget: 0,
        });
    }

    return recentWeeks;
}
