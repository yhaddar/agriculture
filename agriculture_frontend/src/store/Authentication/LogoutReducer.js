import {createSlice} from "@reduxjs/toolkit";
import {LogoutThunk} from "../../Middleware/AuthThunk.js";

const initialState = {
    list: {},
    error: null,
    loading: false,
}

export const LogoutReducer = createSlice({
    name: "LogoutReducer",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(LogoutThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(LogoutThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(LogoutThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload;
            })
    }
});

export default LogoutReducer.reducer;