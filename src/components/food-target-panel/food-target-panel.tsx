import styles from './food-target-panel.module.css'
import TabsFilter from '../tab-filter/tab-filter'
import { useState } from 'react'
import TargetItem from './item/item'
import { getTopFoodListWeek } from '../../api/userstats'
import { Loader } from '../loader/loader'
import Modal from '../modal/modal'
import TopFoodList from './modal/top-foodlist'
import GPT from '../../images/icon-status/GPT.svg?react'
// import { getFoodRecommendations } from '../../api/gpt'

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
    statsData: StatsDataItem[]
    user: any; // Переданный массив данных
}

interface FoodStats {
    calories: number;
    protein: number;
    fiber: number;
    carbohydrate: number;
    fat: number;
    sugar: number;
}


export const FoodTargetPanel: React.FC<FoodTargetPanelProps> = ({ statsData, user }) => {
    const [activeTab, setActiveTab] = useState('Н');
    const [loading, setLoading] = useState(false);
    const [isOpenModal, setisOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [listData, setListData] = useState(null);
    const [recommendations, setRecommendations] = useState<string | null>(null);


    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleCloseModal = () => {
        setisOpenModal(false)
        setListData(null);
        setSelectedCategory(null);
        // setRecommendations(null);
        setSelectedCategory(null);
    };

    console.log(recommendations)

    // Обработчик клика по фактическому значению
    const handleFactClick = async (title: string | undefined) => {
        setLoading(true);
        setisOpenModal(true)// Show loading spinner
        if (!title || !user) return;

        setSelectedCategory(title);

        try {
            const response: any = await getTopFoodListWeek(user);  // Fetch top food data


            if (!response || Object.keys(response).length === 0) {
                console.error('No data found');
                setLoading(false); // Скрыть загрузчик
                return;
            }
            let filteredData: any; // Initialize filteredData as an array of tuples

            // Filter top 10 foods based on the selected category
            if (title === 'calories') {
                filteredData = Object.entries(response)
                    .sort((a: any, b: any) => b[1].calories - a[1].calories)
                    .slice(0, 10);  // Top 10 highest calorie foods
            } else if (title === 'protein') {
                filteredData = Object.entries(response)
                    .sort((a: any, b: any) => b[1].protein - a[1].protein)
                    .slice(0, 10);  // Top 10 highest protein foods
            }
            else if (title === 'fiber') {
                filteredData = Object.entries(response)
                    .sort((a: any, b: any) => b[1].fiber - a[1].fiber)
                    .slice(0, 10);  // Top 10 highest protein foods
            }
            else if (title === 'carbohydrate') {
                filteredData = Object.entries(response)
                    .sort((a: any, b: any) => b[1].carbohydrate - a[1].carbohydrate)
                    .slice(0, 10);  // Top 10 highest protein foods
            }
            else if (title === 'fat') {
                filteredData = Object.entries(response)
                    .sort((a: any, b: any) => b[1].fat - a[1].fat)
                    .slice(0, 10);  // Top 10 highest protein foods
            }
            else if (title === 'sugar') {
                filteredData = Object.entries(response)
                    .sort((a: any, b: any) => b[1].sugar - a[1].sugar)
                    .slice(0, 10);  // Top 10 highest protein foods
            }

            // Transform the data for TopFoodList component
            const transformedData = filteredData.reduce((acc: any, [name, data]: [string, FoodStats]) => {
                acc[name] = {
                    calories: data.calories,
                    carbohydrate: data.carbohydrate,
                    fat: data.fat,
                    fiber: data.fiber,
                    protein: data.protein,
                    sugar: data.sugar,
                };
                return acc;
            }, {});

            setListData(transformedData);  // Set transformed data for modal
        } catch (error) {
            console.error('Error fetching top food data:', error);
        } finally {
            setLoading(false);  // Hide loader after fetching data
        }
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

    const handleGetRecommendations = async (event: any) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        console.log("Starting handleGetRecommendations...");
        setLoading(true);

        const averageData = getFilteredData();

        // Собираем дефицит для всех категорий
        const deficit: Record<string, number> = {};

        Object.entries(averageData).forEach(([category, data]) => {
            const fact = Number(data.fact);
            const target = Number(data.target);

            if (fact < target) {
                deficit[category] = target - fact; // Сохраняем дефицит для категории
            }
        });

        // Если дефицита нет ни в одной категории
        if (Object.keys(deficit).length === 0) {
            setRecommendations("Дефицита нет, корректировка не требуется.");
            setLoading(false);
            return;
        }

        try {
            console.log("Fetching recommendations for deficit:", deficit);
            const recommendations = await getFoodRecommendations(deficit);
            console.log("Recommendations received:", recommendations);
            setRecommendations(recommendations);
        } catch (error) {
            console.error("Ошибка загрузки рекомендаций:", error);
            setRecommendations("Ошибка при получении рекомендаций.");
        } finally {
            setLoading(false);
            console.log("Finished handleGetRecommendations.");
        }
    };

    return (
        <div className={styles.content}>
            <h3 className={styles.title}>Плановые и фактические нормы</h3>
            <button className={styles.gpt} onClick={handleGetRecommendations}><GPT />BFN GPT</button>
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
                            onFactClick={() => handleFactClick(nutrientKey)}
                        />
                    );
                })}
            </div>
            <div className={styles.filter}>
                <TabsFilter activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
            {
                loading ? (
                    <Loader />
                ) : (
                    <div>{recommendations}</div>
                )
            }

            {isOpenModal && (loading ? (
                <Loader />
            ) : (
                listData && (
                    <Modal onClose={handleCloseModal}>
                        <TopFoodList data={listData} category={selectedCategory} />
                    </Modal>
                )
            ))}
        </div>
    );
};