import React from 'react';
import styles from './top-foodlist.module.css';

interface FoodEntry {
    calories: string;
    carbohydrate: string;
    fat: string;
    fiber?: string;
    protein?: string;
    sugar?: string;
    category?: string;
}

interface TopFoodListProps {
    data: {
        [food: string]: FoodEntry;
    };
    category: any;
}

const TopFoodList: React.FC<TopFoodListProps> = ({ data, category }) => {

    // Переводим категории на русский 
    const titleTranslations: { [key: string]: string } = {
        calories: 'Калории',
        protein: 'Белки',
        fat: 'Жиры',
        carbohydrate: 'Углеводы',
        fiber: 'Клетчатка',
        sugar: 'Сахар',
    };
    const translatedTitle = category ? titleTranslations[category] || category : '';

    // Проверяем наличии данных
    if (!data || Object.keys(data).length === 0) {
        return <div className={styles.items}>Нет данных для отображения</div>;
    }

    return (
        <div className={styles.content}>
            <div className={styles.h3}>
                Top-10 продуктов за неделю
                <p className={styles.title}>|| Категория: {translatedTitle}</p>
            </div>
            <div className={styles.list}>
                {Object.entries(data).map(([foodName, item], index) => (
                    <div key={index} className={styles.item}>
                        <h4 className={styles.h4}>{foodName}</h4>

                        <div className={styles.components}>
                            <div className={styles.kcal}>{item.calories} kcal</div>
                            <div className={styles.comp_item}>
                                <p className={styles.comp_h5}>Белки</p>
                                <div className={styles.comp_value}>{item.protein || '-'} g</div>
                            </div>
                            <div className={styles.comp_item}>
                                <p className={styles.comp_h5}>Жиры</p>
                                <div className={styles.comp_value}>{item.fat || '-'} g</div>
                            </div>
                            <div className={styles.comp_item}>
                                <p className={styles.comp_h5}>Угл-ды</p>
                                <div className={styles.comp_value}>{item.carbohydrate} g</div>
                            </div>
                            <div className={styles.comp_item}>
                                <p className={styles.comp_h5}>Клет-ка</p>
                                <div className={styles.comp_value}>{item.fiber || '-'} g</div>
                            </div>
                            <div className={styles.comp_item}>
                                <p className={styles.comp_h5}>Сахар</p>
                                <div className={styles.comp_value}>{item.sugar || '-'} g</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopFoodList;