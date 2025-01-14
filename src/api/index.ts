import { TUserRegister, TUserRegisterResponse } from '../services/types/user'
import { TLoginProfile } from '../services/slices/registerSlice'
// import { apiRequest } from './utils'
import { BASE_URL as API_URL } from '../utils/config'
import { setTokens } from '../services/auth/authService'

// Запрос на регистрацию пользователя
export const registerUserRequestApi = async ({
    first_name,
    last_name,
    username,
    email,
    role,
    password,
    confirmPassword,
}: TUserRegister): Promise<TUserRegisterResponse> => {
    const response = await fetch(`${API_URL}/signup/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            role: role,
            password: password,
            confirm_password: confirmPassword,
        }),
    });

    if (!response.ok) {
        // Если сервер вернул ошибку, читаем тело ответа и выбрасываем исключение
        const errorData = await response.json();
        throw errorData;
    }

    // Если запрос успешен, возвращаем данные
    return response.json();
};

// Запрос на логирование
export const loginUserRequestApi = async ({ email, password }: TLoginProfile): Promise<TUserRegisterResponse> => {
    try {
        const response = await fetch(`${API_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Login failed');
        }
        const data: TUserRegisterResponse = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Функция для обновления токена
export const refreshToken = async (): Promise<void> => {
    const refreshToken = localStorage.getItem('refresh');
    if (!refreshToken) {
        throw new Error('No refresh token');
    }

    const response = await fetch(`${API_URL}/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    setTokens(data.access, data.refresh);
};