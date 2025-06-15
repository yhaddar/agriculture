import React from "react";

export const ButtonFormComponent = ({submit, loading, failed}) => {
    return (
        <button
            type={"submit"}
            className={"w-full more hover:border-2 capitalize text-lg btn-form active:scale-90 duration-300 rounded-md h-[60px]"}>
            {
                loading && !failed ?
                    <div className={"w-full flex items-center justify-center h-full"}><span className="loader  mt-[-20px]"></span></div>
                    : failed === true ? "error"
                    : submit
            }
        </button>
    )
}