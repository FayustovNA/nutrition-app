import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsersList } from '../../api/admin';
import { TGetUserInfo } from './userSlice';

interface UsersListState {
    users: TGetUserInfo[];
    loading: boolean;
    error: any | null;
}

const initialState: UsersListState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsersList = createAsyncThunk<TGetUserInfo[], void, { rejectValue: string }>(
    'usersList/fetchUsersList',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await getUsersList();

            if (response && Array.isArray(response)) {
                dispatch(setUsersData(response));
                return response as TGetUserInfo[]; // Уточняем, что это массив
            } else {
                return rejectWithValue('No users found');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch users';
            return rejectWithValue(message);
        }
    }
);

// Create slice
const usersListSlice = createSlice({
    name: 'usersList',
    initialState,
    reducers: {
        setUsersData(state, action) {
            state.users = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersList.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchUsersList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch users';
            });
    },
});

export type TProjectData = {
    user: string;
    coach: string;
    start_date: string;
    target_calories: number;
    target_carbohydrate: number;
    target_fat: number;
    target_fiber: number;
    target_protein: number;
    target_sugar: number;
    target_weight: number;
}

export default usersListSlice.reducer;
export const { setUsersData } = usersListSlice.actions;
