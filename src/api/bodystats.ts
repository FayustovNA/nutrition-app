import { BASE_URL as API_URL } from '../utils/config'
import { apiRequest } from './utils'
import { getAccessToken } from '../services/auth/authService';

// Запрос данных статистики по строке поиска (query)
export const getStatisticsBySearch = async (search: string) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }
        // Формируем URL с query параметром
        const response = await apiRequest(`${API_URL}/bodystats/?user=${encodeURIComponent(search)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        if (response) {
            return response; // Возвращаем полученные данные
        } else {
            throw new Error('Data not found in the response');
        }
    } catch (error) {
        console.error('Error fetching statistics data:', error);
    }
};

// POST запрос для передачи|создания статистики по замерам 
export const createBodyStatistics = async (statisticsData: {
    user?: string;
    date: string;
    abdominal: number;
    chest: number;
    hips: number;
    neck: number;
    waist: number;
}) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        // Отправка POST-запроса для создания новой записи статистики
        const response = await apiRequest(`${API_URL}/bodystats/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(statisticsData), // Передаем данные в формате JSON
        });

        if (response) {
            return response; // Возвращаем данные из ответа
        } else {
            throw new Error('Failed to create statistics');
        }
    } catch (error) {
        console.error('Error creating statistics:', error);
    }
};