import styles from './fat-calculator.module.css'
import Checkbox from '../../../ui/checkbox/checkbox'
import useForm from '../../../hooks/useForm'
import Input from '../../../ui/inputs/input'
import Button from '../../../ui/button/button'
import { useState } from 'react'
import { statusGender } from '../../../utils/mock-user-status'

export const FatСalculator = () => {

    const [resultNavy, setResultNavy] = useState(null);
    const [resultBMI, setResultBMI] = useState(null);
    const [resultFatMass, setresultFatMass] = useState(null);
    const [fatCategory, setfatCategory] = useState(null);
    const [error, setError] = useState(null);

    const { values, handleChange } = useForm({
        gender: 'Мужской',
    })

    function getFatCategory(gender: any, value: any) {
        const classFatListMale = [
            { value: 5, nameValue: 'Необходимый жир' },
            { value: 13, nameValue: 'Атлетическое телосложение' },
            { value: 17, nameValue: 'Спортивное телосложение' },
            { value: 24, nameValue: 'Обычное телосложение' },
            { value: 25, nameValue: 'Ожирение' },
        ];

        const classFatListFemale = [
            { value: 10, nameValue: 'Необходимый жир' },
            { value: 14, nameValue: 'Атлетическое телосложение' },
            { value: 21, nameValue: 'Спортивное телосложение' },
            { value: 27, nameValue: 'Обычное телосложение' },
            { value: 32, nameValue: 'Ожирение' },
        ];

        const classFatList = gender === 'Мужской' ? classFatListMale : classFatListFemale;

        for (let i = 0; i < classFatList.length; i++) {
            if (value <= classFatList[i].value) {
                return classFatList[i].nameValue;
            }
        } return classFatList[classFatList.length - 1].nameValue;
    }


    const calculateFatPercentage = () => {
        const log10 = (value: number) => Math.log10(value);

        if (
            values.gender &&
            values.waist !== undefined &&
            values.age !== undefined &&
            values.neck !== undefined &&
            values.height !== undefined &&
            values.weight !== undefined &&
            (values.gender === 'Мужской' || (values.gender === 'Женский' && values.hips !== undefined))
        ) {
            let fatPercentageNavy: any;
            let fatPercentageBMI: any;
            if (values.gender === 'Мужской') {
                fatPercentageNavy = 495 / (1.0324 - 0.19077 * log10(values.waist - values.neck) + 0.15456 * log10(values.height)) - 450;
                fatPercentageBMI = (1.2 * (values.weight / (values.height / 100 * values.height / 100))) + 0.23 * values.age - 16.2;
            } else {
                fatPercentageNavy = 495 / (1.29579 - 0.35004 * log10(Number(values.waist) + Number(values.hips!) - Number(values.neck)) + 0.22100 * log10(Number(values.height))) - 450;
                fatPercentageBMI = (1.2 * (values.weight / (values.height / 100 * values.height / 100))) + 0.23 * values.age - 5.4;
            }

            if (fatPercentageNavy > 0 && fatPercentageBMI > 0) {
                const fatCat: any = getFatCategory(values.gender, fatPercentageNavy)
                setfatCategory(fatCat)
                setResultBMI(fatPercentageBMI.toFixed(2))
                setResultNavy(fatPercentageNavy.toFixed(2));
                const resultFatMass: any = values.weight * fatPercentageNavy / 100;
                setresultFatMass(resultFatMass.toFixed(2))
            }

        } else {
            const error: any = 'Некоторые значения отсутствуют или введены некорректные данные!'
            setError(error)
            setResultNavy(null);
            setResultBMI(null);
            setresultFatMass(null);
        }
    };


    return (
        <div className={styles.calculator}>
            <h2 className={styles.subtitle}>Рассчитай свой процент жира</h2>

            <div className={styles.workspace}>
                <div className={styles.data}>
                    <div className={styles.step}>
                        <h4 className={styles.h4}>Выберите ваш пол</h4>
                        <div className={styles.checkboxes}>
                            {statusGender.map((item) => {
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
                <div className={styles.results}>
                    <h3 className={styles.h3}>Ваш результат</h3>
                    {error ? (
                        <div className={styles.error}>{error}</div>
                    ) : resultNavy ?
                        <div>
                            <div className={styles.item}>
                                <h4 className={styles.h4}>Процент жира в теле</h4>
                                <div className={styles.table}>
                                    <div className={styles.result}>
                                        <p className={styles.h5}>Метод US Navy [более точный]</p>
                                        <div className={styles.unit}>{resultNavy} %</div>
                                    </div>
                                    <div className={styles.result}>
                                        <p className={styles.h5}>Метод BMI [менее точный]</p>
                                        <div className={styles.unit}>{resultBMI} %</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <h4 className={styles.h4}>Масса жира в теле</h4>
                                <div className={styles.result}>
                                    <div className={styles.unit}>{resultFatMass} kg</div>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <h4 className={styles.h4}>Ваша категория</h4>
                                <div className={styles.result}>
                                    <div className={styles.unit_last}>{fatCategory}</div>
                                </div>
                            </div>

                        </div> : <div className={styles.error}>Введите данные и нажмите рассчитать</div>}
                </div>
            </div>
        </div>

    );
};