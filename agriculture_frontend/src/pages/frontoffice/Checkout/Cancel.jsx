import React from "react";
import {cancel} from "../../../utils/images.js";
import {ButtonLinkComponent} from "../../../Components/fontOffice/ButtonLinkComponent.jsx";

export const Cancel = () => {

    return <>
        <div className={"w-full h-screen flex justify-center items-center flex-col gap-3"}>
                <div
                    className={`bg-[url(${cancel})] bg-center bg-cover bg-no-repeat bg-border-box object-fit w-[400px] h-[400px]`}></div>
            <h1 className={"text-[30px]"}>{"the payment was canceled"}</h1>
            <ButtonLinkComponent link={""} text={"return back"} size={20} />
        </div>
    </>
}