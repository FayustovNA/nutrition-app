import styles from './calculators.module.css'
import Checkbox from '../../ui/checkbox/checkbox'
import useForm from '../../hooks/useForm'
import Input from '../../ui/inputs/input'
import Button from '../../ui/button/button'
import { useState } from 'react'

export const statusList = [
    { value: 'male', nameValue: 'Мужской' },
    { value: 'female', nameValue: 'Женский' },
]
export const Сalculators = () => {

    const [result, setResult] = useState(null);

    const { values, handleChange } = useForm({
        gender: 'Мужской',
    })


    const calculateFatPercentage = () => {
        const log10 = (value: number) => Math.log10(value);

        if (
            values.gender &&
            values.waist !== undefined &&
            values.age !== undefined &&
            values.neck !== undefined &&
            values.height !== undefined &&
            (values.gender === 'Мужской' || (values.gender === 'Женский' && values.hips !== undefined))
        ) {
            let fatPercentage: any;
            if (values.gender === 'Мужской') {
                fatPercentage = 495 / (1.0324 - 0.19077 * log10(values.waist - values.neck) + 0.15456 * log10(values.height)) - 450;
            } else {
                fatPercentage = 495 / (1.29579 - 0.35004 * log10(Number(values.waist) + Number(values.hips!) - Number(values.neck)) + 0.22100 * log10(Number(values.height))) - 450;
            }
            setResult(fatPercentage.toFixed(2));
        } else {
            console.error('Некоторые значения отсутствуют или не определены.');
            setResult(null);
        }
    };


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
                                        <Input
                                            placeholder="Возраст"
                                            name="age"
                                            type="number"
                                            styled="main"
                                            onChange={handleChange}
                                            value={values.age}
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
                                        /> : null}
                                        <div className={styles.button}>
                                            <Button
                                                variant='default'
                                                size='width'
                                                buttonHtmlType='submit'
                                                onClick={calculateFatPercentage}
                                            >
                                                < p className={styles.btntxt}>Рассчитать</p>
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className={styles.result}>
                            <h3 className={styles.h3}>Ваш результат</h3>
                            <div className={styles.fat}>{result}</div>
                            <div className={styles.fatmass}></div>
                            <div className={styles.mass}></div>
                            <div className={styles.norms}></div>
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
