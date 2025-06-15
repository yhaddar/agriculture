import React from "react";

export const DescriptionInnovation = ({description, impact, innovation}) => {

    const lists = document.querySelectorAll(".impact ul");
    lists.forEach((item) => {
        item.classList.add("list-disc", "ml-[38px]");
    })

    return (
        <>
            <div className={"w-[79%] text-justify card p-4 text-white mx-auto text-[20px] my-3"} dangerouslySetInnerHTML={{__html: description}} />

            <div className={"w-[79%] my-3 card p-4 mx-auto"}>
                <h2 className={"text-[20px] capitalize my-3"}>impact of : {innovation}</h2>
                <div className={"text-justify impact text-white text-[20px]"} dangerouslySetInnerHTML={{__html: impact}}/>
            </div>

        </>
    )
}