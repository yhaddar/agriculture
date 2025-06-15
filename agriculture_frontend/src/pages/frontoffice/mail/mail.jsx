import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ValidateAccountThunk, ValidateEmailResetPasswordThunk} from "../../../Middleware/AuthThunk.js";
import {ButtonFormComponent} from "../../../Components/fontOffice/ButtonFormComponent.jsx";
import toast, {Toaster} from "react-hot-toast";
import {useForm} from "react-hook-form";
import {InputComponent} from "../../../Components/fontOffice/InputComponent.jsx";
import {inputLogin} from "../../../utils/Lists.js";
import {useNavigate} from "react-router-dom";

export const Mail = ({ title, pathname, auth, setAuth }) => {
    const dispatch = useDispatch();
    const email_response = useSelector(state => state.emailReducer);
    const email2_response = useSelector(state => state.validateEmailReducer);
    const [s, setS] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();

    const submit = async () => {
       try{
           if(pathname === "/reset/password"){

                setAuth(false);
                await dispatch(ValidateEmailResetPasswordThunk({ key2: `redirect?reset-type=${watch("email")}` }));
                setS(!s);

           }else {
               await dispatch(ValidateAccountThunk({key2: `activate/account?email=${watch("email")}`}));
               setS(!s)
           }
       }catch (error){
           toast.error(error.message);
       }
    };

    useEffect(() => {
        if(s){

            setS(!s)
           if(!(pathname === "/reset/password")){
               if(email_response?.list?.status === 400){

                   toast.error(`${email_response?.list?.response}`);

               }else{
                   toast.success(`${email_response?.list.response}`);
               }
           }else {
               if(email2_response?.list?.status === 400){

                   toast.error(`${email2_response?.list?.response}`);

               }else{
                   toast.success(`${email2_response?.list.response}`);
               }
           }

        }

    }, [s]);

    useEffect(() => {
        if(pathname === "/reset/password") {

            setAuth(false);
        }
    }, [auth]);

    return (
        <>
            <Toaster position={"top-center"} reverseOrder={false} />
            <div className="flex items-center justify-center min-h-screen bg-[#123524]">
                <div className="bg-[#1D3A12] shadow-lg rounded-lg p-8 w-[31rem] text-center">
                    <h2 className="text-2xl text-white mb-4">{title}</h2>
                    <p className="text-white opacity-[0.71] mb-6">
                        Enter your email to confirm your account and get access to exclusive content.
                    </p>

                    <form onSubmit={handleSubmit(submit)}>
                        <InputComponent
                            type={"email"}
                            IconInput={inputLogin[0].iconInput}
                            placeholder={"enter your email"}
                            register={register}
                            errors={errors}
                            regex={inputLogin[0].regex}

                        />

                        <div className={"w-full"}>
                            <ButtonFormComponent
                                submit={"valid email"}
                                loading={email_response?.loading || email2_response?.loading}
                                failed={email_response?.failed || email2_response?.failed}
                            />
                        </div>
                        {
                            pathname === "/reset/password" ?
                                <div>
                                    <button className={"btn-return my-5 relative"} onClick={() => {
                                        navigate("/");
                                    }}>return to page home</button>
                                </div> : null
                        }
                    </form>
                </div>
            </div>
        </>
    );
};