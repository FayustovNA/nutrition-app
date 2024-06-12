import styles from './calculators.module.css'
import Checkbox from '../../ui/checkbox/checkbox'
import useForm from '../../hooks/useForm';

export const statusList = [
    { value: 'male', nameValue: 'Мужской' },
    { value: 'female', nameValue: 'Женский' },
]

export const Сalculators = () => {

    const { values, handleChange } = useForm({
        gender: '',
    })


    return (
        <div className={styles.content}>
            <h1 className={styles.title}>
                Полезные калькуляторы
            </h1>
            <div className={styles.grid}>
                <div className={styles.calculator}>
                    <h2 className={styles.subtitle}>Рассчитай свой процент жира</h2>

                    <div className={styles.workspace}>

                        <div className={styles.data}>
                            <div className={styles.checkboxes}>
                                {statusList.map((item) => {
                                    return (
                                        <Checkbox
                                            key={item.value}
                                            name="gender"
                                            label={item.nameValue}
                                            value={item.nameValue}
                                            onChange={handleChange}
                                            checked={item.nameValue === values.gender}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className={styles.result}>
                        </div>
                    </div>
                </div>


                <div className={styles.calculator}>
                    <h2 className={styles.subtitle}>Рассчитай базовый уровень метаболизма</h2>

                </div>
                <div className={styles.calculator}>
                    <h2 className={styles.subtitle}>Рассчитай норму белка</h2>

                </div>
            </div>
        </div>
    );
};
