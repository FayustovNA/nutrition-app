// import React from 'react'
import styles from './modal-diary.module.css'

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
}

interface ModalDiaryProps {
    data: FoodEntry[];
}

const ModalDiary: React.FC<ModalDiaryProps> = ({ data }) => {
    console.log(data)
    return (
        <div className={styles.items}>
            <div className={styles.h3}>Подробное описание дневника</div>
            <div className={styles.header}>
                <div>Наименование</div>
                <div>Прием</div>
                <div>Кал.</div>
                <div>Бел.</div>
                <div>Жир.</div>
                <div>Угл.</div>
                <div>Клет.</div>
                <div>Сах.</div>
            </div>

            {data.map((item: any, index: any) => (
                <div key={index} className={styles.item}>
                    <div>{item.food_entry_name}</div>
                    <div>{item.meal}</div>
                    <div>{item.calories}</div>
                    <div>{item.protein || 'нет'}</div>
                    <div>{item.fat}</div>
                    <div>{item.carbohydrate}</div>
                    <div> {item.fiber || 'нет'}</div>
                    <div> {item.sugar || 'нет'}</div>
                </div>
            ))}
        </div>
    );
};

export default ModalDiary;