import styles from './food-target-panel.module.css'
import TabsFilter from '../tab-filter/tab-filter'
import { useState } from 'react'
import TargetItem from './item/item'

interface StatsDataItem {
    date: string;
    calories_actual: number;
    calories_target: number;
    carbohydrate_actual: number;
    carbohydrate_target: number;
    fat_actual: number;
    fat_target: number;
    fiber_actual: number;
    fiber_target: number;
    protein_actual: number;
    protein_target: number;
    sugar_actual: number;
    sugar_target: number;
}

interface FoodTargetPanelProps {
    statsData: StatsDataItem[]; // Переданный массив данных
}

export const FoodTargetPanel: React.FC<FoodTargetPanelProps> = ({ statsData }) => {
    const [activeTab, setActiveTab] = useState('Н');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const getFilteredData = () => {
        const daysLimit = {
            Н: 7,
            M: 30,
            '3M': 90,
            '6M': 180,
        }[activeTab] || statsData.length;

        // Фильтруем данные по дате и ограничению на количество дней
        const filteredData = [...statsData] // Создаем копию массива
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, daysLimit);


        // Вычисляем средние значения
        const calculateAverage = (
            data: StatsDataItem[],
            actualKey: keyof StatsDataItem,
            decimalPlaces = 0
        ) => {
            const total = data.reduce((sum, item) => {
                const value = Number(item[actualKey]) || 0;
                return sum + value;
            }, 0);
            return (total / data.length).toFixed(decimalPlaces);
        };

        return {
            calories: {
                fact: calculateAverage(filteredData, 'calories_actual'),
                target: calculateAverage(filteredData, 'calories_target'),
            },
            carbohydrate: {
                fact: calculateAverage(filteredData, 'carbohydrate_actual'),
                target: calculateAverage(filteredData, 'carbohydrate_target'),
            },
            fat: {
                fact: calculateAverage(filteredData, 'fat_actual'),
                target: calculateAverage(filteredData, 'fat_target'),
            },
            fiber: {
                fact: calculateAverage(filteredData, 'fiber_actual'),
                target: calculateAverage(filteredData, 'fiber_target'),
            },
            protein: {
                fact: calculateAverage(filteredData, 'protein_actual'),
                target: calculateAverage(filteredData, 'protein_target'),
            },
            sugar: {
                fact: calculateAverage(filteredData, 'sugar_actual'),
                target: calculateAverage(filteredData, 'sugar_target'),
            },
        };
    };




    const averageData = getFilteredData();
    type NutrientKey = keyof typeof averageData;

    return (
        <div className={styles.content}>
            <h3 className={styles.title}>Плановые и фактические нормы</h3>
            <div className={styles.grid}>
                {Object.keys(averageData).map((key) => {
                    const nutrientKey = key as NutrientKey; // Приведение типа
                    const item = averageData[nutrientKey];
                    return (
                        <TargetItem
                            key={nutrientKey}
                            title={nutrientKey}
                            fact={item.fact}
                            target={item.target}
                        />
                    );
                })}
            </div>
            <div className={styles.filter}>
                <TabsFilter activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
        </div>
    );
};
