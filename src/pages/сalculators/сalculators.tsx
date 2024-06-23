import styles from './calculators.module.css'
import { FatСalculator } from '../../components/calculators/fat-calculator/fat-calculator'
import { BMRСalculator } from '../../components/calculators/bmr-calculator/bmr-calculator';

export const Сalculators = () => {
    return (
        <div className={styles.content}>
            <h1 className={styles.title}>
                Полезные калькуляторы
            </h1>
            <div className={styles.grid}>
                <FatСalculator />
                <BMRСalculator />
            </div>
        </div>
    );
};
