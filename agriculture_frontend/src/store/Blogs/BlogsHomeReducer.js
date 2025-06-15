import {createSlice} from "@reduxjs/toolkit";
import {BlogsHomeThunk} from "../../Middleware/ServiceThunk.js";

const initialState = {
    loading: true,
    list: [],
    error: null
}

export const BlogsHomeReducer = createSlice({
    name: "BlogsHomeReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(BlogsHomeThunk.pending, state => {
                state.loading = true
            })
            .addCase(BlogsHomeThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload
            })
            .addCase(BlogsHomeThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })
    }
});
