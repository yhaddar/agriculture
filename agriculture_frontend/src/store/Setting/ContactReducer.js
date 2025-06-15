import {createSlice} from "@reduxjs/toolkit";
import {ContactThunk} from "../../Middleware/ContactThunk.js";

const initialState = {
    loading: false,
    list: [],
    error: null
}


export const ContactReducer = createSlice({
    name: "contactReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ContactThunk.pending, state => {
                state.loading = true;
            })
            .addCase(ContactThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(ContactThunk.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })

    }
});

export default ContactReducer.reducer;