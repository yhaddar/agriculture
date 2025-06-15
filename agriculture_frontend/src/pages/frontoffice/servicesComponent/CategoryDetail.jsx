import React, {useEffect, useMemo, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AllBlogsComponent} from "../../../Components/fontOffice/AllBlogsComponent.jsx";
import {FilterComponent} from "../../../Components/fontOffice/FilterComponent.jsx";
import {DetailServicesThunk, ServiceThunk} from "../../../Middleware/ServiceThunk.js";
import {AllNewsComponent} from "../../../Components/fontOffice/AllNewsComponent.jsx";
import {HeroCategoryComponent} from "../../../Components/fontOffice/HeroCategoryComponent.jsx";
export const CategoryDetail = () => {

    const { search } = useLocation();
    const { service } = useParams();
    const dispatch = useDispatch();
    const { list, loading } = useSelector(state => state.categoryServices);

    const size = 8;
    const [page, setPage] = useState(1);

    const handleCategory = () => {
        const id = search.split("=")[1];
        dispatch(DetailServicesThunk({ service, id, size, page }));

    }

    const DataFromMemo = useMemo(() => {
        return list || null;
    }, [list || null])


    useEffect(() => {
        handleCategory();
    },[page]);

    return (
        <>
            <HeroCategoryComponent
                image={DataFromMemo?.categories?.cover}
                title={DataFromMemo?.categories?.title}
                description={DataFromMemo?.categories?.description}
                storage={"categories"} />

            <FilterComponent detail={true} page={page} size={size} list={list} FctThunk={ServiceThunk} setPage={setPage} service={"news"} />
            {
                service === "blogs" ?
                    <AllBlogsComponent page={page} setPage={setPage} size={size} list={list} /> :
                    <AllNewsComponent list={list} page={page} setPage={setPage} />
            }

        </>
    )
}