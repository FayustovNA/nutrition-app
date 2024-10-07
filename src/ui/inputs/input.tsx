import { FC, ChangeEvent, useState } from 'react';
import styles from './input.module.css';

interface IInput {
    isInvalid?: boolean;
    placeholder?: string;
    errorMessage?: string;
    value?: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    disabled?: boolean;
    name?: string;
    minLength?: number;
    maxLength?: number;
    type?: string;
    required?: boolean;
    styled?: 'main' | 'secondary' | 'select';
    pattern?: string;
    min?: string;
    max?: string;
    options?: { first_name?: string; last_name?: string, id?: any, username?: string }[] | undefined; // Опции для select
}

const classNames = {
    main: styles.input,
    secondary: styles.inputSecondary,
    select: styles.select,
};

const Input: FC<IInput> = ({
    placeholder = 'Введите значение',
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
    options, // Если options переданы, рендерим select
}): JSX.Element => {

    const [error, setError] = useState<{ error: boolean; textError: string }>({
        error: false,
        textError: '',
    });

    const className = classNames[styled];

    // Универсальный валидатор для input и select
    const validate = (input: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

        onChange(input); // Вызываем обработчик изменений
    };

    return (
        <div className={styles.wrapper}>

            {options ? (
                // Если options переданы, рендерим select
                <select
                    className={`${className} ${error.error || isInvalid ? styles.incorrect : ''}`}
                    value={value}
                    onChange={validate} // Передаем валидатор
                    disabled={disabled}
                    name={name}
                    required={required}
                >
                    <option value='' disabled>{placeholder}</option>
                    {options.map(option => (
                        <option key={option.id} value={option.username}>
                            {option.first_name}     {option.last_name}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    className={`${className} ${error.error || isInvalid ? styles.incorrect : ''}`}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={validate} // Передаем валидатор
                    disabled={disabled}
                    name={name}
                    pattern={pattern}
                    minLength={minLength}
                    maxLength={maxLength}
                    required={required}
                    autoComplete="off"
                />
            )}

            {
                (error.error || isInvalid) && (
                    <div className={styles.incorrect_text}>
                        {error.textError}
                    </div>
                )
            }
        </div>
    );
};

export default Input;