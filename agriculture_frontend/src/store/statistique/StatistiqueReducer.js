import {createSlice} from "@reduxjs/toolkit";
import {StatistiqueThunk} from "../../Middleware/StatistiqueThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null
}

export const StatistiqueReducer = createSlice({
    name: "statistiqueReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(StatistiqueThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(StatistiqueThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(StatistiqueThunk.rejected, (state, action) => {
                state.list = [];
                state.error = action.payload;
                state.loading = true;
            })
    }
});

export default StatistiqueReducer.reducer;