import React from "react";
import {image403} from "../../utils/images.js";

export const Forbidden = () => {
    return (
        <div className={"w-full h-screen flex justify-center items-center"}>
            <div className={"w-[450px] h-[450px]"}>
                <img src={`${image403}`} alt={"404"} className={"w-full h-full"}/>
            </div>
        </div>
    )
}