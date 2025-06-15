import {RemoveFromFavoriteThunk} from "../../Middleware/FavoriteThunk.js";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    list: [],
    error: null
}


export const RemoveFavoriteReducer = createSlice({
    name: "removeFavoriteReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(RemoveFromFavoriteThunk.pending, state => {
                state.loading = true;
            })
            .addCase(RemoveFromFavoriteThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(RemoveFromFavoriteThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});