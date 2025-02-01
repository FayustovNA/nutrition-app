import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './table-users.module.css'
import False from '../../../images/icon-status/False.svg?react'
import True from '../../../images/icon-status/True.svg?react'
import Delete from '../../../images/icon-status/delete.svg?react'
import More from '../../../images/icon-status/More.svg?react'
import Frame from '../../../images/icon-status/Frame.svg?react'
import ModalAction from '../../../components/modal-action/modal-action'
import Modal from '../../../components/modal/modal'
import DeleteAction from '../../../components/modal-action/delete/delete'
import { deleteUserById } from '../../../api/admin'
import { useDispatch } from '../../../services/hooks'
import { fetchUsersList } from '../../../services/slices/adminPanelSlice'
import SetProject from '../../../components/modal-action/set-project/set-project'
import { useMediaQuery } from 'react-responsive'
import DeleteMob from '../../../images/icon-status/delete-mb.svg?react'
import MoreMob from '../../../images/icon-status/More-mb.svg?react'
import FrameMob from '../../../images/icon-status/Frame-mb.svg?react'
import { RootState } from '../../../services/root-reducer';
import { useSelector } from 'react-redux'
import Avatar from '../../../images/avatar_def.png'

interface ItemUserProps {
    id?: any;
    username?: string;
    last_name?: string | undefined;
    first_name?: string | undefined;
    role?: string;
    email?: string | undefined;
    coach?: string | null;
    fatsecret_account?: any;
    onclick?: () => void;
    image?: any;
}

interface TableUsersProps {
    data: ItemUserProps[];
}

