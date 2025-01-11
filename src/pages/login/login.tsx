import { FormEvent, useState } from 'react'
import styles from './login.module.css'
import useForm from '../../hooks/useForm'
import { Link, useNavigate } from 'react-router-dom'
import { Footer } from '../../components/footer/footer'
import { useDispatch } from '../../services/hooks'
import { loginIn } from '../../services/slices/userSlice'
import Input from '../../ui/inputs/input'
import Button from '../../ui/button/button'
import Login from '../../images/login.svg?react'
// import { useAppSelector } from '../../services/store'


const LogIn = () => {
    const [error, setError] = useState('');
    const { values, handleChange } = useForm({
        email: '',
        password: '',
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         const result = await dispatch(loginIn(values)).unwrap();
    //         if (result) {
    //             navigate('/settings');
    //         }
    //     } catch (error) {
    //         const serverError = error as ServerError;
    //         const serverMessage = serverError.detail || '';
    //         setError(`Ошибка входа: проверьте ваши данные и попробуйте снова. ${serverMessage}`);
    //     }
    // };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginIn(values)).unwrap();
            if (result) {
                navigate('/settings');
            }
        } catch (error: any) {
            let serverMessage = 'Неизвестная ошибка. Попробуйте позже.';

            if (error && typeof error === 'object' && 'detail' in error) {
                serverMessage = error.detail;
            } else if (typeof error === 'string') {
                serverMessage = error;
            }

            setError(`Ошибка входа: проверьте ваши данные и попробуйте снова. ${serverMessage}`);
        }
    };

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>
                <span>Вход на платформу</span>
                <span> BlackFox Nutrition</span>
            </h2>

            <form className={styles.form} onSubmit={handleSubmit}>

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
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.button}>
                    <Button
                        variant='default'
                        size='large'
                        buttonHtmlType='submit'
                    >
                        < p className={styles.btntxt}> Войти</p>
                    </Button>
                </div>
            </form >

            <div className={styles.links_block}>
                <p className={styles.text}>
                    Вы — новый пользователь?
                    <Link className={styles.link} to='/signup'>
                        {' '}
                        Зарегистрироваться
                    </Link>
                </p>
                <p className={styles.text}>
                    Забыли пароль?{' '}
                    <Link className={styles.link} to='/forgot-password'>
                        Восстановить
                    </Link>{' '}
                </p>
                <span className={styles.icon}><Login /></span>
            </div>
            <Footer />
        </div >
    )
}

export default LogIn