import {createSlice} from "@reduxjs/toolkit";
import {ServiceThunk} from "../../Middleware/ServiceThunk.js";

const initialState = {
    loading: true,
    list: [],
    error: null
}

export const ServiceReducer = createSlice({
    name: "BlogsReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ServiceThunk.pending, state => {
                state.loading = true
            })
            .addCase(ServiceThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload
            })
            .addCase(ServiceThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })
    }
});
