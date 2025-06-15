import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { dateFormat } from "../../utils/dateFormat.js";
import { IoStar, IoStarOutline } from "react-icons/io5";

export const InnovationComponent = ({ id, innovation, image, inventor, date_creation, rating, description, index, total_person_rate }) => {
    const star = Math.min(5, Math.max(0, Math.floor(Number(rating)) || 0));

    const getTruncatedDescription = () => {
        return (description || "").slice(0, 130) + "...";
    };

    const contentRef = useRef(null);

    useEffect(() => {
        const lists = contentRef.current?.querySelectorAll("ul");
        lists?.forEach(item => {
            item.classList.add("list-disc", "ml-[38px]", "text-white");
        });
    }, [description]);

    console.log(rating)

    return (
        <div className="w-full h-full flex gap-2">
            <div className="w-[50%] h-full">
                <img
                    alt={innovation}
                    className="h-full w-full rounded-sm"
                    src={`${image}`}
                />
            </div>

            <div className="w-[50%]">
                <Link to={`${id}`} className="capitalize text-[22px]">
                    <span className="text-description">innovation :</span> {innovation?.slice(0, 20).concat("...")}
                </Link>
                <h2 className="capitalize text-[18px]">
                    <span className="text-description">inventor :</span> {inventor}
                </h2>
                <h3 className="capitalize text-[16px]">
                    <span className="text-description">date creation :</span> {dateFormat(date_creation)}
                </h3>

                <div className="my-3">
                    <div className="flex justify-between">
                        <div className="flex gap-1 items-end">
                            {Array(star).fill().map((_, i) => (
                                <IoStar className="star text-[23px]" key={`full-${i}`} />
                            ))}
                            {Array(5 - star).fill().map((_, i) => (
                                <IoStarOutline className="star text-[23px]" key={`empty-${i}`} />
                            ))}
                            <p className="capitalize text-[14px] text-opacity-2">({total_person_rate})</p>
                        </div>
                    </div>
                </div>

                <div className="my-5">
                    <p className="text-description text-[20px]">Description of the Innovation:</p>
                    <div
                        className="text-[19px] ms-5 text-justify innovation text-white"
                        ref={contentRef}
                        dangerouslySetInnerHTML={{ __html: getTruncatedDescription() }}
                    />
                </div>
            </div>
        </div>
    );
};
