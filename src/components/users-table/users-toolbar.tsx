import styles from './users-toolbar.module.css';
import { UsersRoleFilter } from '../../hooks/useUsersTable';

interface UsersToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    totalCount: number;
    showRoleFilter?: boolean;
    roleFilter?: UsersRoleFilter;
    onRoleFilterChange?: (value: UsersRoleFilter) => void;
    showCoachFilter?: boolean;
    coachFilter?: string | null;
    onCoachFilterChange?: (value: string | null) => void;
    coachOptions?: string[];
}

const UsersToolbar: React.FC<UsersToolbarProps> = ({
    search,
    onSearchChange,
    totalCount,
    showRoleFilter,
    roleFilter = 'all',
    onRoleFilterChange,
    showCoachFilter,
    coachFilter,
    onCoachFilterChange,
    coachOptions = [],
}) => {
    return (
        <div className={styles.toolbar}>
            <input
                className={styles.search}
                type="text"
                placeholder="Поиск по имени, username или email"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <div className={styles.filters}>
                {showRoleFilter && (
                    <div className={styles.roleTabs}>
                        <button
                            className={`${styles.btnFilter} ${roleFilter === 'all' ? styles.active : ''}`}
                            onClick={() => onRoleFilterChange?.('all')}
                        >
                            Все
                        </button>
                        <button
                            className={`${styles.btnFilter} ${roleFilter === 'clients' ? styles.active : ''}`}
                            onClick={() => onRoleFilterChange?.('clients')}
                        >
                            Клиенты
                        </button>
                        <button
                            className={`${styles.btnFilter} ${roleFilter === 'coaches' ? styles.active : ''}`}
                            onClick={() => onRoleFilterChange?.('coaches')}
                        >
                            Тренеры
                        </button>
                    </div>
                )}

                {showCoachFilter && (
                    <select
                        className={`${styles.coachSelect} ${coachFilter ? styles.active : ''}`}
                        value={coachFilter || ''}
                        onChange={(e) => onCoachFilterChange?.(e.target.value || null)}
                    >
                        <option value="">По тренеру</option>
                        {coachOptions.map((coach) => (
                            <option key={coach} value={coach}>
                                {coach}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className={styles.count}>
                Всего: <span className={styles.countValue}>{totalCount}</span>
            </div>
        </div>
    );
};

export default UsersToolbar;
