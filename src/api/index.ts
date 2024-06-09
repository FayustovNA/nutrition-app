import { TUserRegister, TUserRegisterResponse } from '../services/types/user'
import { TLoginProfile } from '../services/slices/registerSlice'
import { apiRequest } from './utils'
import { API_URL } from '../utils/config'

export const registerUserRequestApi = ({
    first_name,
    last_name,
    username,
    email,
    role,
    password,
    confirmPassword,
}: TUserRegister) => {
    return apiRequest<TUserRegisterResponse>(`${API_URL}/signup/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charger=utf-8',
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
    })
}

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
            throw new Error(errorData.message || 'Login failed');
        }

        const data: TUserRegisterResponse = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};




