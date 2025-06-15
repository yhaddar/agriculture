import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

export const HeroServiceThunk = createAsyncThunk(
    "serviceThunk/heroBlogs",
    async ({ service }) => {
        return await ServiceAPI.getHeroComponent("hero_component", `${service}`);
    }
)

export const ServiceThunk = createAsyncThunk(
    "serviceThunk/service",
    async ({service, type = null, size, page}) => {
        return await ServiceAPI.getBlogsWithPagination(`services/${service}`, `${type === null ? "all" : type}${type === null ? "?" : "&"}size=${size}&page=${page}`);
    }
);


export const DetailServicesThunk = createAsyncThunk(
    `serviceThunk/detail/service/category`,
    async ({service, id, size, page}) => {
        return await ServiceAPI.getCategoryDetail(`category/${service}`, `?id=${id}&size=${size}&page=${page}`);
    }
);

export const BlogsHomeThunk = createAsyncThunk(
    "serviceThunk/blogseHomeThunk",
    async ({service, size, page}) => {
        return await ServiceAPI.getBlogsWithPagination(`services/${service}`, `latest?page=${page}&size=${size}`);
    }
);

export const NewsHomeThunk = createAsyncThunk(
    "serviceThunk/newsHomeThunk",
    async ({service, size, page}) => {
        return await ServiceAPI.getBlogsWithPagination(`services/${service}`, `latest?page=${page}&size=${size}`);
    }
);
