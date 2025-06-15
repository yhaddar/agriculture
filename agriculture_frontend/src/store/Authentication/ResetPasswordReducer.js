import {createSlice} from "@reduxjs/toolkit";
import {ResetPasswordThunk} from "../../Middleware/AuthThunk.js";

const initialState = {
    list: {},
    error: null,
    loading: false,
    failed: false,
}

export const ResetPasswordReducer = createSlice({
    name: "ResetPasswordReducer",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(ResetPasswordThunk.pending, (state) => {
                state.loading = true;
                state.failed = false;
            })
            .addCase(ResetPasswordThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.failed = false;
            })
            .addCase(ResetPasswordThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload;
                state.failed = true;
            })
    }
});

export default ResetPasswordReducer.reducer;