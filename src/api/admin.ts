import { API_URL } from '../utils/config'
import { getAccessToken } from '../services/auth/authService'
import { apiRequest } from './utils'

// admin@yandex.ru
// Qwe123!!!

//Запрос листа пользователей
export const getUsersList = async () => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }
        const response = await apiRequest(`${API_URL}/users/`, {
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
        console.error('Error fetching UsersList data:', error);
    }
};


// Запрос на удаление пользователя по ID
interface ApiResponse {
    ok: boolean;
    status: number;
    statusText: string;
    json: () => Promise<any>;
}

export const deleteUserById = async (userId: string): Promise<ApiResponse | void> => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }
        const response: ApiResponse = await apiRequest(`${API_URL}/users/${userId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`, // Исправлено: добавлены обратные кавычки
            },
        });
        // Проверяем, что статус ответа равен 204
        if (response.status === 204) {
            console.log('Пользователь удален успешно');
            return; // Возвращаем ничего, так как 204 не содержит тела ответа
        } else {
            const errorData = await response.json();
            throw new Error(`Ошибка при удалении пользователя: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting user data:', error);
    }
}

//Запрос проекта по id
export const getProjectById = async (userId: string | number) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }
        const response = await apiRequest(`${API_URL}/api/project/${userId}/`, {
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
        console.error('Error fetching project data:', error);
    }
};
