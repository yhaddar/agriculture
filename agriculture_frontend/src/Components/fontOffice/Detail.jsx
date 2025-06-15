import React, {useState} from "react";
import {FaChevronLeft} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {dateFormat} from "../../utils/dateFormat.js";
import {FavoriteIcon} from "./FavoriteIcon.jsx";
import {LikeIcon} from "./LikeIcon.jsx";

// eslint-disable-next-line react/prop-types
export const Detail = ({ service, title, description, image, category, id, location = null, source = null, createdAt }) => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);


    return (
        <>
            {
                toggle && (
                    <div className={"w-full h-screen fixed z-10 show-img flex justify-center items-center"}
                         onClick={() => setToggle(false)}>
                        <img
                            src={`${image}`}
                            className={"w-[500px] cursor-zoom-out"}
                            alt={"image detail"}/>
                    </div>
                )
            }
            <section className={"py-[160px]"}>
                <div className={"container mx-auto"}>
                    <div className={"w-[80%] mx-auto"}>
                        <div className={""}>
                            <FaChevronLeft
                                onClick={() => navigate(-1)}
                                className={"w-[45px] back h-auto active:scale-[0.90] duration-500 cursor-pointer"}/>
                        </div>
                        <div className={"container-detail h-auto pb-10 my-8 rounded-[10px]"}>
                            <div
                                className={"pt-[5px] w-[99%] mx-auto h-[650px] rounded-t-[8px] bg-no-repeat bg-center bg-cover bg-border-box detail-image relative"}>
                                <img onClick={() => setToggle(true)} src={`${image}`} alt={"image detail"}
                                     className={"w-full h-full rounded-t-[8px] cursor-zoom-in"}/>
                                <div className={""}>
                                    <div
                                        className={"absolute top-1 w-full h-auto flex justify-between"}>
                                        <div
                                            className={"w-[164px] h-[40px] flex justify-center items-center header-detail rounded-tl-[8px]"}>
                                            <p className={"capitalize text-lg"}>{category}</p>
                                        </div>
                                        {
                                            service === "blogs" ?
                                                <div
                                                    className={"w-[164px] h-[40px] flex justify-center items-center header-detail rounded-tr-[8px]"}>
                                                    <p className={"capitalize text-lg"}>{dateFormat(createdAt)}</p>
                                                </div> : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={"w-[99%] mx-auto my-8 h-auto flex justify-between"}>
                                <div className={"w-3/4"}>
                                    <h1 className={"text-[26px] first-letter:text-[45px] hero-title"}>{title}</h1>
                                    {
                                        service === "news" ?
                                            <div>
                                                <p className={`text-opacity-2 text-[18px]`}>{`location : ${location}`}</p>
                                                <p className={`text-opacity-2 text-[18px]`}>{`source : ${location}`}</p>
                                            </div>
                                            : null
                                    }
                                </div>
                                <div className={"w-1/2 flex justify-end items-center gap-2"}>
                                    <LikeIcon type={service} id={id} size={"28"} />
                                    {
                                        service === "blogs" ?
                                            <FavoriteIcon type={service} id={id} size={"28"} /> : null
                                    }
                                </div>
                            </div>
                            <div className={"w-[95%] mx-6 p text-[18px]"} style={{ lineHeight: "30px" }} dangerouslySetInnerHTML={{ __html: description }} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}