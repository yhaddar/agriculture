import {createSlice} from "@reduxjs/toolkit";
import {AddMyLearningThunk} from "../../Middleware/CourseThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null,
    failed: false
}


export const AddToMyLearning = createSlice({
    name: "addToMyLearning",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddMyLearningThunk.pending, state => {
                state.loading = true;
                state.failed = false;
            })
            .addCase(AddMyLearningThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.failed = false;
            })
            .addCase(AddMyLearningThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload;
                state.failed = true;
            })

    }
});