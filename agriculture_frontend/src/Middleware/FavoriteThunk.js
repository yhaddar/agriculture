import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

export const AddToFavoriteThunk = createAsyncThunk(
    "favoriteThunk/addToFavoriteThunk",
    async ({ type, body }) => {
        return ServiceAPI.setAPIWithToken(`favorite/${type}`, "add", body);
    }
)

export const RemoveFromFavoriteThunk = createAsyncThunk(
    "favoriteThunk/removeFromFavoriteThunk",
    async ({ type, id }) => {
        return ServiceAPI.deleteWithToken(`favorite/${type}`, `delete/${id}`);
    }
)

export const AllFavoriteThunk = createAsyncThunk(
    "favoriteThunk/AllFavoriteThunk",
    async () => {
        return ServiceAPI.getDataWithToken(`favorite/my`, `all`);
    }
)