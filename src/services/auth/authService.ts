// Функция для сохранения токена в localStorage
const setTokens = (access: string, refresh: string): void => {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
};

// Функция для получения токена из localStorage
const getAccessToken = (): string | null => {
    const accessToken = localStorage.getItem('access');
    return accessToken ?? null;
};

// Функция для получения рефреш-токена из localStorage
const getRefreshToken = () => localStorage.getItem('refresh');

// Функция для удаления токенов
const removeTokens = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
};

export { getAccessToken, getRefreshToken, removeTokens, setTokens };