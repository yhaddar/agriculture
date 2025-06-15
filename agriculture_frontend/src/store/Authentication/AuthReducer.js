import {createSlice} from "@reduxjs/toolkit";
import {AuthThunk} from "../../Middleware/AuthThunk.js";

const initialState = {
    list: {},
    error: null,
    loading: false,
    failed: false,
}

export const AuthReducer = createSlice({
    name: "AuthReducer",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(AuthThunk.pending, (state) => {
                state.loading = true;
                state.failed = false;
            })
            .addCase(AuthThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.failed = false;
            })
            .addCase(AuthThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload;
                state.failed = true;
            })
    }
});

export default AuthReducer.reducer;