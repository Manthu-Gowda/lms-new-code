import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosinstance";

const initialState={
    lectures:[]
}
 
export const getCourseLectures= createAsyncThunk("/course/lecture/get", async(cid)=>{
    try {
        const response = axiosInstance.get(`/course/${cid}`);
        toast.promise(response,{
            loading:"Fetching course lectures",
            success:"Lectures fetched successfully",
            error:"Failed to load the lectures"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const addCourseLectures = createAsyncThunk("/course/lecture/add", async (data) => {
    try {
        const { id, formData } = data; // Destructure the id and formData from the payload
        const response = axiosInstance.post(`/course/${id}`, formData);
        toast.promise(response, {
            loading: "Adding course lecture",
            success: "Lecture added successfully",
            error: "Failed to add the lecture"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const deleteCourseLecture= createAsyncThunk("/course/lecture/delete", async(data)=>{
    try {

        const response = axiosInstance.delete(`/course/${data.courseId}/lectures/${data.lectureId}`);
        toast.promise(response,{
            loading:"Deleting course lecture",
            success:"Lecture deleted successfully",
            error:"Failed to delete the lecture"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const lectureSlice = createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCourseLectures.fulfilled,(state, action)=>{
            state.lectures=action?.payload?.lectures;
        })
        .addCase(addCourseLectures.fulfilled,(state, action)=>{
            // The backend should return the updated course with the new lectures list
            if(action?.payload?.course?.lectures) {
                state.lectures = action.payload.course.lectures;
            }
        })
    }

})
export default lectureSlice.reducer;