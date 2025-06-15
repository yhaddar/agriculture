import React from "react";
import {IoStar, IoStarOutline} from "react-icons/io5";
import {dateFormat} from "../../utils/dateFormat.js";

export const HeroDetailComponent = ({storage, list, rating, person_rate}) => {
    const star = Math.min(5, Math.max(0, Math.floor(Number(rating)) || 0));

    return (
        <section
            className="h-screen w-full bg-cover bg-no-repeat bg-center bg-origin-border relative z-[1] hero_component_image"
            style={{backgroundImage: `url(${storage === "innovations" ? list?.data?.image : list?.data?.cover})`}}
        >
            <div className="relative">
                <div className="container mx-auto">
                    <div className="flex flex-col justify-center w-full h-screen">
                        <div className="flex flex-col justify-center py-5 items-center">
                            <div className="w-[885px]">
                                <h1 className="text-center text-[33px] first-letter:text-[57px] capitalize hero-title">
                                    {storage === "innovations" ? list?.data?.innovation : list?.data?.title}
                                </h1>
                                <p className="text-center text-[22px]">{list?.data?.description}</p>
                                {
                                    storage === "innovations" ? (
                                        <div className={"text-center my-3"}>
                                            <h2 className={"text-[22px] capitalize text-white"}><span className={"text-opacity"}>inventor :</span> {list?.data?.inventor} </h2>
                                            <h2 className={"text-[18px] capitalize text-white"}><span className={"text-opacity"}>date of creation :</span> {dateFormat(list?.data?.date_creation)} </h2>
                                        </div>
                                    ) : null
                                }
                            </div>
                            <div className="flex gap-1 items-center my-5">
                                {Array(star)
                                    .fill()
                                    .map((_, index) => (
                                        <IoStar className="star text-[23px]" key={`filled-${index}`}/>
                                    ))}
                                {Array(5 - star)
                                    .fill()
                                    .map((_, index) => (
                                        <IoStarOutline className="star text-[23px]" key={`empty-${index}`}/>
                                    ))}
                                <p className="capitalize text-opacity-2">{person_rate} rate this courses</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
