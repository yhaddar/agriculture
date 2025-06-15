import {createSlice} from "@reduxjs/toolkit";
import {AllReviewThunk} from "../../Middleware/ReviewThunk.js";

const initialState = {
    loading: true,
    list: [],
    error: null
}


export const AllReviewReducer = createSlice({
    name: "AllReviewReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllReviewThunk.pending, state => {
                state.loading = true;
            })
            .addCase(AllReviewThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(AllReviewThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }

});

export default AllReviewReducer.reducer;