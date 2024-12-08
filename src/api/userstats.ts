import { API_URL } from '../utils/config'
import { getAccessToken } from '../services/auth/authService'
import { apiRequest } from './utils'

// Запрос на фатсикрет для обновления новых данных
export const postFoodDiaryList = async () => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }
        // Выполняем GET запрос без параметров
        const response = await apiRequest(`${API_URL}/fooddiary/`, {
            method: 'POST',
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
        console.error('Error fetching FoodDiary data:', error);
    }
};

// Запрос списка дневников дневников
export const getFoodDiaryList = async (user: string) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        // Добавляем строку поиска как query параметр
        const response = await apiRequest(`${API_URL}/fooddiary?user=${encodeURIComponent(user)}`, {
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
        console.error('Error fetching FoodDiary data:', error);
    }
};
// export const getFoodDiaryList = async () => {
//     try {
//         const accessToken = getAccessToken();
//         if (!accessToken) {
//             throw new Error('Access token not found');
//         }
//         // Выполняем GET запрос без параметров
//         const response = await apiRequest(`${API_URL}/fooddiary/`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8',
//                 'Authorization': `Bearer ${accessToken}`,
//             },
//         });

//         if (response) {
//             return response;
//         } else {
//             throw new Error('Data not found in the response');
//         }
//     } catch (error) {
//         console.error('Error fetching FoodDiary data:', error);
//     }
// };
