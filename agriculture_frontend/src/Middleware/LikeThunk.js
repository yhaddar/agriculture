import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

export const AddLikeThunk = createAsyncThunk(
    "favoriteThunk/addLikeThunk",
    async ({ type, body }) => {
        return ServiceAPI.setAPIWithToken(`like/${type}`, "add", body);
    }
)

export const RemoveFromFavoriteThunk = createAsyncThunk(
    "favoriteThunk/removeFromFavoriteThunk",
    async ({ type, id }) => {
        return ServiceAPI.deleteWithToken(`favorite/${type}`, `delete/${id}`);
    }
)