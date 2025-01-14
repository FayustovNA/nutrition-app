// Типизация данных пользователя
export type TUser = {
    credentials: {
        email: string;
        access: string;
        refresh: string;
    };
    profile: {
        first_name: string
        last_name: string
        avatar: string;
        username: string;
        _id: string;
    };
    role: string;
    _id: string;
};

export interface IUserAuthError {
    message: string;
    error: string;
    statusCode: number;
}

export type TUserRegister = {
    first_name?: string
    last_name?: string
    username?: string
    email?: string
    role?: string
    password?: string
    confirmPassword?: string
}

export type TUserRegisterResponse = {
    access: string;
    refresh: string;
    id: number;
    username: string;
    email: string;
    role: string;
    password: string;
    confirmPassword: string;
    first_name: string;
    last_name: string;
    fatsecret_account: boolean;
};

export type TLoginProfile = Pick<TUserRegister, 'email' | 'password'>