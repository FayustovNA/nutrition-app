import { combineReducers } from 'redux'
import userSlice from './slices/userSlice'
import registerSlice from './slices/registerSlice'
import fatSecretSlice from './slices/fatSecretSlice'
import usersListSlice from './slices/adminPanelSlice'
import projectSlice from './slices/projectSlice'

export const rootReducer = combineReducers({
    userData: userSlice,
    fatSecretDataMonth: fatSecretSlice,
    register: registerSlice,
    usersList: usersListSlice,
    projectData: projectSlice,
})

export type RootState = ReturnType<typeof rootReducer>