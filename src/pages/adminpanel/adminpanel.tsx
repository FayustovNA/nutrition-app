
import styles from './adminpanel.module.css';
import { useDispatch } from '../../services/hooks';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/root-reducer';
import { fetchUsersList } from '../../services/slices/adminPanelSlice';
import { Loader } from '../../components/loader/loader';
// import ItemUser from './item-user/item-user';
import TableUsers from './table-users/table-users';


export const AdminPanel = () => {
    const dispatch = useDispatch();
    const usersList = useSelector((state: RootState) => state.usersList.users);
    const loading = useSelector((state: RootState) => state.usersList.loading);

    useEffect(() => {
        dispatch(fetchUsersList());
    }, [dispatch]);

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>
                Панель администратора
            </h1>

            <div className={styles.grid}>
                {loading ? (
                    <Loader />
                ) : usersList.length > 0 ? (
                    <div className={styles.table}>
                        <TableUsers data={usersList} />
                    </div>
                ) : (
                    <p>Пользователи не найдены</p>
                )}
            </div>
        </div>
    );
};