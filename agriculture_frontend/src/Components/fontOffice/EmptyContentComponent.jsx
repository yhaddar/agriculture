import React from "react";

export const EmptyContentComponent = ({ content }) => {
    return (
        <div className={"text-2xl w-full h-full text-white flex justify-center items-center"}>{content}</div>
    )
}