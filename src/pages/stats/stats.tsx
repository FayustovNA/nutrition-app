import styles from './stats.module.css'
import { RootState } from '../../services/root-reducer'
import { useSelector } from 'react-redux'




export const Stats = () => {
    const monthData = useSelector((state: RootState) => state.fatSecretDataMonth.month.day);
    console.log(monthData)


    return (
        <div className={styles.content}>
            <h1 className={styles.title}>
                Моя статистика
            </h1>
            <div className={styles.grid}>
                {monthData.map((item: any) => {
                    return (
                        <div>{item.calories} </div>
                    );
                })}
            </div>
        </div>
    );
};
