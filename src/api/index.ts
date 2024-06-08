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

export const loginUserRequestApi = ({ email, password }: TLoginProfile) => {
    return apiRequest<TUserRegisterResponse>(`${API_URL}/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charger=utf-8',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
}

