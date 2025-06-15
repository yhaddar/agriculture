import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

export const AllReviewThunk = createAsyncThunk(
    "reviewThunk/allReviewThunk",
    async ({page, size}) => {
        return await ServiceAPI.getBlogsWithPagination("review", `all?page=${page}&size=${size}`);
    }
);

export const AddReviewThunk = createAsyncThunk(
    "reviewThunk/addReviewThunk",
    async ({body}) => {
        return await ServiceAPI.setAPIWithToken("review", "add", body)
    }
);