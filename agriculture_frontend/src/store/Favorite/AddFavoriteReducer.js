import {AddToFavoriteThunk} from "../../Middleware/FavoriteThunk.js";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    list: [],
    error: null
}


export const AddToFavoriteReducer = createSlice({
    name: "addToFavoriteReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddToFavoriteThunk.pending, state => {
                state.loading = true;
            })
            .addCase(AddToFavoriteThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(AddToFavoriteThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});