import {InputComponent} from "../../../Components/fontOffice/InputComponent.jsx";
import React from "react";
import {inputRegister} from "../../../utils/Lists.js";
import {Link} from "react-router-dom";
import {IoIosCheckmark} from "react-icons/io";

export const Register = ({register, errors, checked, setChecked}) => {

    return (
        <>
            {
                inputRegister.map((i, index) => (
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
            <div className={"flex my-8 items-center gap-2"}>
                <div>
                    <label htmlFor={"accept_privacy_policy"}
                           className={`rounded-sm  w-[20px] flex items h-[20px] border-2 border-red-500 inputs cursor-pointer ${checked && "checked"}`}>
                        { checked && <IoIosCheckmark className={"w-[30px]"} /> }
                        <input type={"checkbox"} className={"hidden"} id={"accept_privacy_policy"} name={"accept_privacy_policy"} onChange={() => setChecked(!checked)}/>

                    </label>
                </div>
                <h4 className={"capitalize text-[16px]"}>you agree to our Terms & Conditions and acknowledge our
                    <Link to={"/privacy%20policy"} className={"cursor-pointer register-link"}> Privacy Policy</Link>.</h4>
            </div>
        </>
    )
}