import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ServiceThunk} from "../../../Middleware/ServiceThunk.js";
import {AllNewsComponent} from "../../../Components/fontOffice/AllNewsComponent.jsx";
import {NewsFilter} from "./NewsFilter/NewsFilter.jsx";
import {HeroComponent} from "../../../Components/fontOffice/HeroComponent.jsx";

export const News = () => {

    const {list, loading} = useSelector(state => state.serviceReducer);

    const size = 6;
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const service = "news";

    useEffect(() => {
        dispatch(ServiceThunk({service, size, page}));
    }, [page]);

    return (
        <>
            <HeroComponent service={"news"} />
            <NewsFilter page={page} size={size} setPage={setPage} />
            <AllNewsComponent list={list?.data} page={page} setPage={setPage} />
        </>
    )
}