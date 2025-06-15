import {InputComponent} from "../../../Components/fontOffice/InputComponent.jsx";
import React from "react";
import {inputLogin} from "../../../utils/Lists.js";
import {Link} from "react-router-dom";

export const Login = ({register, errors}) => {

    return (
        <>
            {
                inputLogin.map((i, index) => (
                    <InputComponent
                        key={index}
                        type={i.type}
                        IconInput={i.iconInput}
                        register={register}
                        errors={errors}
                        regex={i.regex}
                        placeholder={i.placeholder}
                    />
                ))
            }
            <div className={"flex justify-end my-8"}>
                <Link to={"/reset/password"} className={"capitalize text-lg forget relative cursor-pointer"}>forgot your
                    password?</Link>
            </div>
        </>
    )
}