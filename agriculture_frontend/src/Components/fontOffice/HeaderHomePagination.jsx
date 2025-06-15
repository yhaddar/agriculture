import React from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

export const HeroHomeagination = ({ title, page, last_page, setPage }) => {

    const Increment = () => {
        setPage(page + 1)
    }

    const Decrement = () => {
        setPage(page - 1)
    }

    return <>
        <div className="mx-auto container">
            <div className={"flex  justify-between items-center"}>
                <h1 className={"text-[30px] capitalize"}>{title}</h1>
                <div className={"flex gap-1 items-center"}>
                    <button className={"cursor-pointer active:scale-[0.98]"} onClick={() => Decrement()}
                            disabled={page === 1}>
                        <FaChevronLeft className={"text-[22px] icons duration-500 ease-in-out"}/>
                    </button>
                    <p>{page}/{last_page}</p>
                    <button onClick={() => Increment()} disabled={page === last_page}>
                        <FaChevronRight className={"icons duration-500 ease-in-out text-[22px]"}/>
                    </button>
                </div>
            </div>
        </div>
    </>
}