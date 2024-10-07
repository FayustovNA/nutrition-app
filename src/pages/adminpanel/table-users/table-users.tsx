import React, { useState } from 'react'
import styles from './table-users.module.css'
import False from '../../../images/icon-status/False.svg?react'
import True from '../../../images/icon-status/True.svg?react'
import Delete from '../../../images/icon-status/delete.svg?react'
import More from '../../../images/icon-status/More.svg?react'
import ModalAction from '../../../components/modal-action/modal-action'
import Modal from '../../../components/modal/modal'
import DeleteAction from '../../../components/modal-action/delete/delete'
import { deleteUserById } from '../../../api/admin'
import { useDispatch } from '../../../services/hooks'
import { fetchUsersList } from '../../../services/slices/adminPanelSlice'
import SetProject from '../../../components/modal-action/set-project/set-project'

interface ItemUserProps {
    id?: string | number;
    username?: string;
    last_name?: string;
    first_name?: string;
    role?: string;
    email?: string;
    coach?: string;
    fatsecret_account?: any;
    onclick?: () => void;
}

interface TableUsersProps {
    data: ItemUserProps[];
}


const TableUsers: React.FC<TableUsersProps> = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpenModal, setisOpenModal] = useState(false);
    const [isOpenModalAction, setisOpenModalAction] = useState(false);
    const [currentUser, setcurrentUser] = useState<ItemUserProps | null>(null);
    const rowsPerPage = 15; // Количество строк на странице
    const dispatch = useDispatch();


    const totalPages = Math.ceil(data.length / rowsPerPage);


    // const handleEdit = (id: number) => {
    //     // Логика редактирования пользователя
    //     console.log(`Редактировать пользователя с id: ${id}`);
    // };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
            console.log(`Удалить пользователя с id: ${id}`);
            dispatch(fetchUsersList());
            onClose(); // Закрываем модальное окно или выполняем другое действие
        } catch (error: any) {
            // Если произошла ошибка, возвращаем текст ошибки
            return error.message || 'Неизвестная ошибка при удалении пользователя';
        }
    };


    // Вычисляем текущие строки для отображения
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    return (
        <div className={styles.tablebox}>
            <table className={styles.table}>
                <thead className={styles.head}>
                    <th className={styles.col}>Фамилия</th>
                    <th className={styles.col}>Имя</th>
                    <th className={styles.col}>E-mail</th>
                    <th className={styles.col}>Статус</th>
                    <th className={styles.col}>Роль</th>
                    <th className={styles.col}>Тренер</th>
                </thead>
                <tbody className={styles.tbody}>
                    {currentRows.map((user, index) => (
                        <tr key={index} className={styles.rows}>
                            <div className={styles.item_rows}>
                                <td className={styles.row}>{user.last_name === '' ? '-' : user.last_name}</td>
                                <td className={styles.row}>{user.first_name === '' ? '-' : user.first_name}</td>
                                <td className={styles.row}>{user.email}</td>
                                <td className={styles.row}>{user.fatsecret_account === false ? <False /> : <True />}</td>
                                <td className={styles.row}>{user.role}</td>
                                <td className={styles.row}>{user.coach === null ? '-' : user.coach}</td>
                            </div>

                            {/* <button onClick={() => handleEdit(user.id)}><Delete /></button> */}
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
                        </tr>

                    ))}
                </tbody>
                <div className={styles.footer}>
                    <div className={styles.pgn_panel}>
                        <p className={styles.info}>Всего пользователей: <p className={styles.count}>{data.length}</p></p>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                className={`${styles.btn} ${currentPage === index + 1 ? styles.active : ''}`}
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                disabled={currentPage === index + 1}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>

            </table>

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
        </div>
    );
};

export default TableUsers;
