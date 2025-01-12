import styles from './stats.module.css'
import { useEffect } from 'react'
import { useDispatch } from '../../services/hooks'
import { DiaryPanel } from '../../components/diary-panel/diary-panel'
import { FoodTargetPanel } from '../../components/food-target-panel/food-target-panel'
import WeekAverWeightPanel from '../../components/week-aver-weight-panel/week-aver-weight-panel'
import WeekDeltaWeightPanel from '../../components/week-delta-weight-panel/week-delta-weight-panel'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/root-reducer'
import { getFoodDiaryBySearch } from '../../services/slices/userStats'
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/loader/loader'
import WeigthChart from '../../components/weigth-chart/weigth-chart'
import WeekAverProteinPanel from '../../components/nutrition-prot-chart/nutrition-prot-chart'
import WeekAverCaloriesPanel from '../../components/nutrition-cal-chart/nutrition-cal-chart'
import { useState } from 'react'
import ModalAction from '../../components/modal-action/modal-action'
import SetBodyStatistics from '../../components/modal-action/set-bodystats/set-bodystats'
import MeasurementsChart from '../../components/body-stats-chart/body-stats-chart'
import { getStatisticsBySearch } from '../../services/slices/bodyStatsSlice'
import { getProjectBySearch } from '../../services/slices/projectSlice'

export const Stats = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const usernameParam = searchParams.get('username');
    const User = useSelector((state: RootState) => state.userData);
    const statsData = useSelector((state: RootState) => state.userStats.foodDiaryData);
    const startDate = useSelector((state: RootState) => state.projectData.projectData?.start_date);
    const bodyStats = useSelector((state: RootState) => state.bodyStats.statisticsData);
    const [isOpenModal, setisOpenModal] = useState(false);

    // Эффект для загрузки данных пользователя и проекта
    // Определяем, чьи данные загружать
    const usernameToFetch =
        User.role === 'user' && !usernameParam // Если user, игнорируем параметры
            ? User.username
            : usernameParam; // Если admin/coach, используем параметр

    useEffect(() => {
        if (usernameToFetch) {
            dispatch(getProjectBySearch(usernameToFetch))
            dispatch(getFoodDiaryBySearch(usernameToFetch)); // Загружаем дневник по username
            dispatch(getStatisticsBySearch(usernameToFetch)); // Загружаем статистику по username
        }
    }, [dispatch, usernameToFetch]);

    const openModal = () => setisOpenModal(true);
    const closeModal = () => setisOpenModal(false);

    if (!statsData || !User) {
        return <Loader />;
    }

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>
                Моя статистика
            </h1>

            <div className={styles.grid}>
                <DiaryPanel statsData={statsData} user={usernameToFetch} />

                <div className={styles.grid_nutrition}>
                    <FoodTargetPanel statsData={statsData} />
                    <div className={styles.dynamic_nutr}>
                        <h3 className={styles.subtitle}>Динамика целевых показателей</h3>
                        <div className={styles.charts}>
                            <WeekAverCaloriesPanel statsData={statsData} startDate={startDate} />
                            <WeekAverProteinPanel statsData={statsData} startDate={startDate} />
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.weight_stats}>
                <div className={styles.weight_col}>
                    <h3 className={styles.subtitle}>Средние показатели веса</h3>
                    <div className={styles.weight_char}>
                        <WeekAverWeightPanel statsData={statsData} startDate={startDate} />
                        <WeekDeltaWeightPanel statsData={statsData} startDate={startDate} />
                    </div>
                </div>
                <div className={styles.weight_col2}>
                    <h3 className={styles.subtitle}>Динамика веса и антропометрии</h3>
                    <div className={styles.weight_char2}>
                        <WeigthChart statsData={statsData} />
                        {bodyStats && bodyStats.length > 0 ? (
                            <MeasurementsChart statsData={bodyStats} />
                        ) : (
                            <div className={styles.text}>Данные по антропометрии отсутствуют</div>
                        )}
                    </div>
                    <button className={styles.btn}
                        onClick={openModal}
                    >Внести новые замеры
                    </button>
                </div>
            </div>
            {
                isOpenModal && (<ModalAction onClose={closeModal}>
                    <SetBodyStatistics onClose={closeModal} />
                </ModalAction>)
            }
        </div>
    );
};
