import React from "react";
import {loadingGIF} from "../../utils/images.js";
export const LoadingComponent = () => {
    return (
        <>
            <div className={"w-full h-screen loading fixed z-10 flex justify-center items-center"}>
                <div className={"w-[100px]"}>
                    <img src={`${loadingGIF}`} className={"w-full"} alt={"loading"} />
                </div>
            </div>
        </>
    )
}