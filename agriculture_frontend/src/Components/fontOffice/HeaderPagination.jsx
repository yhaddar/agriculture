import React from "react";
import {Link} from "react-router-dom";

export const HeroPagination = ({ category_title, category_id }) => {

    return <>
        <div className={"flex  justify-between items-center"}>
            <h1 className={"text-[30px] capitalize"}>{category_title}</h1>
            <Link to={`/courses/category/${category_id}`} className={"text-[20px] page-hover duration-500 ease-in-out active:scale-[0.98]"}>view more</Link>
        </div>
    </>
}