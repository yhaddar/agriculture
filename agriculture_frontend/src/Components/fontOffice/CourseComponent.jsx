import React from "react";
import {IoStar, IoStarOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import {FavoriteIcon} from "./FavoriteIcon.jsx";
import {LikeIcon} from "./LikeIcon.jsx";

export const CourseComponent = ({ id, title, description, cover, category, typePayment, rating, person_rate }) => {
    const star = Math.floor(Number(rating));

    return <>
        <div className={"w-[397px] my-2 h-[470px] rounded-[3px] border-2 border-solid card-courses"}>
            <div className={"w-[388px] mt-1 h-[250px] mx-auto bg-green-500 rounded-[2px] relative"}>
                <img src={`${cover}`} alt={""} className={"w-full h-full object-cover"} />
                <div className={"absolute top-[0px] rounded-[2px] card-category"}>
                   <p className={"px-5 py-2 capitalize"}>{category}</p>
                </div>
                <div className={"my-2"}>
                    <Link to={`/courses/detail/${id}`} className={"capitalize text-[23px]"}>{`${title}`.substring(0, 28).concat("...")}</Link>
                </div>
                <div className={"my-3"}>
                    <div className={"flex justify-between"}>
                        <div className={"flex gap-1 items-end"}>
                            {
                                Array(star).fill().map((_, index) => (
                                    <IoStar
                                        className={"star text-[23px]"}
                                        key={index}
                                    />
                                ))
                            }
                            {
                                Array(5 - star).fill().map((_, index) => (
                                    <IoStarOutline
                                        className={"star text-[23px]"}
                                        key={index}
                                    />
                                ))
                            }
                            <p className={"capitalize text-[14px] text-opacity-2"}>({person_rate})</p>
                        </div>
                        <p className={`${typePayment === "free" ? "card-payment" : "gold"} px-4 rounded-sm capitalize`}>{typePayment}</p>
                    </div>
                </div>
                <div className={""}>
                    <p className={"text-[18px] text-description"}>{`${description}`.substring(0, 98).concat("...")}</p>
                </div>
                <div className={"flex gap-2 justify-end py-2"}>
                    <LikeIcon type={"courses"} id={id} />
                    <FavoriteIcon type={"courses"} id={id} />
                </div>
            </div>
        </div>
    </>
}