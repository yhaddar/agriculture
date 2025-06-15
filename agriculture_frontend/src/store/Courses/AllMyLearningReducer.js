import {createSlice} from "@reduxjs/toolkit";
import {AllMyLearningThunk} from "../../Middleware/CourseThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null,
    failed: false
}


export const AllMyLearning = createSlice({
    name: "allMyLearning",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllMyLearningThunk.pending, state => {
                state.loading = true;
                state.failed = false;
            })
            .addCase(AllMyLearningThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.failed = false;
            })
            .addCase(AllMyLearningThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload;
                state.failed = true;
            })

    }
});