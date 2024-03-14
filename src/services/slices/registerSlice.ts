import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { registerUserRequestApi } from '../../api'
import { TUserRegister } from '../types/user'
import { setUserData } from './userSlice'

export type TRegisterState = {
    registerRequest: boolean
    registerSuccess: boolean
    registerFailed: boolean
}

export const initialState: TRegisterState = {
    registerRequest: false,
    registerFailed: false,
    registerSuccess: false,
}

export type TLoginProfile = Pick<TUserRegister, 'email' | 'password'>

export const registerUser = createAsyncThunk(
    'registration/register',
    async (
        { first_name, last_name, username, email, role, password, confirmPassword }: TUserRegister,
        { dispatch, rejectWithValue }
    ) => {
        try {
            const response = await registerUserRequestApi({
                first_name,
                last_name,
                username,
                email,
                role,
                password,
                confirmPassword,
            })
            dispatch(setUserData(response))
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const registerSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(registerUser.pending, (state) => {
            state.registerRequest = true
            state.registerSuccess = false
            state.registerFailed = false
        })
        builder.addCase(registerUser.fulfilled, (state) => {
            state.registerRequest = false
            state.registerSuccess = true
            state.registerFailed = false
        })
        builder.addCase(registerUser.rejected, (state) => {
            state.registerRequest = false
            state.registerSuccess = false
            state.registerFailed = true
        })
    },
})

export default registerSlice.reducer