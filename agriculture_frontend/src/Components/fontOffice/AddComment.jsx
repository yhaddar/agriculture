import React, {useEffect, useState} from "react";
import {InputComponent} from "./InputComponent.jsx";
import {useForm} from "react-hook-form";
import {InputComment} from "../../utils/Lists.js";
import {ButtonFormComponent} from "./ButtonFormComponent.jsx";
import {IoStar, IoStarOutline} from "react-icons/io5";
import toast, {Toaster} from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";

export const AddComment = ({ id, FctAddComment, key1 }) => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const [rate, setRate] = useState(1);
    const dispatch = useDispatch();
    const { list, loading } = useSelector(state => state.addCommentReducer);

    const submit = (data) => {

        if(!Cookies.get("token")) {
            toast.error("you need to login");


        }else {

            const body = {
                comment: data?.comment,
                rate: rate
            };

            if (key1 === "courses") {
                body.courses_id = id;
            } else {
                body.innovation_id = id;
            }


            dispatch(FctAddComment({ key1, body }));

        }
    }

    useEffect(() => {
        if(list?.status === 201){
            toast.success(list?.data);
        }
    }, [list])

    const Rating = (status) => {

        if (status)
            setRate(rate + 1)
        else
            setRate(rate - 1)
    }

    return (

        <>
            <Toaster position="top-center" />
            <div className={"w-full"}>
                <form onSubmit={handleSubmit(submit)}>
                    <InputComponent
                        type={InputComment[0]?.type}
                        placeholder={InputComment[0]?.placeholder}
                        IconInput={InputComment[0]?.iconInput}
                        register={register}
                        errors={errors}
                        regex={InputComment[0]?.regex}
                    />
                    <div className={"w-full flex justify-between items-center mb-4"}>
                        <h3 className={"text-[20px]"}>Rate this {key1} </h3>
                        <div className={"flex gap-1"}>
                            {Array(rate)
                                .fill()
                                .map((_, index) => (
                                    <IoStar className="star text-[23px] cursor-pointer" key={`filled-${index}`}
                                            onClick={() => Rating(false)}/>
                                ))}
                            {Array(5 - rate)
                                .fill()
                                .map((_, index) => (
                                    <IoStarOutline className="star text-[23px] cursor-pointer" key={`empty-${index}`}
                                                   onClick={() => Rating(true)}/>
                                ))}
                        </div>
                    </div>
                    <ButtonFormComponent
                        submit={`add`}
                        loading={loading}
                        failed={list?.error}
                    />
                </form>

                {
                    key1 === "innovation" && <div className={"w-full gold my-3 p-3 rounded-md"}>
                        <p className={"text-black text-[18px] text-center"}>you can also share your innovation here, just
                            connect with the admin</p>
                    </div>
                }
            </div>
        </>

    )
}