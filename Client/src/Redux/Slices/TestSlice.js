import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance.js";

const initialState = {
    tests: [],
    currentTest: null,
    loading: false,
};

// Async thunk to create a new test
export const createTest = createAsyncThunk(
    "test/create",
    async ({ courseId, data }) => {
        try {
            const res = await axiosInstance.post(`/test/course/${courseId}`, data);
            toast.success("Test created successfully");
            return res.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create test");
            throw error;
        }
    }
);

// Async thunk to get a test by course ID
export const getTestByCourseId = createAsyncThunk(
    "test/getByCourseId",
    async (courseId) => {
        try {
            const res = await axiosInstance.get(`/test/course/${courseId}`);
            return res.data.test;
        } catch (error) {
            // Don't show a toast message if no test is found
            if (error?.response?.status !== 404) {
                toast.error(error?.response?.data?.message || "Failed to fetch test");
            }
            throw error;
        }
    }
);

// Async thunk to get a test by its ID
export const getTestById = createAsyncThunk(
    "test/getById",
    async (testId) => {
        try {
            const res = await axiosInstance.get(`/test/${testId}`);
            return res.data.test;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch test details");
            throw error;
        }
    }
);


// Async thunk to add a question to a test
export const addQuestionToTest = createAsyncThunk(
    "test/addQuestion",
    async ({ testId, data }) => {
        try {
            const res = await axiosInstance.post(`/test/${testId}/questions`, data);
            toast.success("Question added successfully");
            return res.data.test;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add question");
            throw error;
        }
    }
);

// Async thunk to remove a question from a test
export const removeQuestionFromTest = createAsyncThunk(
    "test/removeQuestion",
    async ({ testId, questionId }) => {
        try {
            const res = await axiosInstance.delete(`/test/${testId}/questions/${questionId}`);
            toast.success("Question removed successfully");
            return res.data.test;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to remove question");
            throw error;
        }
    }
);

// Async thunk to delete a test
export const deleteTest = createAsyncThunk(
    "test/delete",
    async (testId) => {
        try {
            await axiosInstance.delete(`/test/${testId}`);
            toast.success("Test deleted successfully");
            return testId;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete test");
            throw error;
        }
    }
);


const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create Test
            .addCase(createTest.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTest.fulfilled, (state, action) => {
                state.loading = false;
                state.tests.push(action.payload.test);
            })
            .addCase(createTest.rejected, (state) => {
                state.loading = false;
            })
            // Get Test by Course ID
            .addCase(getTestByCourseId.pending, (state) => {
                state.loading = true;
                state.currentTest = null; 
            })
            .addCase(getTestByCourseId.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTest = action.payload;
            })
            .addCase(getTestByCourseId.rejected, (state) => {
                state.loading = false;
                state.currentTest = null;
            })
             // Get Test by ID
             .addCase(getTestById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTestById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTest = action.payload;
            })
            .addCase(getTestById.rejected, (state) => {
                state.loading = false;
            })
            // Add question to test
            .addCase(addQuestionToTest.fulfilled, (state, action) => {
                state.currentTest = action.payload;
            })
            // Remove question from test
            .addCase(removeQuestionFromTest.fulfilled, (state, action) => {
                state.currentTest = action.payload;
            })
            // Delete Test
            .addCase(deleteTest.fulfilled, (state, action) => {
                state.tests = state.tests.filter(test => test._id !== action.payload);
                if (state.currentTest?._id === action.payload) {
                    state.currentTest = null;
                }
            });
    },
});

export default testSlice.reducer;
