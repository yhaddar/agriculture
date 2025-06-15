"use server";
import React, {useEffect, useState} from "react";
import {IoChevronBack} from "react-icons/io5";
import {Login} from "./auth/Login.jsx";
import {useForm} from "react-hook-form";
import {ButtonFormComponent} from "../../Components/fontOffice/ButtonFormComponent.jsx";
import {Register} from "./auth/Register.jsx";
import {Facebook, Google, Twitter} from "../../utils/images.js";
import {useDispatch, useSelector} from "react-redux";
import toast, {Toaster} from "react-hot-toast";
import {AuthThunk, LoginWithSocialThunk} from "../../Middleware/AuthThunk.js";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

export const Authentication = ({setAuth, auth}) => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [checked, setChecked] = useState(false);
    const IsToggle = toggle ? Register : Login;
    const authSelector = useSelector(state => state.authReducer);
    const [s, setS] = useState(false);
    const navigate = useNavigate();
    const loginWithSocial = useSelector(state => state.loginWithSocialReducer);

    const submit = async (body) => {
      try{
          if(toggle){

              if(body.password === body.confirmPassword){

                  if(checked){

                      await dispatch(AuthThunk({ key2: "register", body }));
                      setS(true);

                  }else{

                      throw new Error("you need to accept the privacy policy first.")
                  }

              }else{
                  throw new Error("Passwords don't match.");
              }

          }else{

              await dispatch(AuthThunk({ key2: "login", body }));
              setS(true);

          }
      }catch (error) {
          toast.error(error.message);
      }
    }

    useEffect(() => {

        if(s){

            setS(!s)
            if(authSelector?.list?.status === 400){
                toast.error(`${authSelector?.list?.response}`);
            }else{
                if(toggle){
                    toast.success(`${authSelector?.list?.response}`);
                }else {

                    Cookies.set("token", `${authSelector?.list?.response}`, { expires: 8, secure: true, path: "/" });
                    navigate("/");
                    window.location.reload();
                    setAuth(false);

                }
            }
        }

    }, [s]);

    const onSuccess = (response) => {
        dispatch(LoginWithSocialThunk({ key2: "callback", body: { token: response.credential } }));
    };

    const onFailure = (error) => {
        console.log('Google Login Error:', error);
    };

    useEffect(() => {
        if(loginWithSocial?.list?.status === 202){
            Cookies.set("token", `${loginWithSocial?.list?.response}`, { expires: 8, secure: true, path: "/" });
            navigate("/");
            window.location.reload();
            setAuth(false);
        }
    }, [loginWithSocial?.list?.status])


    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <section className={"w-full h-screen fixed z-10 section-auth"}>
                <div className={"section-auth-2 w-full h-screen"}>
                    <div className={"container mx-auto"}>
                        <div className={" w-full pt-[140px] flex"}>
                            <IoChevronBack className={"w-[42px] icons duration-300 cursor-pointer h-auto"}
                                           onClick={() => setAuth(!auth)}/>
                        </div>
                        <div className={"text-center capitalize"}>
                            <h1 className={"text-5xl"}>{toggle ? "Register" : "log in"}</h1>
                        </div>
                        <form onSubmit={handleSubmit(submit)}>
                            <div className={"w-[600px] mx-auto mt-[80px]"}>
                                <IsToggle
                                    handleSubmit={handleSubmit}
                                    submit={submit}
                                    register={register}
                                    errors={errors}
                                    setChecked={setChecked || null}
                                    checked={checked || null}
                                />
                            </div>

                            <div className={"flex justify-center"}>
                               <div className={"w-[180px]"}>
                                   <ButtonFormComponent
                                       submit={`${toggle ? "register" : "log in"}`}
                                       loading={authSelector?.loading}
                                       failed={authSelector?.failed}
                                   />
                               </div>
                            </div>
                        </form>
                        <div className={"my-5"}>
                            <div className={"text-center capitalize"}>
                                <h4 className={"text-lg"}>

                                    {toggle ? "you already " : "you don't "}have an account?
                                    <span onClick={() => setToggle(!toggle)}
                                          className={"lowercase register-link relative forget cursor-pointer"}>{toggle ? " log in" : " create an account"}</span>
                                </h4>
                            </div>
                            <div
                                className={"flex justify-center flex-col items-center w-[600px] my-3 mx-auto border-t-2 border-white border-solid"}>
                                <h1 className={"capitalize mt-3"}>{toggle ? "register with" : "login with"}</h1>
                                <div className={"flex gap-3 items-center"}>
                                    <div className={"my-[5px] cursor-pointer"}>

                                        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

                                            <GoogleLogin
                                                onSuccess={(credentialResponse) => onSuccess(credentialResponse)}
                                                onError={onFailure}
                                                cookiePolicy={'single_host_origin'}
                                                isSignedIn={true}
                                                buttonText={"log in"}
                                            />

                                        </GoogleOAuthProvider>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}