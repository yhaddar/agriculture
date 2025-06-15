import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

export const AuthThunk = createAsyncThunk(
    "services/AuthThunk",
    async ({key2, body}) => {
        return await ServiceAPI.setAuthentication("auth", key2, body);
    }
)

export const ValidateAccountThunk = createAsyncThunk(
    "services/Mail",
    async ({key2}) => {
        return await ServiceAPI.validateEmail("auth", key2);
    }
)

export const GetUserDetailThunk = createAsyncThunk(
    "services/GetUserDetailThunk",
    async ({ key2 }) => {
        return await ServiceAPI.getDataWithToken("auth", key2);
    }
);

export const ValidateEmailResetPasswordThunk = createAsyncThunk(
    "services/ValidateEmailResetPasswordThunk",
    async ({ key2 }) => {
        return await ServiceAPI.setAuthentication("auth", key2);
    }
);

export const ResetPasswordThunk = createAsyncThunk(
    "services/ResetPasswordThunk",
    async ({ key2, body }) => {
        return await ServiceAPI.putDataWithoutToken("auth", key2, body);
    }
);

export const LogoutThunk = createAsyncThunk(
    "services/LogoutThunk",
    async () => {
        return await ServiceAPI.logout("auth/logout");
    }
)

export const LoginWithSocialThunk = createAsyncThunk(
    "services/LoginWithSocialThunk",
    async ({ key1, key2, body }) => {
        return ServiceAPI.loginWithSocial(`auth/${key1}`, key2, body)
    }
)

export const DeleteAccountThunk = createAsyncThunk(
    "services/DeleteAccountThun",
    async ({ key1, key2 }) => {
        return ServiceAPI.deleteAccount(`${key1}`, key2)
    }
)