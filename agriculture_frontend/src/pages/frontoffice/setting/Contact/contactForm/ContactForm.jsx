import React, {useEffect} from "react";
import {inputContact} from "../../../../../utils/Lists.js";
import {InputComponent} from "../../../../../Components/fontOffice/InputComponent.jsx";
import {useForm} from "react-hook-form";
import {ButtonFormComponent} from "../../../../../Components/fontOffice/ButtonFormComponent.jsx";
import {LuMessageCircle} from "react-icons/lu";
import {Regex} from "../../../../../utils/regex.js";
import {TextAreaComponent} from "../../../../../Components/fontOffice/TextAreaComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {ContactThunk} from "../../../../../Middleware/ContactThunk.js";
import {RESPONSE_CREATED} from "../../../../../utils/enums.js";
import toast, {Toaster} from "react-hot-toast";

export const ContactForm = () => {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const { list: {status, response}, loading, error } = useSelector((state) => state.contactReducer);
    const dispatch = useDispatch();

    const submit = async (body) => {
        await dispatch(ContactThunk({ body }));
    }

    useEffect(() => {


        if(status === RESPONSE_CREATED) {
            toast.success(response)
        }

    }, [status])

    return (
        <>
            <Toaster position="top-center" reserveOrder={false} />
            <div className={"container mx-auto mb-[100px]"}>
                <div className={"my-[50px]"}>
                    <h1 className={"text-[30px] text-center first-letter:capitalize"}>you can send a message through
                        this form</h1>

                </div>

                <div className={"w-[45%] mx-auto mt-[15px]"}>
                    <form onSubmit={handleSubmit(submit)}>
                        {
                            inputContact.map((i, index) => (
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
                        <TextAreaComponent
                            name={"message"}
                            IconInput={LuMessageCircle}
                            register={register}
                            errors={errors}
                            regex={Regex[4]}
                            placeholder={"message"}
                        />
                        <div className={"flex justify-center"}>
                            <div className={"w-[180px]"}>
                                <ButtonFormComponent
                                    submit={`submit`}
                                    loading={loading}
                                    failed={error}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}