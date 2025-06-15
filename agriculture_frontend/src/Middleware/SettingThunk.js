import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

export const SettingThunk = createAsyncThunk(
    "setting/settingThunk",
    async ({ key1, key2 }) => {
        return await ServiceAPI.getAPIWithoutPagination(key1, key2);
    }
)