// Вкладки фильтра диапазона дат, общие для дневника и панели целей: неделя/месяц/3 месяца/6 месяцев
export const DATE_RANGE_DAYS: { [tab: string]: number } = {
    'Н': 7,
    'M': 30,
    '3M': 90,
    '6M': 180,
};

// Оставляет только записи не старше N дней от now (N берётся по activeTab).
// Если activeTab не входит в DATE_RANGE_DAYS — возвращает все данные без фильтрации.
export function filterByDateRange<T>(
    items: T[],
    activeTab: string,
    getDate: (item: T) => string,
    now: Date = new Date()
): T[] {
    const rangeDays = DATE_RANGE_DAYS[activeTab];
    if (!rangeDays) return items;

    return items.filter((item) => {
        const itemDate = new Date(getDate(item));
        const diffDays = (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays <= rangeDays;
    });
}
