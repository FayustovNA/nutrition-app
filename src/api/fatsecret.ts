import { BASE_URL as API_URL } from '../utils/config'
import { authorizedRequest } from './utils'

//Запрос на получение ссылки привязки аккаунта fatsecret
export const getFatSecretRequestLink = async () => {
    try {
        const response = await authorizedRequest<{ authorize_url: string }>(`${API_URL}/fatsecret/request/`, {
            method: 'GET',
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
        // Формируем URL с учетом необязательного параметра username
        let url = `${API_URL}/fatsecret/foods_daily/?date=${diaryData}`;
        if (username) {
            url += `&user=${encodeURIComponent(username)}`;
        }

        const response = await authorizedRequest(url, {
            method: 'GET',
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
        // Формируем URL с параметром запроса
        const url = `${API_URL}/fooddiary/?user=${encodeURIComponent(username)}`;

        // Выполняем POST запрос
        const response = await authorizedRequest(url, {
            method: 'POST',
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
        // Формируем URL с параметром запроса
        const url = `${API_URL}/fooddiary/?user=${encodeURIComponent(username)}&reload=true`;

        // Выполняем POST запрос
        const response = await authorizedRequest(url, {
            method: 'POST',
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
