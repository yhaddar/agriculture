import {createSlice} from "@reduxjs/toolkit";
import {CoursesCategoryThunk} from "../../Middleware/CourseThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null
}


export const CoursesCategoryReducer = createSlice({
    name: "coursesCategoryReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CoursesCategoryThunk.pending, state => {
                state.loading = true;
            })
            .addCase(CoursesCategoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(CoursesCategoryThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});

export default CoursesCategoryReducer.reducer;