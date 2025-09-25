import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosinstance';

const initialState = {
    testResult: null,
    loading: false,
    error: null
};

export const submitTest = createAsyncThunk(
    'testResults/submitTest',
    async ({ testId, answers }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/test-results/${testId}`, { answers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getTestResult = createAsyncThunk(
    'testResults/getTestResult',
    async (testId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/test-results/${testId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const testResultSlice = createSlice({
    name: 'testResults',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitTest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitTest.fulfilled, (state, action) => {
                state.loading = false;
                state.testResult = action.payload.testResult;
            })
            .addCase(submitTest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getTestResult.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTestResult.fulfilled, (state, action) => {
                state.loading = false;
                state.testResult = action.payload.testResult;
            })
            .addCase(getTestResult.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default testResultSlice.reducer;
