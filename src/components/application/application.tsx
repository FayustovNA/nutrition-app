import styles from './application.module.css';
import Input from '../../ui/inputs/input';
import useForm from '../../hooks/useForm';
import Checkbox from '../../ui/checkbox/checkbox';
import Button from '../../ui/button/button';

export const ApplicationWindow = () => {

    const { values, handleChange } = useForm({
        first_name: '',
        phone: '',
    })

    return (
        <div className={styles.content}>
            {/* <p className={styles.info}>{data.info}</p> */}
            <img className={styles.img} src='nutrition-app/images/application/applay.png'></img>
            <h3 className={styles.h3}>Добро пожаловать в BFN!</h3>
            <p className={styles.text}>
                Тебя ждет увлекательная работа с питанием, образом жизни и привычками. Результат, который гарантруем - лучшая физическая форма!
            </p>
            <div className={styles.forms}>
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
                    placeholder="Номер WhatsApp или Telegram"
                    name="phone"
                    styled="main"
                    onChange={handleChange}
                    value={values.phone}
                    pattern="^\+?\d{1,3}[-\s]?\d{1,14}$"
                    maxLength={12}
                    minLength={10}
                    errorMessage="Введите корректный номер"
                    required
                />
                <div className={styles.checkbox}>
                    <Checkbox
                        name="agree"
                        label={''}
                    // value={item.value}
                    // onChange={handleChange}
                    // checked={item.value === values.role}
                    />
                    <p className={styles.link}>Я согласен на обработку моих персональных данных в соответствии с  Условиями </p>
                </div>
                <div className={styles.button}>
                    <Button
                        variant='default'
                        size='large'
                        buttonHtmlType='submit'
                    >
                        < p className={styles.btntxt}>Отправить заявку</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};


