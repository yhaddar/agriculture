import {createSlice} from "@reduxjs/toolkit";
import {ValidateAccountThunk} from "../../Middleware/AuthThunk.js";

const initialState = {
    list: {},
    error: null,
    loading: false,
    failed: false,
}

export const EmailReducer = createSlice({
    name: "EmailReducer",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(ValidateAccountThunk.pending, (state) => {
                state.loading = true;
                state.failed = false;
            })
            .addCase(ValidateAccountThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.failed = false;
            })
            .addCase(ValidateAccountThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload;
                state.failed = true;
            })
    }
});

export default EmailReducer.reducer;