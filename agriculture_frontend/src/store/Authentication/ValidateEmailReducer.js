import {createSlice} from "@reduxjs/toolkit";
import {ValidateEmailResetPasswordThunk} from "../../Middleware/AuthThunk.js";

const initialState = {
    list: {},
    error: null,
    loading: false,
    failed: false,
}

export const ValidateEmailReducer = createSlice({
    name: "ValidateEmailReducer",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(ValidateEmailResetPasswordThunk.pending, (state) => {
                state.loading = true;
                state.failed = false;
            })
            .addCase(ValidateEmailResetPasswordThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.failed = false;
            })
            .addCase(ValidateEmailResetPasswordThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload;
                state.failed = true;
            })
    }
});

export default ValidateEmailReducer.reducer;