import styles from './calculators.module.css'
import Checkbox from '../../ui/checkbox/checkbox'
import useForm from '../../hooks/useForm'
import Input from '../../ui/inputs/input'
import Button from '../../ui/button/button'

export const statusList = [
    { value: 'male', nameValue: 'Мужской' },
    { value: 'female', nameValue: 'Женский' },
]

export const Сalculators = () => {

    const { values, handleChange } = useForm({
        gender: 'Мужской',
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
                            <div className={styles.step}>
                                <h4 className={styles.h4}>Выберите ваш пол</h4>
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
                                <div className={styles.step}>
                                    <h4 className={styles.h4}>Введите антропометрические данные</h4>
                                    <div className={styles.inputs}>

                                        <Input
                                            placeholder="Текущий вес, кг"
                                            type="number"
                                            name="weight"
                                            styled="main"
                                            onChange={handleChange}
                                            value={values.weight}
                                            minLength={1}
                                            maxLength={5}
                                            required
                                        />
                                        <Input
                                            placeholder="Рост, см"
                                            type="number"
                                            name="height"
                                            styled="main"
                                            onChange={handleChange}
                                            value={values.height}
                                            minLength={1}
                                            maxLength={5}
                                            required
                                        />
                                        <Input
                                            placeholder="Обхват талии, см"
                                            name="waist"
                                            type="number"
                                            styled="main"
                                            onChange={handleChange}
                                            value={values.waist}
                                            minLength={1}
                                            maxLength={5}
                                            required
                                        />
                                        <Input
                                            placeholder="Обхват шеи, см"
                                            name="neck"
                                            type="number"
                                            styled="main"
                                            onChange={handleChange}
                                            value={values.neck}
                                            minLength={1}
                                            maxLength={5}
                                            required
                                        />
                                        {values.gender == 'Женский' ? <Input
                                            placeholder="Обхват бёдер в самой широкой части, см"
                                            name="hips"
                                            type="number"
                                            styled="main"
                                            onChange={handleChange}
                                            value={values.hips}
                                            minLength={1}
                                            maxLength={5}
                                            required
                                        /> : null}
                                        <div className={styles.button}>
                                            <Button
                                                variant='default'
                                                size='width'
                                                buttonHtmlType='submit'
                                            >
                                                < p className={styles.btntxt}>Рассчитать</p>
                                            </Button>
                                        </div>
                                    </div>

                                </div>
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
