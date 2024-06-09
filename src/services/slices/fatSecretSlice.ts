import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getFatSecretMonthData } from '../../api/fatsecret';

interface Day {
    calories: string;
    carbohydrate: string;
    date_int: string;
    fat: string;
    protein: string;
}

interface Month {
    day: Day[];
    from_date_int: string;
    to_date_int: string;
}

interface NutritionMonthData {
    month: Month;
}

// interface FatSecretDataResponse {
//     nutritionMonthData: NutritionMonthData;
//     status: string;
//     message?: string;
// }

const initialState: NutritionMonthData = {
    month: {
        day: [
            {
                calories: "0",
                carbohydrate: "0",
                date_int: "0",
                fat: "0",
                protein: "0"
            }
        ],
        from_date_int: "0",
        to_date_int: "0"
    }
};


export const fetchFatSecretMonthData = createAsyncThunk(
    'fatSecretSlice',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await getFatSecretMonthData() as any;
            console.log(response.month);
            if (response.month) {
                dispatch(setFatSecretData(response.month)); // Assuming you have an action setFatSecretData
                return response.month;
            } else {
                return rejectWithValue({ message: response?.message || 'Unknown error' });
            }
        } catch (error: any) {
            return rejectWithValue({ message: error.message });
        }
    }
);


// Create slice
const fatSecretSlice = createSlice({
    name: 'fatSecretSlice',
    initialState,
    reducers: {
        setFatSecretData(state, action) {
            state.month = action.payload;
        },

    },
});

export default fatSecretSlice.reducer;
export const { setFatSecretData } = fatSecretSlice.actions;


