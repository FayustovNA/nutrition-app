import { combineReducers } from 'redux'
import userSlice from './slices/userSlice'
import registerSlice from './slices/registerSlice'
import usersListSlice from './slices/adminPanelSlice'
import projectSlice from './slices/projectSlice'
import foodDiarySlice from './slices/userStats'
import statisticsBodySlice from './slices/bodyStatsSlice'

export const rootReducer = combineReducers({
    userData: userSlice,
    register: registerSlice,
    usersList: usersListSlice,
    projectData: projectSlice,
    userStats: foodDiarySlice,
    bodyStats: statisticsBodySlice,
})

export type RootState = ReturnType<typeof rootReducer>