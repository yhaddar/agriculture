import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

export const CheckoutThunk = createAsyncThunk(
    "checkout/checkoutThunk",
    async () => {
        return await ServiceAPI.setAPIWithToken("checkout", "/", null);
    }
)

export const SuccessThunk = createAsyncThunk(
    "checkout/successThunk",
    async ({ body }) => {
        return await ServiceAPI.setAPIWithToken("checkout", "success", body);
    }
)