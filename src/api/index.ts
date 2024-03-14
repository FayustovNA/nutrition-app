/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUserRegister, TUserRegisterResponse } from '../services/types/user'
import { TLoginProfile } from '../services/slices/registerSlice'
import { API_URL } from '../utils/config';

export const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then(() => Promise.reject(res.status))
}

// // Вспомогательная функция для обработки полученного ответа с сервера
// export const checkResponse = <T>(res: Response): Promise<T> => {
//     return res.ok
//         ? res.json()
//         : res
//             .json()
//             .then((err) => Promise.reject({ ...err, statusCode: res.status }));
// }


export const apiRequest = <T>(
    url: string,
    options: RequestInit
): Promise<T> => {
    return fetch(url, options)
        .then((res) => checkResponse<T>(res));
}



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