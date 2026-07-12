import { useMemo, useState } from 'react';
import { TGetUserInfo } from '../services/slices/userSlice';

export type UsersRoleFilter = 'all' | 'clients' | 'coaches';
export type UsersSortField = 'name' | 'email' | 'role' | 'coach';
export type UsersSortDirection = 'asc' | 'desc';

interface UseUsersTableOptions {
    pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 12;

const getSortValue = (user: TGetUserInfo, field: UsersSortField): string => {
    switch (field) {
        case 'name':
            return `${user.last_name || ''} ${user.first_name || ''}`.trim().toLowerCase();
        case 'email':
            return (user.email || '').toLowerCase();
        case 'role':
            return (user.role || '').toLowerCase();
        case 'coach':
            return (user.coach || '').toLowerCase();
        default:
            return '';
    }
};

// Инкапсулирует поиск/фильтры/сортировку/пагинацию списка пользователей.
// Работает на уже загруженном массиве (без сетевых запросов) — используется
// и на странице администратора (полный список), и на странице тренера (его клиенты).
export function useUsersTable(users: TGetUserInfo[], options: UseUsersTableOptions = {}) {
    const pageSize = options.pageSize ?? DEFAULT_PAGE_SIZE;

    const [search, setSearchState] = useState('');
    const [roleFilter, setRoleFilterState] = useState<UsersRoleFilter>('all');
    const [coachFilter, setCoachFilterState] = useState<string | null>(null);
    const [sortField, setSortField] = useState<UsersSortField>('name');
    const [sortDirection, setSortDirection] = useState<UsersSortDirection>('asc');
    const [page, setPage] = useState(1);

    const coachOptions = useMemo(
        () => Array.from(new Set(users.map((user) => user.coach).filter(Boolean))) as string[],
        [users]
    );

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();

        return users
            .filter((user) => {
                if (roleFilter === 'clients') return user.role !== 'coach' && user.role !== 'admin';
                if (roleFilter === 'coaches') return user.role === 'coach';
                return true;
            })
            .filter((user) => (coachFilter ? user.coach === coachFilter : true))
            .filter((user) => {
                if (!query) return true;
                const haystack = [user.first_name, user.last_name, user.username, user.email]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();
                return haystack.includes(query);
            });
    }, [users, roleFilter, coachFilter, search]);

    const sorted = useMemo(() => {
        const copy = [...filtered];
        copy.sort((a, b) => {
            const result = getSortValue(a, sortField).localeCompare(getSortValue(b, sortField));
            return sortDirection === 'asc' ? result : -result;
        });
        return copy;
    }, [filtered, sortField, sortDirection]);

    const totalCount = sorted.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const safePage = Math.min(page, totalPages);

    const pageItems = useMemo(
        () => sorted.slice((safePage - 1) * pageSize, safePage * pageSize),
        [sorted, safePage, pageSize]
    );

    const toggleSort = (field: UsersSortField) => {
        if (field === sortField) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const setSearch = (value: string) => {
        setSearchState(value);
        setPage(1);
    };

    const setRoleFilter = (value: UsersRoleFilter) => {
        setRoleFilterState(value);
        setPage(1);
    };

    const setCoachFilter = (value: string | null) => {
        setCoachFilterState(value);
        setPage(1);
    };

    return {
        search,
        setSearch,
        roleFilter,
        setRoleFilter,
        coachFilter,
        setCoachFilter,
        coachOptions,
        sortField,
        sortDirection,
        toggleSort,
        page: safePage,
        setPage,
        totalPages,
        totalCount,
        pageItems,
    };
}
