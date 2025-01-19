import { FormEvent } from 'react'
import styles from './set-password.module.css'
import useForm from '../../hooks/useForm'
import { Link } from 'react-router-dom'
import { Footer } from '../../components/footer/footer'
import { useSearchParams, useNavigate } from 'react-router-dom';
import Input from '../../ui/inputs/input'
import Button from '../../ui/button/button'
import { useState } from 'react'
import { Loader } from '../../components/loader/loader'
import { setNewPassword } from '../../api/auth'

const SetPassword = () => {
    const [searchParams] = useSearchParams(); // Для получения параметров из URL
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Для перенаправления пользователя

    // Извлечение uid и token из URL
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    const { values, handleChange } = useForm({
        new_password: '',
        re_new_password: '',
    })



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!uid || !token) {
            setError('Не удалось извлечь параметры активации из URL.');
            return;
        }

        if (values.new_password !== values.re_new_password) {
            setError('Пароли не совпадают. Пожалуйста, проверьте и повторите ввод.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await setNewPassword({
                uid,
                token,
                new_password: values.new_password,
                re_new_password: values.re_new_password,
            });
            alert('Пароль успешно изменён!');
            navigate('/login'); // Перенаправление при успешной активации
        } catch (error: any) {
            setError(error.message || 'Произошла ошибка при изменении пароля.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }


    return (
        <div className={styles.content}>
            <h2 className={styles.title}>
                <span>Сброс и обновление пароля</span>
            </h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    placeholder="Введите новый пароль"
                    name="new_password"
                    styled="main"
                    onChange={handleChange}
                    value={values.new_password}
                    type="password"
                    minLength={8}
                    maxLength={30}
                    required
                />
                <Input
                    placeholder="Подтвердите новый пароль"
                    name="re_new_password"
                    styled="main"
                    onChange={handleChange}
                    value={values.re_new_password}
                    type="password"
                    minLength={8}
                    maxLength={30}
                    required
                />
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.button}>
                    <Button
                        variant='default'
                        size='large'
                        buttonHtmlType='submit'
                    >
                        < p className={styles.btntxt}>Сохранить</p>
                    </Button>
                </div>
            </form >

            <div className={styles.links_block}>
                <p className={styles.text}>
                    Вспомнили пароль?
                    <Link className={styles.link} to='/login'>
                        {' '}
                        Войти
                    </Link>
                </p>
            </div>
            <Footer />
        </div >
    )
}

export default SetPassword