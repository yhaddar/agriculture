import {createSlice} from "@reduxjs/toolkit";
import {AddCommentThunk, AllCommentThunk} from "../../Middleware/CommentThunk.js";

const initialState = {
    loading: false,
    error: null,
    list: [],
}

export const AllCommentReducer = createSlice({
    name: "allCommentReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllCommentThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(AllCommentThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data;
            })
            .addCase(AllCommentThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload;
            })
    }
});

export default AllCommentReducer.reducer;