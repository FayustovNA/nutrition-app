import styles from './delete.module.css';

interface DeleteProps {
    user?: any;
    isOpen?: boolean;
    onClose: (() => void);
    onDelete: (() => void);
}

const DeleteAction: React.FC<DeleteProps> = ({ onClose, onDelete, user }) => {

    const handleConfirmDelete = () => {
        onDelete(); // вызываем onDelete только при подтверждении
    };

    return (
        <div className={styles.item}>
            <h3 className={styles.title}>Вы действительно хотите удалить пользователя:</h3>
            <p className={styles.username}>{user.last_name} {user.first_name}</p>
            <div className={styles.confirm}>
                <button
                    className={styles.btn}
                    onClick={onClose}>
                    Нет
                </button>
                <button
                    className={styles.btn}
                    onClick={handleConfirmDelete}>
                    Да
                </button>
            </div>
        </div >
    );
};

export default DeleteAction;