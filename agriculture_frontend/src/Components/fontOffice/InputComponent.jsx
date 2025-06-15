import React, {useState} from "react";
import {BiHide, BiShowAlt} from "react-icons/bi";

export const InputComponent = ({type, IconInput, placeholder, register, errors, regex, value=null, disabled=false, required = true }) => {

    const [toggle, setToggle] = useState(false);
    const Icon = toggle ? BiHide : BiShowAlt;

    return (
            <div className={"relative my-5"} >
                <IconInput className={"text-3xl icon-input font-bold absolute top-4"}/>
                <input
                    type={
                        type === "date_birth"
                            ? "date"
                            : type === "password" || type === "confirmPassword"
                                ? toggle ? "text" : "password"
                                : type === "email"
                                    ? "email"
                                    : "text"
                    }
                    name={type}
                    placeholder={placeholder === undefined ? type : placeholder}
                    className={`w-full py-4 pl-9 outline-0 border-b-2 inputs ${errors[type] ? "border-danger" : "" } rounded-sm text-xl`}
                    defaultValue={value}
                    {...register(type, {
                        ...(required && { required: "This field is required" }),
                        pattern: {
                            value: regex?.regex,
                            message: `${regex?.message || "invalid input"}`
                        }
                    })}
                    disabled={disabled}
                />
                {
                    errors[type] ? <p className={"danger"}>{errors[type]?.message}</p> : null
                }
                {
                    type === "password" || type === "confirmPassword" ?
                        <Icon
                            className={"text-3xl icon-input font-bold absolute top-4 right-0 icons cursor-pointer duration-300"}
                            onClick={() => setToggle(!toggle)}/>
                        : null
                }
            </div>

    )
}

