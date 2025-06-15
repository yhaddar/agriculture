import {InnovationThunk} from "../../Middleware/InnovationThunk.js";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    list: null,
    error: null
}

export const InnovationReducer = createSlice({
    name: "newsReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(InnovationThunk.pending, state => {
                state.loading = true;
            })
            .addCase(InnovationThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(InnovationThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});

export default InnovationReducer.reducer;