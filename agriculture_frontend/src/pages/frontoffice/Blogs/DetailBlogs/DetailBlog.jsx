import React, {useEffect} from "react";
import {Detail} from "../../../../Components/fontOffice/Detail.jsx";
import {DetailBlogThunk} from "../../../../Middleware/BlogsThunk.js";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

export const DetailBlog = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const id = location.search.split("=")[1];
    const { list, loading, error } = useSelector(state => state.DetailBlog);

    useEffect(() => {
        dispatch(DetailBlogThunk({ id }));
    }, []);

    return (
       <>
            <Detail
                service={location.pathname.split("/")[1]} id={id}
                title={list?.title}
                category={list?.categories?.title}
                description={list?.description}
                image={list?.image}
                createdAt={list?.created_at}
                location={list?.location}
                source={list?.source}
            />
       </>
    );
}