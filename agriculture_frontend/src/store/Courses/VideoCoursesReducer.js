import {createSlice} from "@reduxjs/toolkit";
import {VideoCoursesThunk} from "../../Middleware/CourseThunk.js";

const initialState = {
    loading: false, list: [], error: null
}


export const VideoCoursesReducer = createSlice({
    name: "videoCoursesThunk", initialState, reducers: {}, extraReducers: (builder) => {
        builder
            .addCase(VideoCoursesThunk.pending, state => {
                state.loading = true;
            })
            .addCase(VideoCoursesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(VideoCoursesThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});

export default VideoCoursesReducer.reducer;