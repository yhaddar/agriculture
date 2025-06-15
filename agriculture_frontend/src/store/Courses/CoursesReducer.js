import {createSlice} from "@reduxjs/toolkit";
import {CoursesThunk} from "../../Middleware/CourseThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null
}


export const CoursesReducer = createSlice({
    name: "coursesReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CoursesThunk.pending, state => {
                state.loading = true;
            })
            .addCase(CoursesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(CoursesThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});

export default CoursesReducer.reducer;