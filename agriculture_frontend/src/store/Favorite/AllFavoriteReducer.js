import {createSlice} from "@reduxjs/toolkit";
import {AllFavoriteThunk} from "../../Middleware/FavoriteThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null
}


export const AllFavoriteReducer = createSlice({
    name: "allFavoriteReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllFavoriteThunk.pending, state => {
                state.loading = true;
            })
            .addCase(AllFavoriteThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(AllFavoriteThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});