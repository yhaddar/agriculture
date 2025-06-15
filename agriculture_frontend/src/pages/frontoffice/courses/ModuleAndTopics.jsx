import React from "react";

export const ModuleAndTopics = ({ moduleAndTopics }) => {
    return (
        <>
            <h1 className={"text-2xl capitalize"}>module and topics :</h1>
            <div className={"text-white text-[20px] mb-[15px] key leading-[40px]  fist-letter:capitalize"}
                 dangerouslySetInnerHTML={{__html: moduleAndTopics}} />
        </>
    )
}