import styles from './bmr-calculator.module.css'
import Checkbox from '../../../ui/checkbox/checkbox'
import useForm from '../../../hooks/useForm'
import Input from '../../../ui/inputs/input'
import Button from '../../../ui/button/button'
import { statusGender } from '../../../utils/mock-user-status'
import { useState } from 'react'


export const BMRСalculator = () => {
    const [results, setResults] = useState({ result1: null, result2: null });
    const [error, setError] = useState(null);

    const { values, handleChange } = useForm({
        genderBMI: 'Мужской',
    })

    const classEAT = [
        { value: 1.2, name: 'Отсутствие активности', description: 'Полное отсутствие физической активности либо минимальный уровень', time: '0 минут', perweek: 'занятий нет' },
        { value: 1.35, name: 'Минимальная активность', description: 'Тренировки 1-3 раза в неделю', time: '15-30 минут', perweek: '1-3 раза в неделю' },
        { value: 1.45, name: 'Легкая активность', description: 'Тренировки 4-5 раз в неделю', time: '45-60 минут', perweek: '1-3 раза в неделю' },
        { value: 1.55, name: 'Умеренная активность', description: 'Ежедневные физические упражнения или интенсивные физические упражнения 3-4 раза в неделю', time: '45-90 минут', perweek: '3-4 раза в неделю' },
        { value: 1.7, name: 'Интенсивная активность', description: 'Тренировки 6-7 раз в неделю', time: '45-90 минут', perweek: '6-7 раз в неделю' },
        { value: 1.9, name: 'Сверхинтенсивная активность', description: 'Работа, связанная с высокоинтенсивными физическими нагрузками, ежедневные и очень интенсивные тренировки, либо занятия профессиональным спортом', time: 'выше 3х часов', perweek: 'Ежедневно' },
    ];

    const calculateResults = () => {
        const { weight, height, age, genderBMI } = values;

        if (
            weight !== undefined &&
            height !== undefined &&
            age !== undefined
        ) {
            let result1: any | undefined;
            let result2: any | undefined;
            if (genderBMI === 'Мужской') {
                result1 = (10 * weight + 6.25 * height - 5 * age + 5).toFixed(1);
                result2 = (13.397 * weight + 4.799 * height - 5.677 * age + 88.362).toFixed(1);
            } else {
                result1 = (10 * weight + 6.25 * height - 5 * age - 161).toFixed(1);
                result2 = (9.247 * weight + 3.098 * height - 4.33 * age + 447.5).toFixed(1);
            }
            setResults({ result1, result2 });
        } else {
            const error: any = 'Некоторые значения отсутствуют или введены некорректные данные!'
            setError(error)
            setResults({ result1: null, result2: null });
        }
    };


    return (
        <div className={styles.calculator}>
            <h2 className={styles.subtitle}>Рассчитай свою норму калорий</h2>

            <div className={styles.workspace}>
                <div className={styles.data}>
                    <div className={styles.step}>
                        <h4 className={styles.h4}>Выберите ваш пол</h4>
                        <div className={styles.checkboxes}>
                            {statusGender.map((item) => {
                                return (
                                    <Checkbox
                                        key={item.value}
                                        name="genderBMI"
                                        label={item.nameValue}
                                        value={item.nameValue}
                                        onChange={handleChange}
                                        checked={item.nameValue === values.genderBMI}
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
                                <div className={styles.button}>
                                    <Button
                                        variant='default'
                                        size='width'
                                        buttonHtmlType='submit'
                                        onClick={calculateResults}
                                    >
                                        < p className={styles.btntxt}>Рассчитать</p>
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className={styles.results}>
                    <h3 className={styles.h3}>Ваш результат</h3>

                    {error ? (
                        <div className={styles.error}>{error}</div>
                    ) : results.result1 ?

                        <div>
                            <div>
                                <h4 className={styles.h4}>Базовый метаболизм [BMR]</h4>
                                <div className={styles.table}>
                                    <div className={styles.result}>
                                        <p className={styles.h5}>Уравнение Миффлина-Сент-Джеора</p>
                                        <div className={styles.unit}>{results.result1} ккал/день</div>
                                    </div>
                                    <div className={styles.result}>
                                        <p className={styles.h5}>Уравнение Харриса-Бенедикта</p>
                                        <div className={styles.unit}>{results.result2} ккал/день</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.kcalnorms}>
                                <h4 className={styles.h4}>Ваша норма калорий</h4>
                                <div className={styles.norms}>
                                    <div className={styles.grid_header}>
                                        <p className={styles.header}>Дневная активность</p>
                                        <p className={styles.header}>Частота занятий</p>
                                        <p className={styles.header}>Время</p>
                                        <p className={styles.header}>Ваша норма калорий</p>
                                    </div>
                                    <div className={styles.grid}>
                                        <p className={styles.item_red}>{classEAT[0].name}</p>
                                        <p className={styles.item_grid}>{classEAT[0].perweek}</p>
                                        <p className={styles.item_grid}>{classEAT[0].time}</p>
                                        <p className={styles.unit_grid}>{(results.result1 * classEAT[0].value).toFixed(1)} ккал/день</p>
                                    </div>
                                    <div className={styles.grid}>
                                        <p className={styles.item_or}>{classEAT[1].name}</p>
                                        <p className={styles.item_grid}>{classEAT[1].perweek}</p>
                                        <p className={styles.item_grid}>{classEAT[1].time}</p>
                                        <p className={styles.unit_grid}>{(results.result1 * classEAT[1].value).toFixed(1)} ккал/день</p>
                                    </div>
                                    <div className={styles.grid}>
                                        <p className={styles.item_yell}>{classEAT[2].name}</p>
                                        <p className={styles.item_grid}>{classEAT[2].perweek}</p>
                                        <p className={styles.item_grid}>{classEAT[2].time}</p>
                                        <p className={styles.unit_grid}>{(results.result1 * classEAT[2].value).toFixed(1)} ккал/день</p>
                                    </div>
                                    <div className={styles.grid}>
                                        <p className={styles.item_ocean}>{classEAT[3].name}</p>
                                        <p className={styles.item_grid}>{classEAT[3].perweek}</p>
                                        <p className={styles.item_grid}>{classEAT[3].time}</p>
                                        <p className={styles.unit_grid}>{(results.result1 * classEAT[3].value).toFixed(1)} ккал/день</p>
                                    </div>
                                    <div className={styles.grid}>
                                        <p className={styles.item_green}>{classEAT[4].name}</p>
                                        <p className={styles.item_grid}>{classEAT[4].perweek}</p>
                                        <p className={styles.item_grid}>{classEAT[4].time}</p>
                                        <p className={styles.unit_grid}>{(results.result1 * classEAT[4].value).toFixed(1)} ккал/день</p>
                                    </div>
                                    <div className={styles.grid}>
                                        <p className={styles.item_purp}>{classEAT[5].name}</p>
                                        <p className={styles.item_grid}>{classEAT[5].perweek}</p>
                                        <p className={styles.item_grid}>{classEAT[5].time}</p>
                                        <p className={styles.unit_grid}>{(results.result1 * classEAT[5].value).toFixed(1)} ккал/день</p>
                                    </div>

                                </div>
                            </div>

                            <div className={styles.kcaltarget}>
                                <h4 className={styles.h4}>Оптимальная калорийность</h4>
                                <div className={styles.table}>
                                    <div className={styles.result}>
                                        <p className={styles.h5}>Для похудения</p>
                                        <div className={styles.unit}>{(results.result1 * classEAT[3].value * 0.88).toFixed(1)} ккал/день</div>
                                    </div>
                                    <div className={styles.result}>
                                        <p className={styles.h5}>Для набора мышечной массы</p>
                                        <div className={styles.unit}>{(results.result1 * classEAT[3].value * 1.07).toFixed(1)} ккал/день</div>
                                    </div>
                                </div>
                            </div>
                        </div> : <div className={styles.error}>Введите данные и нажмите рассчитать</div>}
                </div>
            </div>
        </div>

    );
};