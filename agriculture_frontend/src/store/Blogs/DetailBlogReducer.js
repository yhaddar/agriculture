import {createSlice} from "@reduxjs/toolkit";
import {DetailBlogThunk} from "../../Middleware/BlogsThunk.js";

const initialState = {
    loading: true,
    list: null,
    error: null
}

export const DetailBlogReducer = createSlice({
   name: "detailBlogsReducer",
   initialState,
   reducers: {},
    extraReducers: (builder) => {
       builder
           .addCase(DetailBlogThunk.pending, state => {
               state.loading = true
           })
           .addCase(DetailBlogThunk.fulfilled, (state, action) => {
               state.loading = false;
               state.list = action.payload.data
           })
           .addCase(DetailBlogThunk.rejected, (state, action) => {
               state.loading = true;
               state.list = null;
               state.error = action.payload
           })
    }
});