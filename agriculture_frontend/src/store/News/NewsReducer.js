import {createSlice} from "@reduxjs/toolkit";
import {NewsThunk} from "../../Middleware/NewsThunk.js";

const initialState = {
    loading: true,
    list: null,
    error: null
}


export const NewsReducer = createSlice({
    name: "newsReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(NewsThunk.pending, state => {
                state.loading = true;
            })
            .addCase(NewsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(NewsThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});

export default NewsReducer.reducer;