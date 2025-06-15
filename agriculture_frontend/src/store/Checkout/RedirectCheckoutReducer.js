import {createSlice} from "@reduxjs/toolkit";
import {CheckoutThunk} from "../../Middleware/CheckoutThunk.js";

const initialState = {
    loading: false,
    error: null,
    list: [],
    failed: false
}

export const RedirectCheckoutReducer = createSlice({
    name: "redirectCheckoutReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CheckoutThunk.pending, (state) => {
                state.loading = true;
                state.failed = false;
            })
            .addCase(CheckoutThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.failed = false;
            })
            .addCase(CheckoutThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload;
                state.failed = true;
            })
    }
});