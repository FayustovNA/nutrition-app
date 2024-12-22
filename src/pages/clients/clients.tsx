import styles from './clients.module.css'
import { useDispatch } from '../../services/hooks';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/root-reducer';
import { fetchUsersList } from '../../services/slices/adminPanelSlice';
import { Loader } from '../../components/loader/loader';
import TableUsers from '../adminpanel/table-users/table-users';

export const Clients = () => {
    const dispatch = useDispatch();
    const usersList = useSelector((state: RootState) => state.usersList.users);
    const currenCoach = useSelector((state: RootState) => state.userData.username);
    const loading = useSelector((state: RootState) => state.usersList.loading);

    // Фильтруем список пользователей
    const filteredUsers = usersList.filter(user => user.coach === currenCoach);

    useEffect(() => {
        dispatch(fetchUsersList());
    }, [dispatch]);

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>
                Мои клиенты
            </h1>
            <div className={styles.grid}>
                {loading ? (
                    <Loader />
                ) : usersList.length > 0 ? (
                    <div className={styles.table}>
                        <TableUsers data={filteredUsers} />
                    </div>
                ) : (
                    <p>Пользователи не найдены</p>
                )}
            </div>
        </div>
    );
};
