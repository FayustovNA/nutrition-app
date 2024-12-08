import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createProject as createProjectApi, getProjectBySearch as getProjectBySearchApi, updateProject as updateProjectApi } from '../../api/admin'

// Типы для данных проекта
export type TProjectData = {
    user: string;
    id?: any;
    coach: any;
    start_date: string;
    target_calories: number;
    target_carbohydrate: number;
    target_fat: number;
    target_fiber: number;
    target_protein: number;
    target_sugar: number;
    target_weight: number;
    start_weight: number;
}

// Типы для состояния
export type TProjectState = {
    createProjectRequest: boolean;
    createProjectSuccess: boolean;
    createProjectFailed: boolean;
    getProjectRequest: boolean;
    getProjectSuccess: boolean;
    getProjectFailed: boolean;
    updateProjectRequest: boolean;
    updateProjectSuccess: boolean;
    updateProjectFailed: boolean;
    projectData: TProjectData | null;
    error: any | null;
}

// Начальное состояние
export const initialState: TProjectState = {
    createProjectRequest: false,
    createProjectSuccess: false,
    createProjectFailed: false,
    getProjectRequest: false,
    getProjectSuccess: false,
    getProjectFailed: false,
    updateProjectRequest: false,
    updateProjectSuccess: false,
    updateProjectFailed: false,
    projectData: null,
    error: null,
}

// Асинхронный thunk для создания проекта (POST)
export const createProject = createAsyncThunk(
    'project/create',
    async (projectData: TProjectData, { dispatch, rejectWithValue }) => {
        try {
            const response = await createProjectApi(projectData);
            if (response) {
                dispatch(setProjectData(response)); // Используем dispatch
                return response;
            } else {
                return rejectWithValue('Failed to create project');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create project';
            return rejectWithValue(message);
        }
    }
)

// Асинхронный thunk для получения проекта по поисковой строке (GET)
export const getProjectBySearch = createAsyncThunk(
    'project/getBySearch',
    async (search: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await getProjectBySearchApi(search);
            if (response && Array.isArray(response) && response.length > 0) {
                const project = response[0]; // Берем первый элемент массива
                dispatch(setProjectData(project)); // Используем dispatch
                return project;
            } else {
                return rejectWithValue('No project found');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch project';
            return rejectWithValue(message);
        }
    }
)

// Асинхронный thunk для обновления проекта (PATCH)
export const updateProject = createAsyncThunk(
    'project/update',
    async ({ projectId, updateData }: { projectId: string, updateData: Partial<TProjectData> }, { dispatch, rejectWithValue }) => {
        try {
            const response = await updateProjectApi(projectId, updateData);
            if (response) {
                dispatch(setProjectData(response));
                return response;
            } else {
                return rejectWithValue('Failed to update project');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update project';
            return rejectWithValue(message);
        }
    }
)

// Slice для управления проектом
export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjectData(state, action) {
            state.projectData = action.payload;
        }
    },
    extraReducers(builder) {
        // Обработка POST createProject
        builder.addCase(createProject.pending, (state) => {
            state.createProjectRequest = true;
            state.createProjectSuccess = false;
            state.createProjectFailed = false;
            state.error = null;
        })
        builder.addCase(createProject.fulfilled, (state) => {
            state.createProjectRequest = false;
            state.createProjectSuccess = true;
            state.createProjectFailed = false;
        })
        builder.addCase(createProject.rejected, (state, action) => {
            state.createProjectRequest = false;
            state.createProjectSuccess = false;
            state.createProjectFailed = true;
            state.error = action.payload;
        })

        // Обработка GET getProjectBySearch
        builder.addCase(getProjectBySearch.pending, (state) => {
            state.getProjectRequest = true;
            state.getProjectSuccess = false;
            state.getProjectFailed = false;
            state.projectData = null;
            state.error = null;
        })
        builder.addCase(getProjectBySearch.fulfilled, (state) => {
            state.getProjectRequest = false;
            state.getProjectSuccess = true;
            state.getProjectFailed = false;
        })
        builder.addCase(getProjectBySearch.rejected, (state, action) => {
            state.getProjectRequest = false;
            state.getProjectSuccess = false;
            state.getProjectFailed = true;
            state.error = action.payload;
        })

        // Обработка PATCH updateProject
        builder.addCase(updateProject.pending, (state) => {
            state.updateProjectRequest = true;
            state.updateProjectSuccess = false;
            state.updateProjectFailed = false;
            state.error = null;
        })
        builder.addCase(updateProject.fulfilled, (state) => {
            state.updateProjectRequest = false;
            state.updateProjectSuccess = true;
            state.updateProjectFailed = false;
        })
        builder.addCase(updateProject.rejected, (state, action) => {
            state.updateProjectRequest = false;
            state.updateProjectSuccess = false;
            state.updateProjectFailed = true;
            state.error = action.payload;
        })
    },
})

export const { setProjectData } = projectSlice.actions;
export default projectSlice.reducer;