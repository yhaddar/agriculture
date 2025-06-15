import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";


export const InnovationThunk = createAsyncThunk(
    "innovationThunk/service",
    async ({size, page}) => {
        return await ServiceAPI.getBlogsWithPagination(`innovation/all`, `?size=${size}&page=${page}`);
    }
);

export const InnovationDetailThunk = createAsyncThunk(
    "innovationThunk/innovationDetail",
    async ({id}) => {
        return await ServiceAPI.getServiceDetail("innovation", `detail?id=${id}`);
    }
)