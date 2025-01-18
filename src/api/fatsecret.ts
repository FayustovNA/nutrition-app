import { BASE_URL as API_URL } from '../utils/config'
import { getAccessToken } from '../services/auth/authService'
import { apiRequest } from './utils'

//Запрос на получение ссылки привязки аккаунта fatsecret
export const getFatSecretRequestLink = async () => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const response = await apiRequest<{ authorize_url: string }>(`${API_URL}/fatsecret/request/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        if (response && response.authorize_url) {
            window.open(response.authorize_url, '_blank');
        } else {
            throw new Error('Link not found in the response');
        }
    } catch (error) {
        console.error('Error fetching FatSecret request link:', error);
    }
};

export const getFatSecretDiary = async (diaryData: any, username?: string) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        // Формируем URL с учетом необязательного параметра username
        let url = `${API_URL}/fatsecret/foods_daily/?date=${diaryData}`;
        if (username) {
            url += `&user=${encodeURIComponent(username)}`;
        }

        const response = await apiRequest(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response) {
            return response;
        } else {
            throw new Error('Data not found in the response');
        }
    } catch (error) {
        console.error('Error fetching FatSecret foods data:', error);
    }
};

// POST запрос обновления статистики по строке поиска (query)
export const refreshStatisticsBySearch = async (username: string) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }
        // Формируем URL с параметром запроса
        const url = `${API_URL}/fooddiary/?user=${encodeURIComponent(username)}`;

        // Выполняем POST запрос
        const response = await apiRequest(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        // Проверяем успешность запроса
        if (response) {
            return response; // Возвращаем ответ, если он есть
        } else {
            throw new Error('Data not found in the response');
        }
    } catch (error) {
        console.error('Error fetching statistics data with POST request:', error);
        throw error; // Пробрасываем ошибку выше
    }
};

// POST запрос обновления статистики по строке поиска (query)
export const resetStatisticsBySearch = async (username: string) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }
        // Формируем URL с параметром запроса
        const url = `${API_URL}/fooddiary/?user=${encodeURIComponent(username)}&reload=true`;

        // Выполняем POST запрос
        const response = await apiRequest(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        // Проверяем успешность запроса
        if (response) {
            return response; // Возвращаем ответ, если он есть
        } else {
            throw new Error('Data not found in the response');
        }
    } catch (error) {
        console.error('Error fetching statistics data with POST request:', error);
        throw error; // Пробрасываем ошибку выше
    }
};