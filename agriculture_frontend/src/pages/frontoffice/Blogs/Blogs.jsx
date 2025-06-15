import React, {useEffect, useState} from "react";
import {BlogsFilter} from "./BlogsFilter/BlogsFilter.jsx";
import {AllBlogsComponent} from "../../../Components/fontOffice/AllBlogsComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {ServiceThunk} from "../../../Middleware/ServiceThunk.js";
import {HeroComponent} from "../../../Components/fontOffice/HeroComponent.jsx";
import {LoadingComponent} from "../../../Components/fontOffice/LoadingComponent.jsx";

export const Blogs = () => {
    const {list, loading} = useSelector(state => state.serviceReducer);
    const size = 8;
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const service = "blogs";


    useEffect(() => {
        dispatch(ServiceThunk({service, size, page}));
    }, [page]);

    return (
        <>
            <HeroComponent service={"blogs"} />
            <BlogsFilter page={page} size={size} setPage={setPage}/>
            <AllBlogsComponent page={page} setPage={setPage} size={size} list={list?.data}/>
        </>
    )
}