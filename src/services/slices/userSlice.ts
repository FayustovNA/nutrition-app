import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUserRequestApi } from '../../api'
import { TUserRegister } from '../types/user'
import { setTokens, removeTokens } from '../auth/authService'
import { updateUserRequestApi } from '../../api/auth'
import { getUserRequestApi } from '../../api/auth'
import { refreshToken } from '../../api'

export type TGetUserInfo = {
    coach?: string | null
    id?: any
    email: string | undefined
    username: string | undefined
    role: string | undefined
    first_name?: string | undefined
    last_name?: string | undefined
    fatsecret_account?: any
    image?: string
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
    first_name: string
    last_name: string
    email: string
    password: string
    role: string,
    image: string,
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
    first_name: 'не задано',
    last_name: 'не задана',
    loginRequest: false,
    loginFailed: false,
    isLoggedIn: false,
    loginError: false,
    image: '',
    startWeigth: 'не задан',
    targetWeigth: 'не задан',
    target: 'снижение веса',
    startDate: 'не задана',
}

// Логирование пользователя
export const loginIn = createAsyncThunk(
    'user/login',
    async ({ email, password }: TUserRegister, { dispatch, rejectWithValue }) => {
        try {
            const response = await loginUserRequestApi({ email, password });
            dispatch(setUserData(response));
            setTokens(response.access, response.refresh);
            return response;
        } catch (error) {
            return rejectWithValue(error as LoginError);
        }
    }
);

// Обновление данных пользователя
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await updateUserRequestApi(formData); // Отправляем FormData
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Получение данных пользователя
export const fetchUserData = createAsyncThunk<TGetUserInfo, void>(
    'user/fetchUserData',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem('access');
            if (!accessToken) {
                throw new Error('No access token');
            }

            const response = await getUserRequestApi();
            return response as TGetUserInfo;
        } catch (error: any) {
            if (error.message === 'Failed to fetch user data') {
                await refreshToken();
                const userData = await getUserRequestApi();
                dispatch(setUserData(userData));
            }
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            Object.assign(state, {
                username: action.payload.username,
                image: action.payload.image,
                email: action.payload.email,
                role: action.payload.role,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                fatsecret_account: action.payload.fatsecret_account,
                isLoggedIn: true,
            });
        },
        logoutUser: (state) => {
            removeTokens();
            Object.assign(state, {
                loginRequest: false,
                loginFailed: false,
                isLoggedIn: false,
                loginError: false,
                username: '',
                email: '',
                role: '',
                first_name: '',
                last_name: '',
                image: '',
            });
        },
        loginUser: (state, action) => {
            Object.assign(state, {
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                image: action.payload.image,
                isLoggedIn: true,
                fatsecret_account: action.payload.fatsecret_account,
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loginRequest = true;
                state.loginFailed = false;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loginRequest = false;
                state.loginFailed = false;

                // Обновляем данные пользователя
                Object.assign(state, {
                    username: action.payload.username,
                    email: action.payload.email,
                    role: action.payload.role,
                    first_name: action.payload.first_name,
                    last_name: action.payload.last_name,
                    image: action.payload.image,
                    fatsecret_account: action.payload.fatsecret_account,
                    isLoggedIn: true,
                });
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.loginRequest = false;
                state.loginFailed = true;
            });
    },
});

export default userSlice.reducer;
export const { setUserData, logoutUser, loginUser } = userSlice.actions;