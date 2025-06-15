import {createSlice} from "@reduxjs/toolkit";
import {CoursesDetailThunk} from "../../Middleware/CourseThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null
}


export const CoursesDetailReducer = createSlice({
    name: "coursesDetailReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CoursesDetailThunk.pending, state => {
                state.loading = true;
            })
            .addCase(CoursesDetailThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(CoursesDetailThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});

export default CoursesDetailReducer.reducer;