import React from "react";

export const TextAreaComponent = ({name, IconInput, placeholder, register, errors, regex }) => {

    return (
        <div className={"relative my-8"} >
            <IconInput className={"text-3xl icon-input font-bold absolute top-4"}/>
            <textarea
                name={name}
                placeholder={placeholder}
                className={`w-full py-4 pl-9 outline-0 border-b-2 inputs resize-none h-[180px] ${errors[name] ? "border-danger" : "" } rounded-sm text-xl`}
                {...register(name, {
                    required: "This field is required",
                    pattern: {
                        value: regex?.regex,
                        message: `${regex?.message || "invalid input"}`
                    }
                })}
            ></textarea>
            {
                errors[name] ? <p className={"danger"}>{errors[name]?.message}</p> : null
            }
        </div>

    )
}

