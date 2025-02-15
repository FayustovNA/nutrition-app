import styles from './set-project.module.css'
import Input from '../../../ui/inputs/input'
import useForm from '../../../hooks/useForm'
import Button from '../../../ui/button/button'
import { RootState } from '../../../services/root-reducer'
import { useSelector } from 'react-redux'
import { useDispatch } from '../../../services/hooks'
import { useEffect } from 'react'
import { createProject, updateProject } from '../../../services/slices/projectSlice'
import { useState } from 'react'
import { Loader } from '../../loader/loader'
import { useMemo } from 'react'
import { getProjectBySearch } from '../../../api/admin'

interface SetProjectProps {
    user?: any;
    onClose: (() => void);
}

interface ProjectData {
    id: any;
    coach: { username: string } | null;
    start_date: string;
    start_weight: number;
    target_calories: number;
    target_carbohydrate: number;
    target_fat: number;
    target_fiber: number;
    target_protein: number;
    target_sugar: number;
    target_weight: number;
}

const SetProject: React.FC<SetProjectProps> = ({ user, onClose }) => {
    const usersList = useSelector((state: RootState) => state.usersList.users);
    const [loading, setLoading] = useState(true); // Флаг загрузки
    const dispatch = useDispatch();
    const [projectData, setProjectData] = useState<ProjectData[] | null>(null);  // Состояние для хранения данных проекта

    // Получение данных о проекте
    useEffect(() => {
        setLoading(true);
        getProjectBySearch(user.username)
            .then((data) => {
                if (data && Array.isArray(data) && data.length > 0) {
                    setProjectData(data); // Если данные есть, сохраняем их
                } else {
                    setProjectData(null); // Если данных нет, устанавливаем null
                }
                setLoading(false);
            })
            .catch(() => {
                setProjectData(null);
                setLoading(false);
            });
    }, [user.username]);

    //Список для выбора тренеров под проект
    const coachList = useMemo(() => {
        return usersList
            .filter(user => user.role === 'coach')
            .map(coach => ({
                ...coach,
                first_name: coach.first_name || '',
                last_name: coach.last_name || '',
                username: coach.username || '',
            }));
    }, [usersList]);

    // Инициализация формы с данными, если они доступны
    const { values, handleChange, setValues } = useForm({
        coach: projectData?.[0]?.coach?.username || coachList[0]?.username || '',
        start_date: projectData?.[0]?.start_date || '',
        start_weight: projectData?.[0]?.start_weight || '',
        target_calories: projectData?.[0]?.target_calories || '',
        target_carbohydrate: projectData?.[0]?.target_carbohydrate || '',
        target_fat: projectData?.[0]?.target_fat || '',
        target_fiber: projectData?.[0]?.target_fiber || '',
        target_protein: projectData?.[0]?.target_protein || '',
        target_sugar: projectData?.[0]?.target_sugar || '',
        target_weight: projectData?.[0]?.target_weight || '',
    });

    // Обновление значений формы при изменении projectData
    useEffect(() => {
        if (projectData && projectData.length > 0) {
            setValues({
                coach: projectData[0].coach?.username || coachList[0]?.username || '',
                start_date: projectData[0].start_date || '',
                start_weight: projectData[0].start_weight || '',
                target_calories: projectData[0].target_calories || '',
                target_carbohydrate: projectData[0].target_carbohydrate || '',
                target_fat: projectData[0].target_fat || '',
                target_fiber: projectData[0].target_fiber || '',
                target_protein: projectData[0].target_protein || '',
                target_sugar: projectData[0].target_sugar || '',
                target_weight: projectData[0].target_weight || '',
            });
        } else {
            setValues({
                coach: '',
                start_date: '',
                start_weight: '',
                target_calories: '',
                target_carbohydrate: '',
                target_fat: '',
                target_fiber: '',
                target_protein: '',
                target_sugar: '',
                target_weight: '',
            });
        }
    }, [projectData, coachList, setValues]);


    // Обработка сохранения/обновления проекта
    const handleSaveProject = () => {
        const projectDataToSave = {
            coach: values.coach,  // Уже выбранный тренер передается как строка
            start_date: values.start_date,
            target_calories: parseInt(values.target_calories, 10),
            target_carbohydrate: parseInt(values.target_carbohydrate, 10),
            target_fat: parseInt(values.target_fat, 10),
            target_fiber: parseInt(values.target_fiber, 10),
            target_protein: parseInt(values.target_protein, 10),
            target_sugar: parseInt(values.target_sugar, 10),
            start_weight: parseFloat(values.start_weight),
            target_weight: parseFloat(values.target_weight),
        };

        if (projectData && projectData.length > 0) {
            dispatch(updateProject({ projectId: projectData[0].id, updateData: projectDataToSave }))
                .then(() => {
                    onClose();
                })
                .catch((error) => {
                    console.error('Failed to update project:', error);
                });
        } else {
            dispatch(createProject({ ...projectDataToSave, user: user.username }))
                .then(() => {
                    onClose();
                })
                .catch((error) => {
                    console.error('Failed to create project:', error);
                });
        }
    };

    if (loading) {
        return <Loader />;
    }

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
                    value={values.coach} // Убедитесь, что значение передается
                    options={coachList} // Передаем список тренеров
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
                        placeholder="Стартовый вес"
                        name="start_weight"
                        styled="main"
                        onChange={handleChange}
                        value={values.start_weight}
                        required
                    />
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
                            {projectData && projectData.length > 0 ? 'Сохранить' : 'Создать'}
                        </p>
                    </Button>
                </div>
            </div>
        </div >
    );
};

export default SetProject;