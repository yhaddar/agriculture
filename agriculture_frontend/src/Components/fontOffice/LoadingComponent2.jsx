import React from "react";
import {loadingGIF2} from "../../utils/images.js";
export const LoadingComponent2 = () => {
    return (
        <>
            <div className={"flex justify-center items-center"}>
                <div className={""}>
                    <img src={`${loadingGIF2}`} className={"w-[40px]"} alt={"loading"} />
                </div>
            </div>
        </>
    )
}