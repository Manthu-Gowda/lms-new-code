import { configureStore } from "@reduxjs/toolkit";

import AuthSliceReducer from "./Slices/AuthSlice";
import CourseSliceReducer from "./Slices/CourseSlice";
import LecturesReducer from './Slices/LectureSlice'
import  StatReducer from './Slices/StatSlice';
import TestSliceReducer from './Slices/TestSlice';

const store = configureStore({
    reducer:{
        auth:AuthSliceReducer,
        course: CourseSliceReducer, 
        lecture:LecturesReducer,
        stat:StatReducer,
        test: TestSliceReducer,
    },
    devTools: true
})
export default store;