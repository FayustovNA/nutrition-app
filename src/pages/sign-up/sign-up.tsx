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
// import { useAppSelector } from '../../services/store'

const SignUp = () => {

    const { values, handleChange } = useForm({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
    })

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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (checkSignUpValidity()) {
            dispatch(registerUser(values))
            navigate('/login')
        } else {
            console.error('Нужно заполнить все данные')
        }
    }

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
                                checked={item.value === values.role}
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