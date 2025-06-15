import {createSlice} from "@reduxjs/toolkit";
import {WeatherThunk} from "../../Middleware/WeatherThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null
}

export const WeatherReducer = createSlice({
    name: "weatherReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(WeatherThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(WeatherThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(WeatherThunk.rejected, (state, action) => {
                state.list = [];
                state.error = action.payload;
                state.loading = true;
            })
    }
});