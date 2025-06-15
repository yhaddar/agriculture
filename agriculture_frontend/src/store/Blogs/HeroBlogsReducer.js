import {createSlice} from "@reduxjs/toolkit";
import {HeroServiceThunk} from "../../Middleware/ServiceThunk.js";

const initialState = {
    loading: true,
    list: null,
    error: null
}


export const heroBlogsReducer = createSlice({
    name: "heroBlogReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(HeroServiceThunk.pending, state => {
                state.loading = true;
            })
            .addCase(HeroServiceThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(HeroServiceThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});
