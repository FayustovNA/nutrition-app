import React from 'react'
import styles from './item.module.css'

interface ItemDiaryProps {
    calories: string;
    carbohydrate: string;
    date: string;
    fat: string;
    protein: string;
    onclick: () => void;
}

const ItemDiary: React.FC<ItemDiaryProps> = ({ calories, carbohydrate, date, fat, protein, onclick }) => {


    return (
        <div className={styles.item} onClick={onclick}>
            <h3 className={styles.date}>{date} || Дневной отчет</h3>
            <ul className={styles.macros}>
                <div className={styles.kcal_}>
                    <li className={styles.kcal}>{calories}  kcal</li>
                </div>
                <div className={styles.pcf}>
                    <li className={styles.list}><h5 className={styles.h5}>Белок</h5>{protein} g</li>
                    <li className={styles.list}><h5 className={styles.h5}>Жиры</h5>{fat} g</li>
                    <li className={styles.list}><h5 className={styles.h5}>Углеводы</h5>{carbohydrate} g</li>
                </div>
            </ul>
        </div >
    );
};

export default ItemDiary;
