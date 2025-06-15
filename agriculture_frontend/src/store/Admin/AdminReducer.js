import {createSlice} from "@reduxjs/toolkit";
import {AdminThunk} from "../../Middleware/AdminThunk.js";

const initialState = {
    loading: false, list: [], error: null
}

export const AdminReducer = createSlice({
    name: "userReducer", initialState, reducers: {}, extraReducers: (builder) => {
        builder
            .addCase(AdminThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(AdminThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(AdminThunk.rejected, (state, action) => {
                state.list = [];
                state.error = action.payload;
                state.loading = true;
            })
    }
});

export default AdminReducer.reducer;