import React from "react";

export const SelectInputComponent = ({type, IconInput, register, errors, value = [], disabled=false, options = [], val }) => {

    return (
        <div className={"relative my-5"} >
            <IconInput className={"text-3xl icon-input font-bold absolute top-4"}/>

            <select
                name={type}
                {...register(type, {
                    required: "This field is required",
                })}
                disabled={disabled}
                className={`w-full py-4 pl-9 outline-0 border-b-2 inputs ${errors[type] && "border-danger"} ${!disabled && "cursor-pointer" } rounded-sm text-xl`}>
                <option selected={true} disabled>select {type}</option>
                {
                    options?.map((option, index) => (
                        <option className={"card"} key={index} value={value[index]} selected={value[index] === val}>{option}</option>
                    ))
                }
            </select>
            {
                // eslint-disable-next-line react/prop-types
                errors[type] ? <p className={"danger"}>{errors[type]?.message}</p> : null
            }
        </div>

    )
}