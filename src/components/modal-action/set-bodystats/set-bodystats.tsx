import styles from './set-bodystats.module.css';
import Input from '../../../ui/inputs/input';
import useForm from '../../../hooks/useForm';
import Button from '../../../ui/button/button';
import { createBodyStatistics } from '../../../services/slices/bodyStatsSlice';
import { useDispatch } from '../../../services/hooks'

interface SetBodyStatisticsProps {
    abdominal?: any,
    chest?: any,
    hips?: any,
    neck?: any,
    waist?: any,
    date?: any,
    user?: any,
    onClose: (() => void);
}

const SetBodyStatistics: React.FC<SetBodyStatisticsProps> = ({ onClose }) => {
    const dispatch = useDispatch();

    // Обработка формы
    const { values, handleChange } = useForm({
        date: new Date().toISOString().slice(0, 10), // Текущая дата в формате YYYY-MM-DD
        abdominal: '',
        chest: '',
        hips: '',
        neck: '',
        waist: '',
    });

    // Обработка сохранения данных замеров 
    const handleSaveBodyStatistics = () => {
        const statisticsData = {
            date: values.date,
            abdominal: parseInt(values.abdominal, 10),
            chest: parseInt(values.chest, 10),
            hips: parseInt(values.hips, 10),
            neck: parseInt(values.neck, 10),
            waist: parseInt(values.waist, 10),
        };

        dispatch(createBodyStatistics(statisticsData))
            .then(() => {
                onClose();
            })
            .catch((error) => {
                console.error('Failed to create body statistics:', error);
            });
    };

    return (
        <div className={styles.content}>
            <h3 className={styles.h3}>Внесите новые замеры</h3>
            <div className={styles.forms}>
                <Input
                    placeholder="Дата"
                    name="date"
                    styled="main"
                    type="date"
                    onChange={handleChange}
                    value={values.date} // Значение даты в формате YYYY-MM-DD
                    required
                />
                <Input
                    placeholder="Обхват живота (см)"
                    name="abdominal"
                    styled="main"
                    onChange={handleChange}
                    value={values.abdominal}
                    required
                />
                <Input
                    placeholder="Обхват груди (см)"
                    name="chest"
                    styled="main"
                    onChange={handleChange}
                    value={values.chest}
                    required
                />
                <Input
                    placeholder="Обхват бедер (см)"
                    name="hips"
                    styled="main"
                    onChange={handleChange}
                    value={values.hips}
                    required
                />
                <Input
                    placeholder="Обхват шеи (см)"
                    name="neck"
                    styled="main"
                    onChange={handleChange}
                    value={values.neck}
                    required
                />
                <Input
                    placeholder="Обхват талии (см)"
                    name="waist"
                    styled="main"
                    onChange={handleChange}
                    value={values.waist}
                    required
                />

                <div className={styles.buttons}>
                    <Button
                        variant="default"
                        size="large"
                        buttonHtmlType="submit"
                        onClick={onClose}
                    >
                        <p className={styles.btntxt}>Отменить</p>
                    </Button>
                    <Button
                        variant="default"
                        size="large"
                        buttonHtmlType="submit"
                        onClick={handleSaveBodyStatistics}
                    >
                        <p className={styles.btntxt}>Сохранить</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SetBodyStatistics;