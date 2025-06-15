import {createSlice} from "@reduxjs/toolkit";
import {RemoveCoursesLearningThunk} from "../../Middleware/CourseThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null
}


export const RemoveCoursesLearningReducer = createSlice({
    name: "removeCoursesLearningReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(RemoveCoursesLearningThunk.pending, state => {
                state.loading = true;
            })
            .addCase(RemoveCoursesLearningThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(RemoveCoursesLearningThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});