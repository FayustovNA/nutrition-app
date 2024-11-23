import styles from './set-project.module.css'
import Input from '../../../ui/inputs/input'
import useForm from '../../../hooks/useForm'
import Button from '../../../ui/button/button'
import { RootState } from '../../../services/root-reducer'
import { useSelector } from 'react-redux'
import { useDispatch } from '../../../services/hooks'
import { useEffect } from 'react'
import { createProject, getProjectBySearch, updateProject } from '../../../services/slices/projectSlice'

interface SetProjectProps {
    user?: any;
    onClose: (() => void);
}

const SetProject: React.FC<SetProjectProps> = ({ user, onClose }) => {
    const usersList = useSelector((state: RootState) => state.usersList.users);
    const userProject = useSelector((state: RootState) => state.projectData.projectData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjectBySearch(user.username));
    }, [dispatch]);

    //Список для выбора тренеров под проект
    const coach = usersList
        .filter(user => user.role === 'coach')
        .map(coach => ({
            ...coach,
            first_name: coach.first_name || '',
            last_name: coach.last_name || '',
            username: coach.username || '',
        }));

    //Обработка формы
    const { values, handleChange } = useForm({
        coach: userProject?.coach.username,
        start_date: userProject?.start_date,
        target_calories: userProject?.target_calories,
        target_carbohydrate: userProject?.target_carbohydrate,
        target_fat: userProject?.target_fat,
        target_fiber: userProject?.target_fiber,
        target_protein: userProject?.target_protein,
        target_sugar: userProject?.target_sugar,
        target_weight: userProject?.target_weight,
    })

    // Обработка сохранения/обновления проекта
    const handleSaveProject = () => {
        const projectData = {
            coach: values.coach || '',  // Уже выбранный тренер передается как строка
            start_date: values.start_date,
            target_calories: parseInt(values.target_calories, 10),
            target_carbohydrate: parseInt(values.target_carbohydrate, 10),
            target_fat: parseInt(values.target_fat, 10),
            target_fiber: parseInt(values.target_fiber, 10),
            target_protein: parseInt(values.target_protein, 10),
            target_sugar: parseInt(values.target_sugar, 10),
            target_weight: parseInt(values.target_weight, 10),
        };

        // Если проект уже существует, то обновляем его, иначе создаем новый
        if (userProject) {
            dispatch(updateProject({ projectId: userProject.id, updateData: projectData }))
                .then(() => {
                    onClose();
                })
                .catch((error) => {
                    console.error('Failed to update project:', error);
                });
        } else {
            dispatch(createProject({ ...projectData, user: user.username }))
                .then(() => {
                    onClose();
                })
                .catch((error) => {
                    console.error('Failed to create project:', error);
                });
        }
    };

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
                        onClick={handleSaveProject}
                    >
                        <p className={styles.btntxt}>
                            {userProject ? 'Сохранить' : 'Создать'}
                        </p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SetProject;