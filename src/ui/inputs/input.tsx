import { FC, ChangeEvent, useState, useEffect } from 'react';
import styles from './input.module.css';

interface IInput {
    isInvalid?: boolean;
    placeholder?: string;
    errorMessage?: string;
    value?: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    name?: string;
    minLength?: number;
    maxLength?: number;
    type?: string;
    required?: boolean;
    styled?: 'main' | 'secondary';
    pattern?: string;
    min?: string;
    max?: string;
}

const classNames = {
    main: styles.input,
    secondary: styles.inputSecondary,
};

const Input: FC<IInput> = ({
    placeholder = 'Введите ключ доступа',
    isInvalid,
    errorMessage = 'Вы ввели неправильное значение',
    value,
    onChange,
    disabled,
    name,
    minLength = 2,
    maxLength,
    type = 'text',
    required,
    styled = 'main',
    pattern,
    min,
    max,
}): JSX.Element => {

    const [error, setError] = useState<{ error: boolean; textError: string }>({
        error: false,
        textError: '',
    });

    const [typeValues, setTypeValues] = useState<string>('');

    useEffect(() => {
        setTypeValues(type);
    }, [type]);


    const className = classNames[styled];

    const validate = (input: ChangeEvent<HTMLInputElement>) => {
        const validityState = input.currentTarget.validity;
        if (validityState.valueMissing) {
            setError({ error: true, textError: 'Это поле обязательно' });
        } else if (validityState.patternMismatch) {
            setError({ error: true, textError: errorMessage });
        } else if (validityState.tooLong) {
            setError({
                error: true,
                textError: `Максимум ${maxLength} символов`,
            });
        } else if (validityState.tooShort) {
            setError({
                error: true,
                textError: `Минимум ${minLength} символа`,
            });
        } else if (validityState.typeMismatch) {
            setError({
                error: true,
                textError: 'Неверный тип данных',
            });
        } else if (isInvalid) {
            setError({
                error: true,
                textError: errorMessage,
            });
        } else {
            setError({ error: false, textError: '' });
        }
        if (min && Number(input.target.value) < Number(min)) {
            input.target.value = min;
            if (input.target.value === '0') {
                input.target.value = '';
            }
        }
        if (max && Number(input.target.value) > Number(max)) {
            input.target.value = max;
        }
        onChange(input);
    };

    return (
        <div className={styles.wrapper}>

            <input
                className={`${className} ${error.error || isInvalid ? styles.incorrect : ''}`}
                type={typeValues || 'text'}
                placeholder={placeholder}
                value={value}
                onChange={validate}
                disabled={disabled}
                name={name}
                pattern={pattern}
                minLength={minLength}
                maxLength={maxLength}
                required={required}
                autoComplete='off'
            />

            {
                (error.error || isInvalid) && (
                    <div className={styles.incorrect_text}>
                        {error.textError}
                    </div>
                )
            }
        </div >
    );
};

export default Input;