const TableUsers: React.FC<TableUsersProps> = ({ data }) => {
    const [isOpenModal, setisOpenModal] = useState(false);
    const [isOpenModalAction, setisOpenModalAction] = useState(false);
    const [currentUser, setcurrentUser] = useState<ItemUserProps | null>(null);
    const [filter, setFilter] = useState<'all' | 'clients' | 'coaches'>('all');
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currenUserRole = useSelector((state: RootState) => state.userData.role);
    const [selectedCoach, setSelectedCoach] = useState<string | null>(null); // Фильтр по тренеру

    // Собираем список уникальных тренеров
    const uniqueCoaches = Array.from(
        new Set(data.map((user) => user.coach).filter(Boolean))
    );


    // Фильтрация данных на основе фильтра
    const filteredData = data
        .filter(user => {
            // Apply role-based filtering
            if (filter === 'clients') {
                return user.role !== 'coach' && user.role !== 'admin';
            } else if (filter === 'coaches') {
                return user.role === 'coach';
            }
            return true;
        })
        .filter(user => {
            // Apply coach filter if selected
            if (selectedCoach) {
                return user.coach === selectedCoach;
            }
            return true;
        });

    const openModal = (user: ItemUserProps) => {
        setcurrentUser(user);
        setisOpenModal(true);
    }

    const openModalAction = (user: ItemUserProps) => {
        setcurrentUser(user);
        setisOpenModalAction(true);
    };

    const closeModal = () => {
        setisOpenModal(false)
        setisOpenModalAction(false)
        setcurrentUser(null)
    }

    const handleDelete = async (id: any, onClose: () => void): Promise<string | void> => {
        try {
            await deleteUserById(id.toString());
            // console.log(`Удалить пользователя с id: ${id}`);
            dispatch(fetchUsersList());
            onClose(); // Закрываем модальное окно или выполняем другое действие
        } catch (error: any) {
            // Если произошла ошибка, возвращаем текст ошибки
            return error.message || 'Неизвестная ошибка при удалении пользователя';
        }
    };

    const handleOpenStats = (username: string, firstName?: string, lastName?: string) => {
        navigate(`/stats?username=${username}`, {
            state: { firstName, lastName }, // Передаем данные через state
        });
    };


    const getAvatarUrl = (image?: string) => {
        return image ? image.replace('http://localhost', '') : Avatar;
    };

    const handleCoachFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCoach(event.target.value || null);
    };

    return (
        <div className={styles.tablebox}>

            <div className={styles.table}>
                {isMobile ? (
                    <div className={styles.usercards}>
                        <div className={styles.scrlbx}>
                            {filteredData.map((user, index) => (
                                <div key={index} className={styles.card}>

                                    <div className={styles.avatar_user}>
                                        <div className={styles.avatarbox}>
                                            <img
                                                src={getAvatarUrl(user.image)}
                                                className={styles.avatar}
                                            />
                                        </div>
                                        <div className={styles.fio}>{user.last_name} {user.first_name}</div>
                                    </div>


                                    <td className={styles.role}>{user.fatsecret_account === false ? <False /> : <True />}</td>
                                    {/* <p className={styles.role}>{user.role}</p> */}
                                    <div className={styles.btnrows}>
                                        <button
                                            className={styles.btn_st_mob}
                                            onClick={() => handleOpenStats(user.username || '', user.first_name, user.last_name)}
                                        >
                                            <FrameMob />
                                        </button>
                                        <button
                                            className={styles.btn_action_mob_}
                                            onClick={() => openModal(user)}>
                                            <MoreMob />
                                        </button>
                                        <button
                                            className={styles.btn_action_mob}
                                            onClick={() => openModalAction(user)}>
                                            <DeleteMob />
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                )
                    : (
                        <div className={styles.tbody}>
                            <div className={styles.head}>

                                <th className={styles.col}>Пользователь</th>
                                <th className={styles.col}>E-mail</th>
                                <th className={styles.col}>Статус</th>
                                <th className={styles.col}>Роль</th>
                                <th className={styles.col}>Тренер</th>
                            </div>

                            <div className={styles.bodyrows}>
                                {filteredData.map((user, index) => (
                                    <div key={index} className={styles.rows}>
                                        <div className={styles.item_rows}>
                                            <td className={styles.row_f}>
                                                <div className={styles.avatarbox_t}>
                                                    <img
                                                        src={getAvatarUrl(user.image)}
                                                        className={styles.avatar}
                                                    />
                                                </div>
                                                {user.last_name || user.first_name ? `${user.last_name} ${user.first_name}`.trim() : '-'}
                                            </td>
                                            <td className={styles.row}>{user.email}</td>
                                            <td className={styles.row}>{user.fatsecret_account === false ? <False /> : <True />}</td>
                                            <td className={styles.row}>{user.role}</td>
                                            <td className={styles.row}>{user.coach === null ? '-' : user.coach}</td>
                                        </div>
                                        <button
                                            className={styles.btn_st}
                                            onClick={() => handleOpenStats(user.username || '', user.first_name, user.last_name)}
                                        >
                                            <Frame />
                                        </button>
                                        <button
                                            className={styles.btn_action}
                                            onClick={() => openModalAction(user)}>
                                            <Delete />
                                        </button>
                                        <button
                                            className={styles.btn_action_}
                                            onClick={() => openModal(user)}>
                                            <More />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                {currenUserRole !== 'coach' ? (
                    <div className={styles.footer}>
                        <div className={styles.filter}>
                            <button
                                className={`${styles.btn_filter} ${filter === 'all' ? styles.active : ''}`}
                                onClick={() => setFilter('all')}
                            >
                                Все
                            </button>
                            <button
                                className={`${styles.btn_filter} ${filter === 'clients' ? styles.active : ''}`}
                                onClick={() => setFilter('clients')}
                            >
                                Клиенты
                            </button>
                            <button
                                className={`${styles.btn_filter} ${filter === 'coaches' ? styles.active : ''}`}
                                onClick={() => setFilter('coaches')}
                            >
                                Тренеры
                            </button>
                            <select
                                id="coach-filter"
                                className={`${styles.btn_filter} ${selectedCoach ? styles.active : ''} ${styles.customSelect}`}
                                onChange={handleCoachFilter}
                                value={selectedCoach || ''}
                            >
                                <option value="">Все тренеры</option>
                                {uniqueCoaches.map((coach, index) => (
                                    <option key={index} value={coach || ''}>
                                        {coach}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.pgn_panel}>
                            <div className={styles.info}>Всего пользователей: <p className={styles.count}>{filteredData.length}</p></div>
                        </div>
                    </div>) : (
                    <div className={styles.footer}>
                        <div className={styles.mobinfo}>Всего пользователей: <p className={styles.count}>{filteredData.length}</p></div>
                    </div>
                )}
            </div>

            {
                isOpenModal && (<Modal onClose={closeModal}>
                    <SetProject user={currentUser} onClose={closeModal} />
                </Modal>)
            }
            {
                isOpenModalAction && (<ModalAction onClose={closeModal}>
                    <DeleteAction
                        onClose={closeModal}
                        user={currentUser}
                        onDelete={() => handleDelete(currentUser?.id, () => closeModal)} />
                </ModalAction>)
            }
        </div >
    );
};

export default TableUsers;