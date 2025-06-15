import React from "react";
import {Link} from "react-router-dom";
import {dateFormat} from "../../utils/dateFormat.js";

export const NewsComponent = ({is_small = false, image, title, description, id, categoryId, category, location, created_at }) => {

    return (
        <>
            <div className={"w-full h-auto"}>
                <div className={`flex gap-2`}>
                    <div
                        className={`w-[${is_small ? "193px" : "60%"}] h-[${is_small ? "134" : "382"}px]`}>
                        <img src={`${image}`} alt={`${title}`} className={"w-full h-full object-fit"} loading={"eager"} />
                    </div>
                    <div className={`w-[80%] ${!is_small && "flex flex-col gap-2"}`}>
                       <div className={"flex flex-col"}>
                           <Link to={`/news/detail?id=${id}`} className={`text-[${is_small ? "18" : "28"}px] hero-title decoration-solid duration-500 ease-in-out hover:underline`}>{title}</Link>
                           <Link to={`category?category=${categoryId}`} className={"text-opacity text-[18px]"}>{category}</Link>
                       </div>
                        <div className={`flex ${is_small ? "flex-col" : "gap-2"}`}>
                            <p className={`text-opacity-2 text-[${is_small ? "16" : "18"}px]`}>{dateFormat(created_at)}</p>
                            <p className={`text-opacity-2 text-[${is_small ? "16" : "18"}px]`}>{location}</p>
                        </div>
                        {
                            !is_small && <div className={"w-full text-[19px] text-justify"} dangerouslySetInnerHTML={{ __html: `${description.slice(0, 433)}` }} />
                        }
                    </div>
                </div>
                {
                    is_small && <div className={"w-full text-[17px] text-justify"} dangerouslySetInnerHTML={{ __html: `${description.slice(0, 115).concat("...")}` }} />
                }
            </div>
        </>
    )
}