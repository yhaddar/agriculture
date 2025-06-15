import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

export const CategoryBlogsThunk = createAsyncThunk(
    "servicesThunk/categories/blogs",
    async ({ service_type }) => {
        return await ServiceAPI.getAllCategoriesServices("category", `${service_type}/all`);
    }
)

export const DetailBlogThunk = createAsyncThunk(
    "serviceThunk/detail/blog",
    async ({id}) => {
        return await ServiceAPI.getServiceDetail("services/blogs", `?id=${id}`);
    }
)