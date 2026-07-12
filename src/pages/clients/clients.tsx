import styles from './clients.module.css'
import { useDispatch, useSelector } from '../../services/hooks';
import { useEffect, useMemo } from 'react';
import { RootState } from '../../services/root-reducer';
import { fetchUsersList } from '../../services/slices/adminPanelSlice';
import { Loader } from '../../components/loader/loader';
import UsersTable from '../../components/users-table/users-table';
import UsersToolbar from '../../components/users-table/users-toolbar';
import { useUsersTable } from '../../hooks/useUsersTable';

export const Clients = () => {
    const dispatch = useDispatch();
    const usersList = useSelector((state: RootState) => state.usersList.users);
    const currenCoach = useSelector((state: RootState) => state.userData.username);
    const loading = useSelector((state: RootState) => state.usersList.loading);

    // Фильтруем список пользователей
    const filteredUsers = useMemo(
        () => usersList.filter(user => user.coach === currenCoach),
        [usersList, currenCoach]
    );

    const table = useUsersTable(filteredUsers);

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
                ) : filteredUsers.length > 0 ? (
                    <div className={styles.table}>
                        <UsersToolbar
                            search={table.search}
                            onSearchChange={table.setSearch}
                            totalCount={table.totalCount}
                        />
                        <UsersTable
                            users={table.pageItems}
                            page={table.page}
                            totalPages={table.totalPages}
                            onPageChange={table.setPage}
                            sortField={table.sortField}
                            sortDirection={table.sortDirection}
                            onToggleSort={table.toggleSort}
                        />
                    </div>
                ) : (
                    <p>Пользователи не найдены</p>
                )}
            </div>
        </div>
    );
};
