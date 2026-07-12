import styles from './adminpanel.module.css';
import { useDispatch, useSelector } from '../../services/hooks';
import { useEffect } from 'react';
import { RootState } from '../../services/root-reducer';
import { fetchUsersList } from '../../services/slices/adminPanelSlice';
import { Loader } from '../../components/loader/loader';
import UsersTable from '../../components/users-table/users-table';
import UsersToolbar from '../../components/users-table/users-toolbar';
import { useUsersTable } from '../../hooks/useUsersTable';

export const AdminPanel = () => {
    const dispatch = useDispatch();
    const usersList = useSelector((state: RootState) => state.usersList.users);
    const loading = useSelector((state: RootState) => state.usersList.loading);

    const table = useUsersTable(usersList);

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
                        <UsersToolbar
                            search={table.search}
                            onSearchChange={table.setSearch}
                            totalCount={table.totalCount}
                            showRoleFilter
                            roleFilter={table.roleFilter}
                            onRoleFilterChange={table.setRoleFilter}
                            showCoachFilter
                            coachFilter={table.coachFilter}
                            onCoachFilterChange={table.setCoachFilter}
                            coachOptions={table.coachOptions}
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
