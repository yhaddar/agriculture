import {createSlice} from "@reduxjs/toolkit";
import {DeleteAccountThunk} from "../../Middleware/AuthThunk.js";

const initialState = {
    list: {},
    error: null,
    loading: false,
    failed: false,
}

export const DeleteAccountReducer = createSlice({
    name: "deleteAccountReducer",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(DeleteAccountThunk.pending, (state) => {
                state.loading = true;
                state.failed = false;
            })
            .addCase(DeleteAccountThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.failed = false;
            })
            .addCase(DeleteAccountThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload;
                state.failed = true;
            })
    }
});

