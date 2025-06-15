import {createSlice} from "@reduxjs/toolkit";
import {CoursesHomeThunk} from "../../Middleware/CourseThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null
}


export const CoursesHomeReducer = createSlice({
    name: "coursesHomeReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CoursesHomeThunk.pending, state => {
                state.loading = true;
            })
            .addCase(CoursesHomeThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(CoursesHomeThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});