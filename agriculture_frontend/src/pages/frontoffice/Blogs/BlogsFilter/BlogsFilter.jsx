import {FilterComponent} from "../../../../Components/fontOffice/FilterComponent.jsx";
import React from "react";
import {useSelector} from "react-redux";
import {ServiceThunk} from "../../../../Middleware/ServiceThunk.js";

export const BlogsFilter = ({ page, size, setPage }) => {

    const { list } = useSelector(state => state.categoryBlogs);

    return (
        <FilterComponent
            page={page}
            size={size}
            list={list}
            FctThunk={ServiceThunk}
            setPage={setPage}
            service={"blogs"}
        />
    )
}