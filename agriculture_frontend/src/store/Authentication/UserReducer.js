import {createSlice} from "@reduxjs/toolkit";
import {GetUserDetailThunk} from "../../Middleware/AuthThunk.js";

const initialState = {
    list: {},
    error: null,
    loading: false,
    failed: false,
}

export const UserReducer = createSlice({
    name: "AuthReducer",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(GetUserDetailThunk.pending, (state) => {
                state.loading = true;
                state.failed = false;
            })
            .addCase(GetUserDetailThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.failed = false;
            })
            .addCase(GetUserDetailThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload;
                state.failed = true;
            })
    }
});

export default UserReducer.reducer;