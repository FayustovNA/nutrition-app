import { API_URL } from '../utils/config'
import { getAccessToken } from '../services/auth/authService'
import { apiRequest } from './utils';

//Запрос на получение ссылки привязки аккаунта fatsecret
export const getFatSecretRequestLink = async () => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const response = await apiRequest<{ authorize_url: string }>(`${API_URL}/fatsecret/request/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`,
            },
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

//Запрос дневников за месяц
export const getFatSecretMonthData = async () => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const response = await apiRequest(`${API_URL}/fatsecret/foods_mothly/`, {
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
        console.error('Error fetching FatSecret foods data:', error);
    }
};

//Запрос дневника по дате
export const getFatSecretDiary = async (diaryData: any) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const response = await apiRequest(`${API_URL}/fatsecret/foods_daily?=${diaryData}`, {
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
        console.error('Error fetching FatSecret foods data:', error);
    }
};