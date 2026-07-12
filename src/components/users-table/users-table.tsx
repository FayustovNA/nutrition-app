import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styles from './users-table.module.css';
import Pagination from './pagination';
import { UsersSortDirection, UsersSortField } from '../../hooks/useUsersTable';
import { TGetUserInfo } from '../../services/slices/userSlice';
import { deleteUserById } from '../../api/admin';
import { useDispatch } from '../../services/hooks';
import { fetchUsersList } from '../../services/slices/adminPanelSlice';
import SetProject from '../modal-action/set-project/set-project';
import ModalAction from '../modal-action/modal-action';
import Modal from '../modal/modal';
import DeleteAction from '../modal-action/delete/delete';
import False from '../../images/icon-status/False.svg?react';
import True from '../../images/icon-status/True.svg?react';
import Delete from '../../images/icon-status/delete.svg?react';
import More from '../../images/icon-status/More.svg?react';
import Frame from '../../images/icon-status/Frame.svg?react';
import DeleteMob from '../../images/icon-status/delete-mb.svg?react';
import MoreMob from '../../images/icon-status/More-mb.svg?react';
import FrameMob from '../../images/icon-status/Frame-mb.svg?react';
import Avatar from '../../images/avatar_def.png';

interface UsersTableProps {
    users: TGetUserInfo[];
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    sortField: UsersSortField;
    sortDirection: UsersSortDirection;
    onToggleSort: (field: UsersSortField) => void;
}

const COLUMNS: { field: UsersSortField; label: string }[] = [
    { field: 'name', label: 'Пользователь' },
    { field: 'email', label: 'E-mail' },
    { field: 'role', label: 'Роль' },
    { field: 'coach', label: 'Тренер' },
];

const getAvatarUrl = (image?: string) => (image ? image.replace('http://localhost', '') : Avatar);

const UsersTable: React.FC<UsersTableProps> = ({
    users,
    page,
    totalPages,
    onPageChange,
    sortField,
    sortDirection,
    onToggleSort,
}) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalAction, setIsOpenModalAction] = useState(false);
    const [currentUser, setCurrentUser] = useState<TGetUserInfo | null>(null);
    // Порог шире обычного мобильного (576px): у таблицы 6 колонок + иконки действий,
    // на планшетной ширине (577-900px) им физически не хватает места без сжатия/потери контента
    const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openModal = (user: TGetUserInfo) => {
        setCurrentUser(user);
        setIsOpenModal(true);
    };

    const openModalAction = (user: TGetUserInfo) => {
        setCurrentUser(user);
        setIsOpenModalAction(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
        setIsOpenModalAction(false);
        setCurrentUser(null);
    };

    const handleDelete = async (id: any, onClose: () => void): Promise<string | void> => {
        try {
            await deleteUserById(id.toString());
            dispatch(fetchUsersList());
            onClose();
        } catch (error: any) {
            return error.message || 'Неизвестная ошибка при удалении пользователя';
        }
    };

    const handleOpenStats = (username: string, firstName?: string, lastName?: string) => {
        navigate(`/stats?username=${username}`, {
            state: { firstName, lastName },
        });
    };

    const sortIndicator = (field: UsersSortField) => {
        if (field !== sortField) return null;
        return <span className={styles.sortArrow}>{sortDirection === 'asc' ? '▲' : '▼'}</span>;
    };

    if (users.length === 0) {
        return <p className={styles.empty}>Пользователи не найдены</p>;
    }

    return (
        <div className={styles.tablebox}>
            {isMobile ? (
                <div className={styles.usercards}>
                    {users.map((user) => (
                        <div key={user.id} className={styles.card}>
                            <div className={styles.avatar_user}>
                                <div className={styles.avatarbox}>
                                    <img src={getAvatarUrl(user.image)} className={styles.avatar} alt="" />
                                </div>
                                <div className={styles.fio}>{user.last_name} {user.first_name}</div>
                            </div>

                            <div className={styles.status}>{user.fatsecret_account === false ? <False /> : <True />}</div>

                            <div className={styles.btnrows}>
                                <button
                                    className={styles.btn_st_mob}
                                    title="Статистика"
                                    onClick={() => handleOpenStats(user.username || '', user.first_name, user.last_name)}
                                >
                                    <FrameMob />
                                </button>
                                <button className={styles.btn_action_mob_} title="Проект" onClick={() => openModal(user)}>
                                    <MoreMob />
                                </button>
                                <button className={styles.btn_action_mob} title="Удалить" onClick={() => openModalAction(user)}>
                                    <DeleteMob />
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <div className={styles.tableScroll}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {COLUMNS.map(({ field, label }) => (
                                <th key={field} className={styles.col} onClick={() => onToggleSort(field)}>
                                    {label} {sortIndicator(field)}
                                </th>
                            ))}
                            <th className={styles.col}>Статус</th>
                            <th className={styles.colActions} />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className={styles.rows}>
                                <td className={styles.row_f}>
                                    <div className={styles.avatarbox_t}>
                                        <img src={getAvatarUrl(user.image)} className={styles.avatar} alt="" />
                                    </div>
                                    {user.last_name || user.first_name ? `${user.last_name} ${user.first_name}`.trim() : '-'}
                                </td>
                                <td className={styles.row}>{user.email}</td>
                                <td className={styles.row}>{user.role}</td>
                                <td className={styles.row}>{user.coach === null ? '-' : user.coach}</td>
                                <td className={styles.row}>{user.fatsecret_account === false ? <False /> : <True />}</td>
                                <td className={styles.rowActions}>
                                    <button
                                        className={styles.btn_st}
                                        title="Статистика"
                                        onClick={() => handleOpenStats(user.username || '', user.first_name, user.last_name)}
                                    >
                                        <Frame />
                                    </button>
                                    <button className={styles.btn_action} title="Удалить" onClick={() => openModalAction(user)}>
                                        <Delete />
                                    </button>
                                    <button className={styles.btn_action_} title="Проект" onClick={() => openModal(user)}>
                                        <More />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}

            <div className={styles.footer}>
                <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
            </div>

            {isOpenModal && (
                <Modal onClose={closeModal}>
                    <SetProject user={currentUser} onClose={closeModal} key={currentUser?.username} />
                </Modal>
            )}
            {isOpenModalAction && (
                <ModalAction onClose={closeModal}>
                    <DeleteAction
                        onClose={closeModal}
                        user={currentUser}
                        onDelete={() => handleDelete(currentUser?.id, closeModal)}
                    />
                </ModalAction>
            )}
        </div>
    );
};

export default UsersTable;
