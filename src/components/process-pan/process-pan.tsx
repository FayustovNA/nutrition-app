import styles from './process-pan.module.css'
import ProcessItem from './item/item'
import LinearProgress from '@mui/material/LinearProgress'

interface ProcessPan {
    startDate: any;
    startWeight: any;
    coach?: { first_name: string, last_name: string };
    latestWeight?: any;
    targetWeight?: any;
}

export const ProcessPan: React.FC<ProcessPan> = ({ startDate, coach, startWeight, latestWeight, targetWeight }) => {
    // Преобразуем startDate в объект Date
    const start = new Date(startDate);
    const today = new Date();

    // Рассчитываем разницу в днях
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Количество дней
    const formattedDate = today.toISOString().split('T')[0];
    const deltaWeight = parseFloat((latestWeight - startWeight).toFixed(1));
    const toTarget = parseFloat((latestWeight - targetWeight).toFixed(1));

    // Рассчитываем процент достижения цели (по умолчанию 0, если нет целевого веса или текущего веса)
    const progress = targetWeight && latestWeight
        ? Math.min(((startWeight - latestWeight) / (startWeight - targetWeight)) * 100, 100)
        : 1;

    return (
        <div className={styles.content}>
            <h3 className={styles.title}>Панель процесса</h3>
            <div className={styles.grid}>
                <ProcessItem
                    title='Тренер'>
                    <p className={styles.unit}>
                        {coach ? `${coach.first_name} ${coach.last_name}` : '-'}
                    </p>
                </ProcessItem>
                <ProcessItem
                    title='В проекте'>
                    <p className={styles.unit}>
                        c {startDate} по {formattedDate}
                    </p>
                    <p className={styles.mainunit}>
                        ||  {diffDays !== undefined && diffDays !== null ? `${diffDays} d` : '-'}
                    </p>
                </ProcessItem>
                <ProcessItem
                    title='Общий прогресс по весу'>
                    <p className={styles.unit}>
                        {startWeight !== undefined && startWeight !== null ? `Стартовый вес:   ${startWeight} kg` : '-'}
                    </p>
                    <p className={styles.mainunit}>
                        ||  {deltaWeight !== undefined && deltaWeight !== null ? `${deltaWeight} kg` : '-'}
                    </p>
                </ProcessItem>
                <ProcessItem
                    title='До цели'>
                    <div className={styles.bar}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 8,
                                width: '70%',  // Обеспечиваем, что прогресс-бар будет растягиваться на всю ширину
                                borderRadius: 5,
                                backgroundColor: '#86868b',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#007AFF', // Цвет полосы прогресса
                                }
                            }}
                        />
                        <p className={styles.mainunit}>
                            ||  {toTarget !== undefined && toTarget !== null ? `${toTarget} kg` : '-'}
                        </p>
                    </div>

                </ProcessItem>
            </div>
        </div >
    );
};