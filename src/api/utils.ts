import { getAccessToken } from '../services/auth/authService'
import { refreshToken } from './index'

// Проверка ответа
export const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then(() => Promise.reject(res.status))
}

// Запрос
export const apiRequest = <T>(
    url: string,
    options: RequestInit
): Promise<T> => {
    return fetch(url, options)
        .then((res) => checkResponse<T>(res));
}

// Дедуплицируем refresh — если несколько запросов словили 401 одновременно,
// токен обновляется один раз, а не по разу на каждый запрос
let refreshInFlight: Promise<void> | null = null;
const ensureFreshToken = (): Promise<void> => {
    if (!refreshInFlight) {
        refreshInFlight = refreshToken().finally(() => {
            refreshInFlight = null;
        });
    }
    return refreshInFlight;
};

const buildAuthHeaders = (options: RequestInit): Headers => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error('Access token not found');
    }

    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${accessToken}`);
    if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json;charset=utf-8');
    }
    return headers;
};

// Авторизованный запрос: добавляет access-токен в заголовки, бросает ошибку,
// если токена нет, и при 401 один раз обновляет токен и повторяет запрос —
// избавляет вызывающие функции от повторения этой логики
export const authorizedRequest = async <T>(
    url: string,
    options: RequestInit = {}
): Promise<T> => {
    let res = await fetch(url, { ...options, headers: buildAuthHeaders(options) });

    if (res.status === 401) {
        await ensureFreshToken();
        res = await fetch(url, { ...options, headers: buildAuthHeaders(options) });
    }

    return checkResponse<T>(res);
}