import React from "react";
import {IoStar, IoStarOutline} from "react-icons/io5";

export const ReviewComponent = ({ profile, full_name, email, rating, review }) => {

    const star = Math.floor(Number(rating))

    return (
        <>
            <div className={"w-full p-3 border-2 border-review rounded-sm relative mt-[35px]"}>

                <div
                    className={`w-[100px] h-[100px] bg-[url(${profile})] bg-center bg-cover bg-no-repeat bg-border-box object-fit absolute -top-12 left-0 right-0 mx-auto rounded-[10px]`}></div>
                <div className={"py-4 flex flex-col justify-center items-center mt-10 h-[280px]"}>
                    <h1>{full_name}</h1>
                    <a href={`mailto:${email}`}>{email}</a>

                    <div className={"flex my-3"}>
                        {Array(star).fill().map((_, i) => (
                            <IoStar className="star text-[23px]" key={`full-${i}`}/>
                        ))}
                        {Array(5 - star).fill().map((_, i) => (
                            <IoStarOutline className="star text-[23px]" key={`empty-${i}`}/>
                        ))}
                    </div>

                    <p className={"text-center"}>{review}</p>
                </div>
            </div>
        </>
    )
}