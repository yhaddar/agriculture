import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

export const CoursesThunk = createAsyncThunk(
    "CoursesThunk/courses",
    async () => {
        return await ServiceAPI.getBlogsWithPagination(`courses`, `all`);
    }
);

export const CoursesCategoryThunk = createAsyncThunk(
    "coursesThunk/courses/category",
    async ({category_id}) => {
        return await ServiceAPI.getServiceDetail("courses/category", `${category_id}`);
    }
)

export const CoursesDetailThunk = createAsyncThunk(
    "coursesThunk/courses/detail",
    async ({id}) => {
        return await ServiceAPI.getServiceDetail("courses/detail", `${id}`);
    }
)

export const VideoCoursesThunk = createAsyncThunk(
    "coursesThunk/video/courses",
    async ({id}) => {
        return await ServiceAPI.getDataWithToken("video/all", `${id}`);
    }
)

export const CoursesHomeThunk = createAsyncThunk(
    "serviceThunk/CoursesHomeThunk",
    async ({size, page}) => {
        return await ServiceAPI.getBlogsWithPagination(`courses`, `bestRate?page=${page}&size=${size}`);
    }
);

export const AddMyLearningThunk = createAsyncThunk(
    "coursesThunk/addMyLearningThunk",
    async ({ body }) => {
        return ServiceAPI.setAPIWithToken("my_learning", "add", body)
    }
)

export const AllMyLearningThunk = createAsyncThunk(
    "coursesThunk/allMyLearningThunk",
    async () => {
        return await ServiceAPI.getDataWithToken("my_learning", "all");
    }
)

export const RemoveCoursesLearningThunk = createAsyncThunk(
    "coursesThunk/removeCoursesLearningThunk",
    async ({ id }) => {
        return ServiceAPI.deleteWithToken(`my_learning`, `delete/${id}`);
    }
)
