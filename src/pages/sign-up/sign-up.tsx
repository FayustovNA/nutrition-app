import { FormEvent } from 'react'
import styles from './sign-up.module.css'
import useForm from '../../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../../components/footer/footer'
import { useDispatch } from '../../services/hooks'
import Input from '../../ui/inputs/input'
import Button from '../../ui/button/button'
import Login from '../../images/login.svg?react'
import { registerUser } from '../../services/slices/registerSlice'
import Checkbox from '../../ui/checkbox/checkbox'
import { statusList } from '../../utils/mock-user-status'
import { useState } from 'react'

const SignUp = () => {
    const [error, setError] = useState<Record<string, string[]>>({});

    const { values, handleChange } = useForm({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        role: '', // храним роль
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkSignUpValidity = (): boolean => {
        return (
            !!values.first_name &&
            !!values.last_name &&
            !!values.email &&
            !!values.username &&
            !!values.role &&
            !!values.password &&
            !!values.confirmPassword
        )
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Проверка на заполненность полей
        if (!checkSignUpValidity()) {
            setError({ form: ['Нужно заполнить все данные.'] });
            return;
        }

        // Проверка на совпадение паролей
        if (values.password !== values.confirmPassword) {
            setError({ confirmPassword: ['Пароли не совпадают.'] });
            return;
        }

        try {
            // Отправка данных на сервер
            const result = await dispatch(registerUser(values)).unwrap();

            // Лог для отладки успешного результата
            console.log('Регистрация успешна:', result);

            // Перенаправление на страницу логина
            navigate('/login');
        } catch (error: any) {
            // Лог ошибки для отладки
            console.error('Ошибка регистрации:', error);

            // Установка ошибок сервера
            if (error && typeof error === 'object') {
                setError(error);
            } else {
                setError({ form: ['Неизвестная ошибка. Попробуйте позже.'] });
            }
        }
    };

    const renderErrorMessages = (field: string) => {
        if (error[field]) {
            return error[field].map((message, index) => (
                <div key={index} className={styles.error}>
                    {message}
                </div>
            ));
        }
        return null;
    };

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>
                <span>Создание BlackFox ID</span>
            </h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    placeholder="Имя"
                    name="first_name"
                    styled="main"
                    type="text"
                    onChange={handleChange}
                    value={values.first_name}
                    minLength={2}
                    errorMessage="Введите имя"
                    required
                />
                <Input
                    placeholder="Фамилия"
                    name="last_name"
                    styled="main"
                    type="text"
                    onChange={handleChange}
                    value={values.last_name}
                    minLength={2}
                    errorMessage="Введите фамилию"
                    required
                />

                <Input
                    placeholder="Ваше уникальное имя"
                    name="username"
                    styled="main"
                    type="text"
                    onChange={handleChange}
                    value={values.username}
                    maxLength={30}
                    errorMessage="Введите уникальное имя"
                    required
                />
                {renderErrorMessages('username')}

                <Input
                    placeholder="E-mail"
                    name="email"
                    styled="main"
                    onChange={handleChange}
                    value={values.email}
                    pattern="^\S+@\S+\.\S+$"
                    maxLength={30}
                    errorMessage="Введите корректный email"
                    required
                />
                {renderErrorMessages('email')}

                <div className={styles.role}>Вы регистрируетесь как?</div>
                <div className={styles.checkboxes}>
                    {statusList.map((item) => {
                        return (
                            <Checkbox
                                key={item.value}
                                name="role"
                                label={item.nameValue}
                                value={item.value}
                                onChange={handleChange}
                                checked={item.value === values.role} // правильно проверяем, совпадает ли роль
                            />
                        );
                    })}
                </div>
                <Input
                    placeholder="Пароль"
                    name="password"
                    styled="main"
                    onChange={handleChange}
                    value={values.password}
                    type="password"
                    minLength={8}
                    maxLength={30}
                    required
                />
                {renderErrorMessages('password')}

                <Input
                    placeholder="Подтвердите пароль"
                    name='confirmPassword'
                    styled="main"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    type="password"
                    minLength={8}
                    maxLength={30}
                    required
                />
                {renderErrorMessages('confirmPassword')}

                <div className={styles.button}>
                    <Button
                        variant='default'
                        size='large'
                        buttonHtmlType='submit'
                    >
                        < p className={styles.btntxt}> Зарегистрироваться</p>
                    </Button>
                </div>
            </form >

            <div className={styles.links_block}>
                <span className={styles.icon}><Login /></span>
            </div>
            <Footer />
        </div >
    )
}

export default SignUp