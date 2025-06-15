import React from "react";
import {loadingGIF} from "../utils/images.js";
export const NotFound = ({ text }) => {
    return (
        <>
            <section className={""}>
                <div className={"container mx-auto"}>
                    <div
                        className={"flex flex-col justify-center w-full h-[459px] items-center border-2 border-dashed rounded-sm not-found-border"}>
                        <div className={"w-[100px]"}>
                            <img src={`${loadingGIF}`} className={"w-full"} alt={"loading"}/>
                        </div>
                        {
                            text !== "" && <h1 className={"text-2xl capitalize"}>{text || "page not found"}</h1>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}