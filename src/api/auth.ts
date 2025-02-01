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

    if (!response) {
        throw new Error('Failed to fetch user data');
    }

    return response;
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

// Восстановление пароля
export const resetPassword = async (email: any): Promise<void> => {
    const response = await fetch(`${API_URL}/users/reset_password/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.detail || 'Ошибка при отправке запроса на восстановление пароля.');
    }
};

//Установка нового пароля
interface SetNewPasswordPayload {
    uid: string;
    token: string;
    new_password: string;
    re_new_password: string;
}

export const setNewPassword = async (payload: SetNewPasswordPayload): Promise<void> => {
    const response = await fetch(`${API_URL}/users/reset_password_confirm/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.detail || 'Ошибка при изменении пароля.');
    }
};

//Обновление пароля
export const updatePassword = async (data: {
    current_password: string;
    new_password: string;
    re_new_password: string;
}): Promise<void> => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error('Access token not found');
    }
    const response = await fetch(`${API_URL}/users/set_password/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.detail || 'Ошибка при изменении пароля.');
    }
};