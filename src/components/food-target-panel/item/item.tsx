import React from 'react'
import styles from './item.module.css'
import Up from '../../../images/icon-status/Up.svg?react'
import Down from '../../../images/icon-status/Down.svg?react'
// import Activity from '../../../../src/images/stats/Variant=Activity.svg';

interface ItemTargetProps {
    title?: string;
    fact?: string | number;
    target?: string | number;
}

interface ItemTargetProps {
    title?: string;
    fact?: string | number;
    target?: string | number;
}

const titleTranslations: { [key: string]: string } = {
    calories: 'Калории',
    protein: 'Белки',
    fat: 'Жиры',
    carbohydrate: 'Углеводы',
    fiber: 'Клетчатка',
    sugar: 'Сахар',
    // добавьте другие переводы по мере необходимости
};


const TargetItem: React.FC<ItemTargetProps> = ({ title, fact, target }) => {
    const translatedTitle = title ? titleTranslations[title] || title : '';

    return (
        <div className={styles.item}>
            {/* <img src={Activity} alt="" className={styles.icon} /> */}
            <h4 className={styles.title}>{translatedTitle}
            </h4>
            <div className={styles.units}>
                <div className={styles.fact}>{fact}</div>

                <div className={styles.target}>
                    <p className={styles.subtitle}>План</p>
                    <div className={styles.value}>
                        {target}
                        {title == 'calories' ? <p className={styles.un}>kcal</p> : <p className={styles.un}>g</p>}
                    </div>
                </div>
            </div>
            {Number(target || 0) > Number(fact || 0) ? <p className={styles.stat}><Down /></p> : <p className={styles.stat}><Up /></p>}
        </div >
    );
};

export default TargetItem;
