import {createSlice} from "@reduxjs/toolkit";
import {AddCommentThunk} from "../../Middleware/CommentThunk.js";

const initialState = {
    loading: false,
    error: null,
    list: [],
    failed: false
}

export const AddCommentReducer = createSlice({
    name: "addCommentReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddCommentThunk.pending, (state) => {
                state.loading = true;
                    state.failed = false;
            })
            .addCase(AddCommentThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.failed = false;
            })
            .addCase(AddCommentThunk.rejected, (state, action) => {
                state.loading = true;
                state.list = null;
                state.error = action.payload;
                state.failed = true;
            })
    }
});

export default AddCommentReducer.reducer;