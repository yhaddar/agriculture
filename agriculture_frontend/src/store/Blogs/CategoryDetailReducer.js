import {createSlice} from "@reduxjs/toolkit";
import {CategoryBlogsThunk} from "../../Middleware/BlogsThunk.js";

const initialState = {
    loading: false,
    error: null,
    list: []
}

export const CategoryDetailReducer = createSlice({
    name: "categoryDetailServiceReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CategoryBlogsThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(CategoryBlogsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data;
            })
            .addCase(CategoryBlogsThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload
            })
    }
})