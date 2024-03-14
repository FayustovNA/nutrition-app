import { FormEvent } from 'react'
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

    const { values, handleChange } = useForm({
        email: '',
        password: '',
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(loginIn(values)).then((result) => {
            if (result) {
                navigate('/dashboard')
            }
        })
    }

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