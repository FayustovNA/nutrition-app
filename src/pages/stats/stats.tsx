import styles from './stats.module.css'
import { DiaryPanel } from '../../components/diary-panel/diary-panel'
import { FoodTargetPanel } from '../../components/food-target-panel/food-target-panel'
import WeekWeightPanel from '../../components/week-weight-panel/week-weight-panel';



export const Stats = () => {


    return (
        <div className={styles.content}>
            <h1 className={styles.title}>
                Моя статистика
            </h1>
            <div className={styles.grid}>
                <DiaryPanel />
                <FoodTargetPanel />
            </div>
            <WeekWeightPanel />
        </div>
    );
};
