import {createSlice} from "@reduxjs/toolkit";
import {SuccessThunk} from "../../Middleware/CheckoutThunk.js";

const initialState = {
    loading: false,
    error: null,
    list: [],
    failed: false
}

export const SuccessReducer = createSlice({
    name: "successReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SuccessThunk.pending, (state) => {
                state.loading = true;
                state.failed = false;
            })
            .addCase(SuccessThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.failed = false;
            })
            .addCase(SuccessThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload;
                state.failed = true;
            })
    }
});