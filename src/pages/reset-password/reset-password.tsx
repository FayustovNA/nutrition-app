import { FormEvent } from 'react'
import styles from './reset-password.module.css'
import useForm from '../../hooks/useForm'
import { Link } from 'react-router-dom'
import { Footer } from '../../components/footer/footer'
// import { useDispatch } from '../../services/hooks'
import Input from '../../ui/inputs/input'
import Button from '../../ui/button/button'

const ResetPassword = () => {

    const { values, handleChange } = useForm({
        email: '',
        password: '',
        resetCode: '',
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
                <span>Сброс и обновление пароля</span>
            </h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    placeholder="Введите новый пароль"
                    name="password"
                    styled="main"
                    onChange={handleChange}
                    value={values.password}
                    type="password"
                    minLength={8}
                    maxLength={30}
                    required
                />
                <Input
                    placeholder="Укажите код из письма"
                    name='reset-code'
                    styled="main"
                    onChange={handleChange}
                    value={values.resetCode}
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

export default ResetPassword