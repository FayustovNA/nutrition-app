import { FormEvent } from 'react'
import styles from './forgot-password.module.css'
import useForm from '../../hooks/useForm'
import { Link } from 'react-router-dom'
import { Footer } from '../../components/footer/footer'
import { resetPassword } from '../../api/auth'
import Input from '../../ui/inputs/input'
import Button from '../../ui/button/button'
import { useState } from 'react'

const ForgotPassword = () => {
    const { values, handleChange } = useForm({
        email: ''
    })
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setIsLoading(true);

        try {
            await resetPassword(values.email);
            setMessage('Проверьте почту для подтверждения изменения пароля.');
        } catch (err: any) {
            setError(err.message || 'Произошла ошибка. Попробуйте позже.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>
                <span>Восстановление пароля</span>
            </h2>

            {message && <p className={styles.success}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}

            <form className={styles.form} onSubmit={handleSubmit}>

                <Input
                    placeholder="Укажите e-mail учетной записи"
                    name="email"
                    styled="main"
                    onChange={handleChange}
                    value={values.email}
                    pattern="^\S+@\S+\.\S+$"
                    maxLength={30}
                    errorMessage="Введите корректный email"
                    required
                />
                <div className={styles.button}>
                    <Button
                        variant='default'
                        size='large'
                        buttonHtmlType='submit'
                    >
                        <p className={styles.btntxt}>
                            {isLoading ? 'Отправка...' : 'Восстановить'}
                        </p>
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

export default ForgotPassword