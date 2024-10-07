import styles from './set-project.module.css'
import Input from '../../../ui/inputs/input'
import useForm from '../../../hooks/useForm'
import Button from '../../../ui/button/button'
import { RootState } from '../../../services/root-reducer'
import { useSelector } from 'react-redux'

interface SetProjectProps {
    user?: any;
    onClose: (() => void);
}

const SetProject: React.FC<SetProjectProps> = ({ user, onClose }) => {
    const usersList = useSelector((state: RootState) => state.usersList.users);

    const coach = usersList
        .filter(user => user.role === 'coach')
        .map(coach => ({
            ...coach,
            first_name: coach.first_name || '',  // Задаем значение по умолчанию
            last_name: coach.last_name || '',    // Задаем значение по умолчанию
            username: coach.username || '',      // Задаем значение по умолчанию
        }));

    const { values, handleChange } = useForm({
        coach: '',
        start_date: '',
        target_calories: '',
        target_carbohydrate: '',
        target_fat: '',
        target_fiber: '',
        target_protein: '',
        target_sugar: '',
        target_weight: '',
    })

    return (
        <div className={styles.content}>
            <h3 className={styles.h3}>Панель управления проектом</h3>
            <div className={styles.username}>{user.last_name} {user.first_name}</div>
            <div className={styles.forms}>
                <h4 className={styles.h4}>Основная информация</h4>
                <Input
                    placeholder="Назначить тренера"
                    name="coach"
                    styled="select"
                    type="select"
                    onChange={handleChange}
                    value={values.coach}
                    options={coach} // Передаем список тренеров
                    required
                />

                <Input
                    placeholder="Установите дату старта"
                    name="start_date"
                    styled="main"
                    type="date" // Используем встроенный тип date
                    onChange={handleChange}
                    value={values.start_date} // Значение даты в формате YYYY-MM-DD
                    required
                />
                <div className={styles.nutrition}>
                    <h4 className={styles.h4}>Питание</h4>
                    <div className={styles.nutrition_grid}>
                        <Input
                            placeholder="Норма калорий"
                            name="target_calories"
                            styled="main"
                            onChange={handleChange}
                            value={values.target_calories}
                            required
                        />
                        <Input
                            placeholder="Норма белка"
                            name="target_protein"
                            styled="main"
                            onChange={handleChange}
                            value={values.target_protein}
                            required
                        />
                        <Input
                            placeholder="Норма углеводов"
                            name="target_carbohydrate"
                            styled="main"
                            onChange={handleChange}
                            value={values.target_carbohydrate}
                            required
                        />
                        <Input
                            placeholder="Норма жиров"
                            name="target_fat"
                            styled="main"
                            onChange={handleChange}
                            value={values.target_fat}
                            required
                        />
                        <Input
                            placeholder="Норма клетчатки"
                            name="target_fiber"
                            styled="main"
                            onChange={handleChange}
                            value={values.target_fiber}
                            required
                        />
                        <Input
                            placeholder="Норма сахара"
                            name="target_sugar"
                            styled="main"
                            onChange={handleChange}
                            value={values.target_sugar}
                            required
                        />
                    </div>
                </div>

                <div className={styles.taget}>
                    <h4 className={styles.h4}>Целевые показатели</h4>
                    <Input
                        placeholder="Целевой вес"
                        name="target_weight"
                        styled="main"
                        onChange={handleChange}
                        value={values.target_weight}
                        required
                    />
                </div>

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
                    >
                        < p className={styles.btntxt}>Сохранить</p>
                    </Button>
                    <Button
                        variant='default'
                        size='large'
                        buttonHtmlType='submit'
                    >
                        < p className={styles.btntxt}>Создать</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SetProject;