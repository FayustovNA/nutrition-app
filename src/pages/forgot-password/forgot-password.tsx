import { FormEvent } from 'react'
import styles from './forgot-password.module.css'
import useForm from '../../hooks/useForm'
import { Link } from 'react-router-dom'
import { Footer } from '../../components/footer/footer'
// import { useDispatch } from '../../services/hooks'
import Input from '../../ui/inputs/input'
import Button from '../../ui/button/button'

const ForgotPassword = () => {

    const { values, handleChange } = useForm({
        email: ''
    })

    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // dispatch(loginIn(values)).then((result) => {
        //     if (result) {
        //         navigate('/dashboard')
        //     }
        // })
    }

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>
                <span>Восстановление пароля</span>
            </h2>

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
                        < p className={styles.btntxt}> Восстановить</p>
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