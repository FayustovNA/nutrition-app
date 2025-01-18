import React from 'react';
import styles from './modal-diary.module.css';

interface FoodEntry {
    calories: string;
    carbohydrate: string;
    date_int: string;
    fat: string;
    fiber?: string;
    food_entry_description?: string;
    calcium?: string;
    cholesterol?: string;
    protein?: string;
    sugar?: string;
    meal: string;
    food_entry_name: string;
}

interface ModalDiaryProps {
    data: FoodEntry[] | null;
}

const ModalDiary: React.FC<ModalDiaryProps> = ({ data }) => {

    function convertDateIntToDate(dateInt: string): string {
        const baseDate = new Date(1970, 0, 1); // 01.01.1970
        baseDate.setDate(baseDate.getDate() + parseInt(dateInt, 10));

        const day = baseDate.getDate(); // Получаем день (1-31)
        const month = (baseDate.getMonth() + 1).toString().padStart(2, '0'); // Получаем месяц (добавляем 1, чтобы получить 1-12)
        const year = baseDate.getFullYear(); // Получаем год (4 цифры)

        return `${day}-${month}-${year}`; // Формируем строку в нужном формате
    }

    const mealTranslations: { [key: string]: string } = {
        Breakfast: "Завтрак",
        Lunch: "Обед",
        Dinner: "Ужин",
        Other: "Перекус",
    };

    if (!data || data.length === 0) {
        return <div className={styles.items}>Нет данных для отображения</div>;
    }

    const date = convertDateIntToDate(data[0].date_int);

    // Группировка данных по категориям
    const groupedData = data.reduce((groups: any, item: FoodEntry) => {
        const meal = item.meal;
        if (!groups[meal]) {
            groups[meal] = {
                items: [],
                totals: { calories: 0, protein: 0, fat: 0, carbohydrate: 0 },
            };
        }

        // Добавляем текущий элемент в группу
        groups[meal].items.push(item);

        // Считаем итоговые значения для группы
        groups[meal].totals.calories += parseFloat(item.calories || "0");
        groups[meal].totals.protein += parseFloat(item.protein || "0");
        groups[meal].totals.fat += parseFloat(item.fat || "0");
        groups[meal].totals.carbohydrate += parseFloat(item.carbohydrate || "0");

        return groups;
    }, {});

    return (
        <div className={styles.content}>
            <div className={styles.h3}>
                Дневной отчет FatSecret
                <p className={styles.date}>|| {date}</p>
            </div>
            <div className={styles.list}>
                {Object.entries(groupedData).map(([meal, group]: any) => (
                    <div key={meal} className={styles.group}>

                        <div className={styles.grouptotal}>
                            <h3 className={styles.grouptitle}>{mealTranslations[meal] || meal}</h3>

                            <div className={styles.totallist}>
                                <div>К: {group.totals.calories.toFixed(1)} kcal</div>
                                <div>Б: {group.totals.protein.toFixed(1)} g</div>
                                <div>Ж: {group.totals.fat.toFixed(1)} g</div>
                                <div>У: {group.totals.carbohydrate.toFixed(1)} g</div>
                            </div>
                        </div>

                        <div className={styles.groupItems}>
                            {group.items.map((item: FoodEntry, index: number) => (
                                <div key={index} className={styles.item}>
                                    <h4 className={styles.h4}>{item.food_entry_name}</h4>

                                    <div className={styles.components}>
                                        <div className={styles.kcal}>{item.calories} kcal</div>
                                        <div className={styles.comp_item}>
                                            <p className={styles.comp_h5}>Б</p>
                                            <div className={styles.comp_value}>{item.protein || '-'} g</div>
                                        </div>
                                        <div className={styles.comp_item}>
                                            <p className={styles.comp_h5}>Ж</p>
                                            <div className={styles.comp_value}>{item.fat || '-'} g</div>
                                        </div>
                                        <div className={styles.comp_item}>
                                            <p className={styles.comp_h5}>У</p>
                                            <div className={styles.comp_value}>{item.carbohydrate} g</div>
                                        </div>
                                        <div className={styles.comp_item}>
                                            <p className={styles.comp_h5}>К</p>
                                            <div className={styles.comp_value}>{item.fiber || '-'} g</div>
                                        </div>
                                        <div className={styles.comp_item}>
                                            <p className={styles.comp_h5}>С</p>
                                            <div className={styles.comp_value}>{item.sugar || '-'} g</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModalDiary;