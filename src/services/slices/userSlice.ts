import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUserRequestApi } from '../../api'
import { TUserRegister } from '../types/user'

export type TGetUserInfo = {
    id: number
    email: string
    username: string
    role: string
}

interface IUserSliceState {
    isLoggedIn: boolean
    loginRequest: boolean
    loginFailed: boolean
    loginError: boolean
    username: string
    email: string
    password: string
    role: string,
    avatar: string
}

const initialState: IUserSliceState = {
    username: '',
    email: '',
    password: '',
    role: '',
    loginRequest: false,
    loginFailed: false,
    isLoggedIn: false,
    loginError: false,
    avatar: '../../../src/images/avatar_def.png',
}

export const loginIn = createAsyncThunk(
    'user/login',
    async (
        { email, password }: TUserRegister,
        { dispatch, rejectWithValue }
    ) => {
        try {
            const response = await loginUserRequestApi({
                email,
                password,
            })
            dispatch(setUserData(response))
            localStorage.setItem('userToken', response.username)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            Object.assign(state, {
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                isLoggedIn: true,
                isCoach: false,
            })
        },
        logoutUser: (state) => {
            Object.assign(state, {
                loginRequest: false,
                loginFailed: false,
                isLoggedIn: false,
                loginError: false,
            })
        },
        loginUser: (state, action) => {
            Object.assign(state, {
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                isLoggedIn: true,
            })
        },
    },
})

export default userSlice.reducer
export const { setUserData, logoutUser, loginUser } = userSlice.actions
