import { BASE_URL as API_URL } from '../utils/config'
import { apiRequest } from './utils'
import { getAccessToken } from '../services/auth/authService'

//Обновление данных пользователя
export const updateUserRequestApi = async (formData: FormData) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error('Access token не найден');
    }

    const response = await apiRequest(`${API_URL}/users/me/`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: formData, // Отправляем данные в формате FormData
    });

    if (response) {
        return response; // Ожидаем, что сервер вернет обновленные данные
    } else {
        throw new Error('Не удалось обновить данные пользователя');
    }
};

// Получение данных пользователя
export const getUserRequestApi = async () => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const response = await apiRequest(`${API_URL}/users/me/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response) {
            return response;
        } else {
            throw new Error('Failed to fetch user data');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

//Активация пользователя
export const activateUser = async (uid: string, token: string): Promise<void> => {
    const response = await fetch(`${API_URL}/users/activation/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, token }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.detail || 'Ошибка при активации аккаунта.');
    }
};