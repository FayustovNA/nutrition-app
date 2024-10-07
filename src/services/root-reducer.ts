import { combineReducers } from 'redux'
import userSlice from './slices/userSlice'
import registerSlice from './slices/registerSlice'
import fatSecretSlice from './slices/fatSecretSlice'
import usersListSlice from './slices/adminPanelSlice'

export const rootReducer = combineReducers({
    userData: userSlice,
    fatSecretDataMonth: fatSecretSlice,
    register: registerSlice,
    usersList: usersListSlice,
})

export type RootState = ReturnType<typeof rootReducer>