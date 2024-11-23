import styles from './set-profile-setting.module.css'
import Input from '../../../ui/inputs/input'
import useForm from '../../../hooks/useForm'
import Button from '../../../ui/button/button'
import { RootState } from '../../../services/root-reducer'
import { useSelector } from 'react-redux'
import { useDispatch } from '../../../services/hooks'
import { updateUser } from '../../../services/slices/userSlice'
import { fetchUserData } from '../../../services/slices/userSlice'

interface SetProfileSettingProps {
    user?: any;
    onClose: (() => void);
}

const SetProfileSetting: React.FC<SetProfileSettingProps> = ({ onClose }) => {
    const dispatch = useDispatch();
    const User = useSelector((state: RootState) => state.userData);

    //Обработка формы
    const { values, handleChange } = useForm({
        first_name: User.first_name,
        last_name: User.last_name,
        username: User.username,
        email: User.email,
    })

    const handleSave = async () => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value || '');
        });

        await dispatch(updateUser(formData));
        await dispatch(fetchUserData()); // Обновление данных из API
        onClose(); // Закрыть модальное окно
    };

    return (
        <div className={styles.content}>
            <h3 className={styles.h3}>Редкатирование профиля</h3>
            <div className={styles.forms}>
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

                <div className={styles.buttons}>
                    <Button
                        variant='default'
                        size='large'
                        buttonHtmlType='submit'
                        onClick={onClose}
                    >
                        < p className={styles.btntxt}>Отменить</p>
                    </Button>
                    <Button
                        variant='default'
                        size='large'
                        buttonHtmlType='submit'
                        onClick={handleSave}
                    >
                        <p className={styles.btntxt}>
                            Сохранить
                        </p>
                    </Button>
                </div>
            </div>
        </div >
    );
};

export default SetProfileSetting;