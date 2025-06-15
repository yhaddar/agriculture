import {createSlice} from "@reduxjs/toolkit";
import {InnovationDetailThunk} from "../../Middleware/InnovationThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null
}


export const InnovationDetailReducer = createSlice({
    name: "innovationDetailReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(InnovationDetailThunk.pending, state => {
                state.loading = true;
            })
            .addCase(InnovationDetailThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(InnovationDetailThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});

export default InnovationDetailReducer.reducer;