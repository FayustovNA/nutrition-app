import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUserRequestApi } from '../../api'
import { TUserRegister } from '../types/user'
import AvatarDefault from '../../images/avatar_def.png'
import { setTokens } from '../auth/authService'

export type TGetUserInfo = {
    id?: number | undefined
    email: string | undefined
    username: string | undefined
    role: string | undefined
    first_name?: string | undefined,
    last_name?: string | undefined,
    fatsecret_account?: string | undefined
}

export type LoginError = {
    message: string;
    code: number;
};

interface IUserSliceState {
    isLoggedIn: boolean
    loginRequest: boolean
    loginFailed: boolean
    loginError: boolean
    username: string
    email: string
    password: string
    role: string,
    avatar: string,
    age: string,
    location: string,
    startWeigth: string,
    targetWeigth: string,
    target: string,
    startDate: string,
    fatsecret_account: boolean,
}

const initialState: IUserSliceState = {
    username: '',
    email: '',
    fatsecret_account: false,
    password: '***',
    role: '',
    age: 'не задан',
    location: 'не задан',
    loginRequest: false,
    loginFailed: false,
    isLoggedIn: false,
    loginError: false,
    avatar: AvatarDefault,
    startWeigth: 'не задан',
    targetWeigth: 'не задан',
    target: 'снижение веса',
    startDate: 'не задана',
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
            });
            dispatch(setUserData(response));
            setTokens(response.access, response.refresh);
            return response;
        } catch (error) {
            return rejectWithValue(error as LoginError);
        }
    }
);

// const refreshToken = async (): Promise<string> => {
//     try {
//         const response = await refreshTokenRequestApi({
//             refreshToken: getRefreshToken(),
//         });
//         setTokens(response.accessToken, response.refreshToken);
//         return response.accessToken;
//     } catch (error) {
//         removeTokens();
//         throw error;
//     }
// };


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            Object.assign(state, {
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                fatsecret_account: action.payload.fatsecret_account,
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
                fatsecret_account: action.payload.fatsecret_account,
            })
        },
    },
})

export default userSlice.reducer
export const { setUserData, logoutUser, loginUser } = userSlice.actions
