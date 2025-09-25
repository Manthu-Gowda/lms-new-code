import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";

const initialState = {
    projectSubmission: null,
    loading: false,
};

export const submitProject = createAsyncThunk("/project/submit", async (data) => {
    try {
        const response = axiosInstance.post(`/projects/submission/${data.courseId}`, data);
        toast.promise(response, {
            loading: "Submitting project...",
            success: "Project submitted successfully!",
            error: "Failed to submit project.",
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const getProjectSubmission = createAsyncThunk("/project/getSubmission", async (courseId) => {
    try {
        const response = await axiosInstance.get(`/projects/submission/${courseId}`);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(submitProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projectSubmission = action.payload.submission;
            })
            .addCase(submitProject.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getProjectSubmission.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProjectSubmission.fulfilled, (state, action) => {
                state.loading = false;
                state.projectSubmission = action.payload.submission;
            })
            .addCase(getProjectSubmission.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default projectSlice.reducer;
