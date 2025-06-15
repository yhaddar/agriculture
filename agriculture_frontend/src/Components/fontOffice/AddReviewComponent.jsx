import React, { useEffect, useState } from "react";
import { logo } from "../../utils/images.js";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { TextAreaComponent } from "./TextAreaComponent.jsx";
import { Regex } from "../../utils/regex.js";
import { useForm } from "react-hook-form";
import { VscFeedback } from "react-icons/vsc";
import { ButtonFormComponent } from "./ButtonFormComponent.jsx";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { AddReviewThunk } from "../../Middleware/ReviewThunk.js";
import toast, { Toaster } from "react-hot-toast";

export const AddReviewComponent = ({ showRate, setShowRate, user }) => {
    const [rate, setRate] = useState(1);
    const dispatch = useDispatch();
    const { list, loading, failed } = useSelector(state => state.addReviewReducer);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const Rating = (status) => {

        if (status)
            setRate(rate + 1)
        else
            setRate(rate - 1)
    }

    const submit = (data) => {
        const token = Cookies.get("token");

        if (token) {
            const body = {
                review: data?.review,
                rating: rate
            };
            dispatch(AddReviewThunk({ body }));
            setSuccess(true);
        }
    };

    useEffect(() => {
        if (success && !loading) {
            if (list?.status === 201) {
                toast.success(list?.data);
                setShowRate(false);
                localStorage.setItem(`isRating-${user}`, true);
            } else if (list?.status === 422) {
                toast.error(list?.data);
            }else if(list?.status === 400) {
                toast.error(list?.error);
            }
            setSuccess(false);
        }
    }, [list, loading, failed, success]);

    return (
        <>
            <Toaster position={"top-center"} />
            <div className="card rounded-md w-[40%] flex justify-center gap-2 flex-col items-center p-4">
                <div className="w-[80px] h-[80px]">
                    <img src={logo} alt="logo" className="w-full h-full" />
                </div>
                <div>
                    <h1 className="text-center capitalize text-[22px] my-3">rate our website</h1>
                    <p className="text-center text-[18px]">
                        We value your feedback! Please take a moment to rate your experience on our website.
                        Your opinion helps us improve our services and make your visit even better.
                    </p>
                </div>
                <div className="flex gap-1 my-3">
                    {[...Array(5)].map((_, index) =>
                        index < rate ? (
                            <IoStar
                                key={index}
                                className="star text-[28px] cursor-pointer text-yellow-500"
                                onClick={() => Rating(false)}
                            />
                        ) : (
                            <IoStarOutline
                                key={index}
                                className="star text-[28px] cursor-pointer"
                                onClick={() => Rating(true)}
                            />
                        )
                    )}
                </div>
                <div className="w-full">
                    <form onSubmit={handleSubmit(submit)}>
                        <TextAreaComponent
                            name={"review"}
                            IconInput={VscFeedback}
                            register={register}
                            errors={errors}
                            regex={Regex[4]}
                            placeholder={"Tell us what you liked or how we can improve..."}
                        />
                        <ButtonFormComponent
                            submit="Submit"
                            loading={loading}
                            failed={failed}
                        />
                    </form>
                </div>
                <div className="my-2">
                    <button className="active:scale-[0.98] text-white" onClick={() => setShowRate(!showRate)}>Remind me later</button>
                </div>
            </div>
        </>
    );
};
