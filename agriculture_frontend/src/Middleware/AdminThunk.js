import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

export const AdminThunk = createAsyncThunk(
    "admin/adminThunk",
    async ({ key1, key2 }) => {
        return await ServiceAPI.getAPIWithoutPagination(key1, key2);
    }
)