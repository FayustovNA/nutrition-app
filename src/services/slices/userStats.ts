import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFoodDiaryList as getFoodDiaryListApi } from '../../api/userstats';

// Типы для данных дневника
export type TFoodDiaryData = {
    id: number;
    user: {
        id: number;
        username: string;
        email: string;
        image: string;
        first_name: string;
        last_name: string;
        role: string;
        coach: string;
        fatsecret_account: string;
    };
    date: string;
    calories_actual: number;
    calories_target: number;
    carbohydrate_actual: number;
    carbohydrate_target: number;
    fat_actual: number;
    fat_target: number;
    fiber_actual: number;
    fiber_target: number;
    protein_actual: number;
    protein_target: number;
    sugar_actual: number;
    sugar_target: number;
    weight_actual: number;
    weight_target: number;
};

// Типы для состояния
export type TFoodDiaryState = {
    foodDiaryRequest: boolean;
    foodDiarySuccess: boolean;
    foodDiaryFailed: boolean;
    foodDiaryData: TFoodDiaryData[] | null;
    error: any | null;
};

// Начальное состояние
export const initialState: TFoodDiaryState = {
    foodDiaryRequest: false,
    foodDiarySuccess: false,
    foodDiaryFailed: false,
    foodDiaryData: null,
    error: null,
};

export const getFoodDiaryBySearch = createAsyncThunk(
    'foodDiary/getBySearch',
    async (user: string, { dispatch, rejectWithValue }) => {
        try {
            // Вызываем функцию API с параметром пользователя
            const response = await getFoodDiaryListApi(user);
            if (response && Array.isArray(response)) {
                dispatch(setFoodDiaryData(response)); // Сохраняем весь массив данных
                return response;
            } else {
                return rejectWithValue('No food diary found');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch food diary';
            return rejectWithValue(message);
        }
    }
);

// export const getFoodDiaryBySearch = createAsyncThunk(
//     'foodDiary/getBySearch',
//     async (_, { dispatch, rejectWithValue }) => {
//         try {
//             // Вызываем функцию API без передачи параметра поиска
//             const response = await getFoodDiaryListApi();
//             if (response && Array.isArray(response)) {
//                 dispatch(setFoodDiaryData(response)); // Сохраняем весь массив данных
//                 return response;
//             } else {
//                 return rejectWithValue('No food diary found');
//             }
//         } catch (error) {
//             const message = error instanceof Error ? error.message : 'Failed to fetch food diary';
//             return rejectWithValue(message);
//         }
//     }
// );

// Slice для управления дневниками
const foodDiarySlice = createSlice({
    name: 'foodDiary',
    initialState,
    reducers: {
        setFoodDiaryData(state, action) {
            state.foodDiaryData = action.payload; // Сохраняем массив данных
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getFoodDiaryBySearch.pending, (state) => {
            state.foodDiaryRequest = true;
            state.foodDiarySuccess = false;
            state.foodDiaryFailed = false;
            state.error = null;
        });
        builder.addCase(getFoodDiaryBySearch.fulfilled, (state, action) => {
            state.foodDiaryRequest = false;
            state.foodDiarySuccess = true;
            state.foodDiaryFailed = false;
            state.foodDiaryData = action.payload; // Сохраняем весь массив данных
        });
        builder.addCase(getFoodDiaryBySearch.rejected, (state, action) => {
            state.foodDiaryRequest = false;
            state.foodDiarySuccess = false;
            state.foodDiaryFailed = true;
            state.error = action.payload;
        });
    },
});

export const { setFoodDiaryData } = foodDiarySlice.actions;
export default foodDiarySlice.reducer;