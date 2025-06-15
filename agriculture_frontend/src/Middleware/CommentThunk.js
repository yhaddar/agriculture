import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

export const AddCommentThunk = createAsyncThunk(
    "commentThunk/addCommentThunk",
    async ({ key1, body }) => {
        return await ServiceAPI.setAPIWithToken(`comments/${key1}`, "add", body);
    }
)

export const AllCommentThunk = createAsyncThunk(
    "commentThunk/allCommentThunk",
    async ({ key1, key2 }) => {
        return await ServiceAPI.getAllCategoriesServices(`comments/${key1}/all`, `${key2}`)
    }
)