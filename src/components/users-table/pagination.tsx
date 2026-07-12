import styles from './pagination.module.css';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className={styles.pagination}>
            <button
                className={styles.arrow}
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                aria-label="Предыдущая страница"
            >
                ‹
            </button>
            <span className={styles.pageInfo}>
                Стр. {page} из {totalPages}
            </span>
            <button
                className={styles.arrow}
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                aria-label="Следующая страница"
            >
                ›
            </button>
        </div>
    );
};

export default Pagination;
