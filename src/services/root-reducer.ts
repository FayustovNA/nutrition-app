import { combineReducers } from 'redux'
import userSlice from './slices/userSlice'
import registerSlice from './slices/registerSlice'
import fatSecretSlice from './slices/fatSecretSlice'

export const rootReducer = combineReducers({
    userData: userSlice,
    fatSecretDataMonth: fatSecretSlice,
    register: registerSlice,
})

export type RootState = ReturnType<typeof rootReducer>