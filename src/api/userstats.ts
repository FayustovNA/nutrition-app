import { BASE_URL as API_URL } from '../utils/config'
import { authorizedRequest } from './utils'

// Запрос на фатсикрет для обновления новых данных
export const postFoodDiaryList = async () => {
    try {
        // Выполняем GET запрос без параметров
        const response = await authorizedRequest(`${API_URL}/fooddiary/`, {
            method: 'POST',
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
        // Добавляем строку поиска как query параметр
        const response = await authorizedRequest(`${API_URL}/fooddiary/?user=${encodeURIComponent(user)}`, {
            method: 'GET',
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

// Запрос списка top продуктов
export const getTopFoodListWeek = async (user: string) => {
    try {
        // Добавляем строку поиска как query параметр
        const response = await authorizedRequest(`${API_URL}/fatsecret/foods_weekly/?user=${encodeURIComponent(user)}`, {
            method: 'GET',
        });

        // Возвращаем пустой объект, если данных нет
        if (response && Object.keys(response).length > 0) {
            return response;
        } else {
            return {};  // Пустой объект, соответствующий типу TopFoodListResponse
        }
    } catch (error) {
        console.error('Error fetching FoodDiary data:', error);
        return {};  // Пустой объект в случае ошибки
    }
};
