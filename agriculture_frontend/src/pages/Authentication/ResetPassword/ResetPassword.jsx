import React, {useEffect, useState} from "react";

import {InputComponent} from "../../../Components/fontOffice/InputComponent.jsx";
import {inputRegister} from "../../../utils/Lists.js";
import {useForm} from "react-hook-form";
import {ButtonFormComponent} from "../../../Components/fontOffice/ButtonFormComponent.jsx";
import toast, {Toaster} from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {ResetPasswordThunk} from "../../../Middleware/AuthThunk.js";

export const ResetPassword = () => {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();
    const email_response = useSelector(state => state.resetPasswordReducer);
    const [s, setS] = useState(false);
    const {email} = useParams();

    const submit = async (body) => {
        try {

            if (body.password === body.confirmPassword) {

                await dispatch(ResetPasswordThunk({key2: `reset-password?email=${email}`, body}));
                setS(true);

            } else {
                throw new Error("Passwords don't match.")
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {

        if (s) {
            setS(!s)
            if (email_response?.list?.status === 400) {

                toast.error(`${email_response?.list?.response}`);

            } else {
                toast.success(`${email_response?.list.response}`);
            }

        }

    }, [s]);

    return <>
        <Toaster position={"top-center"} reverseOrder={false}/>
        <section>
            <div className="flex items-center justify-center min-h-screen bg-[#123524]">
                <div className="bg-[#1D3A12] shadow-lg rounded-lg p-8 pb-0 w-[31rem] text-center">
                    <h2 className="text-2xl text-white mb-4 capitalize">{"reset password"}</h2>
                    <p className="text-white opacity-[0.71] mb-6">
                        Enter your new password to reset your account and regain access.
                    </p>
                    <form onSubmit={handleSubmit(submit)}>
                        <InputComponent
                            type={inputRegister[2].type}
                            IconInput={inputRegister[2].iconInput}
                            register={register}
                            errors={errors}
                            regex={inputRegister[2].regex}

                        />
                        <InputComponent
                            type={inputRegister[3].type}
                            IconInput={inputRegister[3].iconInput}
                            register={register}
                            errors={errors}
                            regex={inputRegister[3].regex}
                            placeholder={inputRegister[3].placeholder}
                        />
                        <div className={"w-full"}>
                            <ButtonFormComponent
                                submit={"reset password"}
                                loading={email_response?.loading}
                                failed={email_response?.failed}
                            />
                        </div>
                    </form>
                    <div className={"my-5"}>
                        <Link to="/" className={"relative btn-return capitalize"}>go to page home</Link>
                    </div>
                </div>
            </div>
        </section>
    </>
}