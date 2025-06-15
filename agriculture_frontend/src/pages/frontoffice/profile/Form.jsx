import React, { useEffect, useMemo, useState } from "react";
import { TbEdit, TbLogout } from "react-icons/tb";
import {DeleteAccountThunk, LogoutThunk} from "../../../Middleware/AuthThunk.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { InputComponent } from "../../../Components/fontOffice/InputComponent.jsx";
import {inputRegister, UserInputs} from "../../../utils/Lists.js";
import { useForm } from "react-hook-form";
import { SelectInputComponent } from "../../../Components/fontOffice/SelectInputComponent.jsx";
import { IoClose } from "react-icons/io5";
import { ButtonFormComponent } from "../../../Components/fontOffice/ButtonFormComponent.jsx";
import {CiImport} from "react-icons/ci";
import {AiOutlineDelete} from "react-icons/ai";
import {LoadingComponent2} from "../../../Components/fontOffice/LoadingComponent2.jsx";
import {RESPONSE_CREATED} from "../../../utils/enums.js";

export const Form = () => {

    const dispatch = useDispatch();
    const router = useNavigate();
    const [disabled, setDisabled] = useState(true);

    const Logout = () => {
        dispatch(LogoutThunk());
        localStorage.removeItem("isLogin");
        Cookies.remove("token", { path: "/" });
        router("/");
    };

    const { list, loading } = useSelector(state => state.userReducer);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const deleteSelector = useSelector(state => state.deleteAccountReducer);

    const [userData, setUserData] = useState({});  // Initialize with an empty object

    const userMemo = useMemo(() => {
        return list?.response || null;
    }, [list]);

    const IconEdit = disabled ? TbEdit : IoClose;

    const submit = (data) => {
        console.log(data);
    };


    useEffect(() => {
        if (userMemo) {
            setUserData({
                user: userMemo?.user,
                otherInfo: userMemo?.otherInfo,
            });
        }
    }, [userMemo]);

    const deleteAccount = () => {
        dispatch(DeleteAccountThunk({ key1: "auth", key2: "delete" }));

        if(deleteSelector?.list?.status === RESPONSE_CREATED){
             router("/");
             localStorage.removeItem("isLogin");
             Cookies.remove("token", { path: "/" });
        }

    };


    return (
        <>
            <div className={"w-full flex justify-between items-center"}>
                <div
                    className={`w-[100px] h-[100px] flex justify-center ${!disabled && "image-import"} relative items-center bg-[url(${userMemo?.user?.profile})] rounded-full bg-center bg-cover bg-no-repeat object-fit bg-border-box`}>
                    {
                        !disabled && <label htmlFor={"profile"} className={"z-10 cursor-pointer"}><CiImport className={"text-white text-[35px] z-10"} /></label>
                    }
                </div>
                <div className={"flex gap-3 items-center"}>
                    <IconEdit className={"text-[40px] text-white cursor-pointer active:scale-[0.98]"} onClick={() => setDisabled(!disabled)} />
                    <TbLogout className={"text-[40px] text-white cursor-pointer active:scale-[0.98]"}
                              onClick={() => Logout()} />
                    <div className={"bg-red-600 rounded-md flex p-1"}>
                        {
                               deleteSelector.loading ? <div className={"w-full"}><LoadingComponent2 /></div> : <AiOutlineDelete className={"text-[40px] text-white cursor-pointer active:scale-[0.98]"}
                                                                         onClick={() => deleteAccount()}   />
                        }
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(submit)}>
                <input type={"file"} id={"profile"} name={"profile"} className={"hidden"} />
                <div className={"mt-[30px] flex flex-wrap justify-center gap-5"}>
                    {
                        UserInputs?.map((user, index) => {
                            if (index !== 7) {
                                return (
                                    <div className={"w-[24%]"} key={index}>
                                        <InputComponent
                                            type={user?.type}
                                            placeholder={user?.placeholder}
                                            IconInput={user?.iconInput}
                                            register={register}
                                            errors={errors}
                                            regex={user?.regex}
                                            disabled={disabled}
                                            value={userData?.otherInfo?.[user?.type] || userData?.user?.[user?.type]}  // Pass the correct value here
                                        />
                                    </div>
                                );
                            }
                        })
                    }
                    <div className={"w-[24%]"}>
                        <SelectInputComponent
                            type={UserInputs[7]?.type}
                            IconInput={UserInputs[7]?.iconInput}
                            register={register}
                            errors={errors}
                            value={["male", "female"]}
                            disabled={disabled}
                            options={["male", "female"]}
                            val={userData?.otherInfo?.genre}
                        />
                    </div>

                    {
                        !disabled && inputRegister?.map((user, index) => {
                            if (index === 2 || index === 3) {
                                return <div className={"w-[24%]"} key={index}>
                                    <InputComponent
                                        type={user?.type}
                                        placeholder={user?.placeholder}
                                        IconInput={user?.iconInput}
                                        register={register}
                                        errors={errors}
                                        regex={user?.regex}
                                    />
                                </div>
                            }
                        })
                    }
                </div>
                {
                    !disabled && <div className={"w-[24%] mx-auto"}>
                        <ButtonFormComponent
                            loading={false}
                            failed={false}
                            submit={"update"}
                        />
                    </div>
                }
            </form>
        </>
    );
};
