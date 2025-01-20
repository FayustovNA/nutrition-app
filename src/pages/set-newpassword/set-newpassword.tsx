import { FormEvent } from 'react'
import styles from './set-newpassword.module.css'
import useForm from '../../hooks/useForm'
import { Link } from 'react-router-dom'
import { Footer } from '../../components/footer/footer'
import Input from '../../ui/inputs/input'
import Button from '../../ui/button/button'
import { useState } from 'react'
import { Loader } from '../../components/loader/loader'
import { updatePassword } from '../../api/auth'
import { useNavigate } from 'react-router-dom'

const SetNewPasswordActive = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const { values, handleChange } = useForm({
        current_password: '',
        new_password: '',
        re_new_password: '',
    })


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);
        setSuccessMessage(null);

        if (values.new_password !== values.re_new_password) {
            setError('Пароли не совпадают. Пожалуйста, проверьте и повторите ввод.');
            return;
        }

        setIsLoading(true);

        try {
            await updatePassword({
                current_password: values.current_password,
                new_password: values.new_password,
                re_new_password: values.re_new_password,
            });

            setSuccessMessage('Ваш пароль успешно изменён!');
            // Перенаправление на страницу настроек через 2 секунды
            setTimeout(() => navigate('/settings'), 2000);
        } catch (error: any) {
            setError(error.message || 'Произошла ошибка при изменении пароля.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (successMessage) {
        return (
            <div className={styles.content}>
                <p className={styles.success}>{successMessage}</p>
            </div>
        );
    }

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>
                <span>Сброс и обновление пароля</span>
            </h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    placeholder="Введите старый пароль"
                    name="current_password"
                    styled="main"
                    onChange={handleChange}
                    value={values.password}
                    type="password"
                    minLength={8}
                    maxLength={30}
                    required
                />
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
            {error && <p className={styles.error}>{error}</p>}

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

export default SetNewPasswordActive