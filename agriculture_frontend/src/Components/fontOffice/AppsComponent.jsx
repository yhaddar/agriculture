import React from "react";
import {Link} from "react-router-dom";
import {ButtonLinkComponent} from "./ButtonLinkComponent.jsx";

export const AppComponent = ({ description, image, link, services }) => {


    const lists = document.querySelectorAll(".apps ul");
    lists.forEach((item) => {
        item.classList.add("list-disc", "ml-[38px]");
    })

    const lists2 = document.querySelectorAll(".apps ol");
    lists2.forEach((item) => {
        item.classList.add("list-decimal", "ml-[38px]");
    })

    return (
        <>
            <div className={"my-[60px]"}>
                <div className={"flex items-start justify-center gap-4"}>
                    <div className={"flex justify-end"}>
                        <div className={"w-[100%]"}>
                            <img className={"w-full h-full rounded-sm"} alt={description}
                                 src={`${image}`}/>
                        </div>
                    </div>
                    <div className={"w-[40%]"}>
                        <div className={""}>
                            <p className={"text-[20px] text-justify"}>{description}</p>
                            <div className={"text-red-500 my-5"}>
                                <ButtonLinkComponent
                                    text={"download app"}
                                    link={link}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"w-[80%] mx-auto my-10"}>
                    <h1 className={"capitalize my-4 text-[28px]"}>services app agriculture :</h1>
                    <div className={"apps text-white ms-5 text-[20px] mb-[15px] leading-[32px] fist-letter:capitalize"} dangerouslySetInnerHTML={{ __html: services }} />
                </div>
            </div>
        </>
    )
}