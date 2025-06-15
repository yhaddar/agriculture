import {SettingThunk} from "../../Middleware/SettingThunk.js";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    list: [],
    error: null
}

export const SettingReducer = createSlice({
    name: "settingReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SettingThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(SettingThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(SettingThunk.rejected, (state, action) => {
                state.list = [];
                state.error = action.payload;
                state.loading = true;
            })
    }
});

export default SettingReducer.reducer;