import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

const serviceAPI = new ServiceAPI();

export const NewsThunk = createAsyncThunk(
    "serviceThunk/news",
    async () => {
        return await serviceAPI.getService("service/news");
    }
)