import {IoStar, IoStarOutline} from "react-icons/io5";
import React from "react";

export const Stars = ({rating, total_person_rate, detail = false}) => {
    const star = Math.min(5, Math.max(0, Math.floor(Number(rating)) || 0));

    return (
        <>
            <div className={"flex"}>
                <div className={"flex relative"}>
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
                    <div className={"absolute -right-8 top-3"}>
                        <p className={"text-description text-[14px]"}>({total_person_rate})</p>
                        {/*<p className="capitalize text-opacity-2">{person_rate} rate this courses</p>*/}

                    </div>
                </div>
            </div>
        </>
    )
}