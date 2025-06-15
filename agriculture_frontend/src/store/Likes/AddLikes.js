import {createSlice} from "@reduxjs/toolkit";
import {AddLikeThunk} from "../../Middleware/LikeThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null
}


export const AddToLikeReducer = createSlice({
    name: "addToLikeReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddLikeThunk.pending, state => {
                state.loading = true;
            })
            .addCase(AddLikeThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(AddLikeThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});