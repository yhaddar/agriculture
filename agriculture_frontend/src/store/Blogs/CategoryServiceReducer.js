import {createSlice} from "@reduxjs/toolkit";
import {DetailServicesThunk} from "../../Middleware/ServiceThunk.js";

const initialState = {
    loading: false,
    error: null,
    list: []
}

export const CategoryServiceReducer = createSlice({
    name: "categoryDetailBlogsReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) =>  {
        builder
            .addCase(DetailServicesThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(DetailServicesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data;
            })
            .addCase(DetailServicesThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload
            })
    }
})