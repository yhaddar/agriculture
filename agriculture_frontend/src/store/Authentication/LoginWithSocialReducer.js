import {createSlice} from "@reduxjs/toolkit";
import {LoginWithSocialThunk} from "../../Middleware/AuthThunk.js";

const initialState = {
    list: {},
    error: null,
    loading: false,
    failed: false,
}

export const LoginWithSocialReducer = createSlice({
    name: "loginWithSocialReducer",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(LoginWithSocialThunk.pending, (state) => {
                state.loading = true;
                state.failed = false;
            })
            .addCase(LoginWithSocialThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.failed = false;
            })
            .addCase(LoginWithSocialThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload;
                state.failed = true;
            })
    }
});