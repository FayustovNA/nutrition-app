import { API_URL } from '../utils/config'
import { getAccessToken } from '../services/auth/authService'
import { apiRequest } from './utils'

// admin@yandex.ru Qwe123!!!

//Fayustov@mail.com Fayustov123

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

//Запрос проекта по строке поиска (query)
export const getProjectBySearch = async (search: string) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        // Добавляем строку поиска как query параметр
        const response = await apiRequest(`${API_URL}/project?user=${encodeURIComponent(search)}`, {
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

// POST запрос для передачи|создания данных проекта
export const createProject = async (projectData: {
    user: string;
    coach: string;
    start_date: string;
    target_calories: number;
    target_carbohydrate: number;
    target_fat: number;
    target_fiber: number;
    target_protein: number;
    target_sugar: number;
    target_weight: number;
}) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }
        // POST запрос для создания нового проекта с переданными данными
        const response = await apiRequest(`${API_URL}/project/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(projectData), // Передаем данные в формате JSON
        });

        if (response) {
            return response;
        } else {
            throw new Error('Failed to create project');
        }
    } catch (error) {
        console.error('Error creating project:', error);
    }
};

// PATCH запрос для обновления данных проекта по id
export const updateProject = async (projectId: string, updateData: {
    coach?: string;
    start_date?: string;
    target_calories?: number;
    target_carbohydrate?: number;
    target_fat?: number;
    target_fiber?: number;
    target_protein?: number;
    target_sugar?: number;
    target_weight?: number;
}) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }
        // PATCH запрос для обновления проекта с переданными данными
        const response = await apiRequest(`${API_URL}/project/${projectId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(updateData), // Передаем только те данные, которые нужно обновить
        });

        if (response) {
            return response;
        } else {
            throw new Error('Failed to update project');
        }
    } catch (error) {
        console.error('Error updating project:', error);
    }
};