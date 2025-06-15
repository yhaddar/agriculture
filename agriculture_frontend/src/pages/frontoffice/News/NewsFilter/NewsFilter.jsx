import {FilterComponent} from "../../../../Components/fontOffice/FilterComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {ServiceThunk} from "../../../../Middleware/ServiceThunk.js";
import React, {useEffect} from "react";
import {CategoryBlogsThunk} from "../../../../Middleware/BlogsThunk.js";

export const NewsFilter = ({ page, size, setPage }) => {

    return (
        <FilterComponent
            page={page}
            size={size}
            FctThunk={ServiceThunk}
            setPage={setPage}
            service={"news"}
        />
    )
}