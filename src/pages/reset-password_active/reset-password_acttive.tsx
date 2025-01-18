import { FormEvent } from 'react'
import styles from './reset-password_active.module.css'
import useForm from '../../hooks/useForm'
import { Link } from 'react-router-dom'
import { Footer } from '../../components/footer/footer'
import Input from '../../ui/inputs/input'
import Button from '../../ui/button/button'

const ResetPasswordActive = () => {

    const { values, handleChange } = useForm({
        password: '',
        new_password: '',
        re_new_password: '',
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>
                <span>Сброс и обновление пароля</span>
            </h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    placeholder="Введите старый пароль"
                    name="new_password"
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
                    name="re_new_password"
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

export default ResetPasswordActive