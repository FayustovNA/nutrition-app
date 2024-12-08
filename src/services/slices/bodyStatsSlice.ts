import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStatisticsBySearch as getStatisticsBySearchApi, createBodyStatistics as createBodyStatisticsApi } from '../../api/bodystats';

// Типы для данных статистики
export type TStatisticsData = {
    id?: number;
    user?: string;
    date?: string;
    abdominal?: number;
    chest?: number;
    hips?: number;
    neck?: number;
    waist?: number;
};

// Типы для состояния
export type TStatisticsState = {
    getStatisticsRequest: boolean;
    getStatisticsSuccess: boolean;
    getStatisticsFailed: boolean;
    createStatisticsRequest: boolean;
    createStatisticsSuccess: boolean;
    createStatisticsFailed: boolean;
    statisticsData: TStatisticsData[] | null;
    error: any | null;
};

// Начальное состояние
export const initialState: TStatisticsState = {
    getStatisticsRequest: false,
    getStatisticsSuccess: false,
    getStatisticsFailed: false,
    createStatisticsRequest: false,
    createStatisticsSuccess: false,
    createStatisticsFailed: false,
    statisticsData: null,
    error: null,
};

// Асинхронный thunk для получения данных статистики по поисковой строке (GET)
export const getStatisticsBySearch = createAsyncThunk(
    'statistics/getBySearch',
    async (search: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await getStatisticsBySearchApi(search);
            if (response && Array.isArray(response)) {
                dispatch(setBodyStatisticsData(response)); // Сохраняем данные в store
                return response;
            } else {
                return rejectWithValue('No statistics data found');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch statistics data';
            return rejectWithValue(message);
        }
    }
);


// Асинхронный thunk для создания данных статистики (POST)
export const createBodyStatistics = createAsyncThunk(
    'statistics/create',
    async (statisticsData: {
        user?: string;
        date: string;
        abdominal: number;
        chest: number;
        hips: number;
        neck: number;
        waist: number;
    }, { dispatch, rejectWithValue }) => {
        try {
            const response = await createBodyStatisticsApi(statisticsData);
            if (response) {
                dispatch(addBodyStatistics(response)); // Добавляем данные в store
                return response;
            } else {
                return rejectWithValue('Failed to create body statistics');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create body statistics';
            return rejectWithValue(message);
        }
    }
);
// Slice для управления данными статистики
export const statisticsBodySlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        setBodyStatisticsData(state, action) {
            state.statisticsData = action.payload;
        },
        addBodyStatistics(state, action) {
            if (state.statisticsData) {
                state.statisticsData.push(action.payload); // Добавляем новые данные в массив
            } else {
                state.statisticsData = [action.payload];
            }
        },
    },
    extraReducers(builder) {
        // Обработка GET getStatisticsBySearch
        builder.addCase(getStatisticsBySearch.pending, (state) => {
            state.getStatisticsRequest = true;
            state.getStatisticsSuccess = false;
            state.getStatisticsFailed = false;
            state.error = null;
        });
        builder.addCase(getStatisticsBySearch.fulfilled, (state) => {
            state.getStatisticsRequest = false;
            state.getStatisticsSuccess = true;
            state.getStatisticsFailed = false;
        });
        builder.addCase(getStatisticsBySearch.rejected, (state, action) => {
            state.getStatisticsRequest = false;
            state.getStatisticsSuccess = false;
            state.getStatisticsFailed = true;
            state.error = action.payload;
        });

        // Обработка POST createBodyStatistics
        builder.addCase(createBodyStatistics.pending, (state) => {
            state.createStatisticsRequest = true;
            state.createStatisticsSuccess = false;
            state.createStatisticsFailed = false;
            state.error = null;
        });
        builder.addCase(createBodyStatistics.fulfilled, (state) => {
            state.createStatisticsRequest = false;
            state.createStatisticsSuccess = true;
            state.createStatisticsFailed = false;
        });
        builder.addCase(createBodyStatistics.rejected, (state, action) => {
            state.createStatisticsRequest = false;
            state.createStatisticsSuccess = false;
            state.createStatisticsFailed = true;
            state.error = action.payload;
        });
    },
});

export const { setBodyStatisticsData, addBodyStatistics } = statisticsBodySlice.actions;
export default statisticsBodySlice.reducer;