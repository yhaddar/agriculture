import {createSlice} from "@reduxjs/toolkit";
import {NewsHomeThunk} from "../../Middleware/ServiceThunk.js";

const initialState = {
    loading: true,
    list: [],
    error: null
}

export const NewsHomeReducer = createSlice({
    name: "NewsHomeReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(NewsHomeThunk.pending, state => {
                state.loading = true
            })
            .addCase(NewsHomeThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload
            })
            .addCase(NewsHomeThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })
    }
});
