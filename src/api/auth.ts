import { API_URL } from '../utils/config'
import { apiRequest } from './utils'
// import { TGetUserInfo } from '../services/slices/userSlice'
import { getAccessToken } from '../services/auth/authService';

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
// export const updateUserRequestApi = async ({
//     first_name,
//     last_name,
//     username,
//     email,
//     image,
// }: Partial<TGetUserInfo>) => {
//     try {
//         const accessToken = getAccessToken();
//         if (!accessToken) {
//             throw new Error('Access token not found');
//         }

//         const formData = new FormData();
//         if (first_name) formData.append('first_name', first_name);
//         if (last_name) formData.append('last_name', last_name);
//         if (username) formData.append('username', username);
//         if (email) formData.append('email', email);
//         if (image) formData.append('image', image); // Добавляем файл

//         const response = await apiRequest(`${API_URL}/users/me/`, {
//             method: 'PATCH',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//             },
//             body: formData, // Отправляем FormData
//         });

//         if (response) {
//             return response;
//         } else {
//             throw new Error('Failed to update user data');
//         }
//     } catch (error) {
//         console.error('Error updating user data:', error);
//         throw error;
//     }
// };


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