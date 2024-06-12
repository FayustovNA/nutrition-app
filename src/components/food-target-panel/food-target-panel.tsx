import styles from './food-target-panel.module.css'
import TabsFilter from '../tab-filter/tab-filter'
import { RootState } from '../../services/root-reducer'
import { useState } from 'react'
import TargetItem from './item/item'
import { useSelector } from 'react-redux'

export const FoodTargetPanel = () => {
    const [activeTab, setActiveTab] = useState("Н");
    const monthData = useSelector((state: RootState) => state.fatSecretDataMonth.month.day);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    }

    const getFilteredData = () => {
        let filteredData;
        switch (activeTab) {
            case 'Н':
                filteredData = monthData.slice(-7);
                break;
            case 'M':
                filteredData = monthData.slice(-30);
                break;
            case '3M':
                filteredData = monthData.slice(-90);
                break;
            case '6M':
                filteredData = monthData.slice(-180);
                break;
            default:
                filteredData = monthData;
        }


        const reversedData = filteredData.reverse();

        const calculateAverage = (data: any, key: any, decimalPlaces: number = 0) => {
            const total = data.reduce((sum: any, item: any) => sum + parseFloat(item[key]), 0);
            const average = (total / data.length).toFixed(decimalPlaces);
            return average
        }

        const averageData = {
            day: {
                calories: {
                    fact: calculateAverage(reversedData, 'calories'),
                    target: 3489 // Пример целевого значения, замените на ваше
                },
                carbohydrate: {
                    fact: calculateAverage(reversedData, 'carbohydrate'),
                    target: 150 // Пример целевого значения, замените на ваше
                },
                fat: {
                    fact: calculateAverage(reversedData, 'fat'),
                    target: 70 // Пример целевого значения, замените на ваше
                },
                protein: {
                    fact: calculateAverage(reversedData, 'protein'),
                    target: 130 // Пример целевого значения, замените на ваше
                },
                fiber: {
                    fact: calculateAverage(reversedData, 'fiber'),
                    target: 130 // Пример целевого значения, замените на ваше
                },
                sugar: {
                    fact: calculateAverage(reversedData, 'sugar'),
                    target: 130 // Пример целевого значения, замените на ваше
                }
            }
        };

        return averageData;
    };

    type NutrientKey = 'calories' | 'carbohydrate' | 'fat' | 'protein' | 'fiber' | 'sugar';

    const averageData = getFilteredData();

    return (
        <div className={styles.content}>
            <h3 className={styles.title}>Плановые и фактические нормы</h3>
            <div className={styles.grid}>
                {Object.keys(averageData.day).map((key) => {
                    const nutrientKey = key as NutrientKey; // Приведение типа
                    const item = averageData.day[nutrientKey];
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
