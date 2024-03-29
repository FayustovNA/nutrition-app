export type TUserRegister = {
    first_name: string
    last_name: string
    username: string
    email: string
    role: string
    password: string
    confirmPassword?: string
}

export type TUserRegisterResponse = {
    id: number
    username: string
    email: string
    role: string
    password: string
    confirmPassword: string
    first_name: string
    last_name: string
}

export type TLoginProfile = Pick<TUserRegister, 'email' | 'password'>
