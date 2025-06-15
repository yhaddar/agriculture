import {createSlice} from "@reduxjs/toolkit";
import {AddReviewThunk} from "../../Middleware/ReviewThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null,
    failed: false,
}


export const AddReviewReducer = createSlice({
    name: "AddReviewReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddReviewThunk.pending, state => {
                state.loading = true;
                state.failed = false;
            })
            .addCase(AddReviewThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.failed = false;
            })
            .addCase(AddReviewThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload;
                state.failed = true;
            });
    }

});