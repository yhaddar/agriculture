import React from "react";
import {Link} from "react-router-dom";
import {dateFormat} from "../../utils/dateFormat.js";
export const BlogsComponent = ({width = null, id, title, image, description, category, categoryId, createdAt}) => {

    return (
        <>
            <div className={"w-full bg-cover bg-no-repeat bg-border-box rounded-sm bg-green-500 relative bg-center image-blog"}
                 style={{ backgroundImage: `url(${image})` }}>
                <div className={"mx-2"}>
                    <div className={"py-[16px] px-[20px] rounded-sm mt-2 flex justify-center items-center category-card absolute"}>
                        <Link to={`/blogs/category?category=${categoryId}`} className={"text-[15px] text-center active:scale-[0.90]"}>{category}</Link>
                    </div>
                    <div className={"absolute bottom-3"}>
                        <h1 className={`text-[${width === "460" ? "16px" : width === "439" ? "15px" : "18px"}] first-letter:text-[33px] blog-title first-letter:capitalize `}>{title}</h1>
                        <p className={`text-[${width === "439" ? "12px" : "15px"}] capitalize`}>{dateFormat(createdAt)}</p>
                        <div className={`w-[${width === "460" ? "400px" : width === "439" ? "428px" : "476px"}] blog-description text-[${width === "460" ? "15" : width === "439" ? "14"  : "18"}px]`}
                             dangerouslySetInnerHTML={{
                            __html: `${width === "439" ? description?.slice(0, 50) : description?.slice(0, 100)}...`
                        }} />
                        <div className={`flex h-${width === "439" ? "8" : "12"} mt-3 w-[${width === "439" ? "90px" : "120px"}] border-2 rounded-sm learn-more duration-300 justify-center items-center`}>
                            <Link className={`capitalize active:scale-[0.90] text-white text-${width === "439" ? "sm" : ""}`} to={`/blogs/detail?id=${id}`}>learn more</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}