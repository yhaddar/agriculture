import React, {useEffect, useMemo} from "react";
import {CardLearningComponent} from "../../../Components/fontOffice/CardLearningComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {AllMyLearningThunk} from "../../../Middleware/CourseThunk.js";
import {EmptyContentComponent} from "../../../Components/fontOffice/EmptyContentComponent.jsx";
import {InputComponent} from "../../../Components/fontOffice/InputComponent.jsx";
import {useForm} from "react-hook-form";
import {ButtonFormComponent} from "../../../Components/fontOffice/ButtonFormComponent.jsx";
import {InputPromo} from "../../../utils/Lists.js";
import {CheckoutThunk} from "../../../Middleware/CheckoutThunk.js";
import {RESPONSE_FORBIDDEN, RESPONSE_OK} from "../../../utils/enums.js";
import toast, {Toaster} from "react-hot-toast";

export const AllMyLearning = () => {

    const {list, loading} = useSelector(state => state.allMyLearning);
    const checkoutSelector = useSelector(state => state.redirectCheckoutReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AllMyLearningThunk());
    }, [])

    const MyLearningFromMemo = useMemo(() => {
        return list?.response?.learning_list || null
    }, [list || null])

    const calculeTotal = Array?.isArray(MyLearningFromMemo) ? MyLearningFromMemo?.reduce((total, cours) => {
        return total + cours.price
    }, 0) : 0;

    const {register, handleSubmit, formState: {errors}} = useForm();

    const submit = () => {
        console.log("code promo")
    }

    const checkout = () => {
        dispatch(CheckoutThunk());
    }

    useEffect(() => {
        if(checkoutSelector?.list?.status === RESPONSE_OK){
            console.log(checkoutSelector?.list)
            if(checkoutSelector?.list?.data?.status === RESPONSE_FORBIDDEN){
                toast.error(checkoutSelector?.list?.data?.redirect)
            }else {
                window.location.href = checkoutSelector?.list?.data?.redirect;
            }
        }
    }, [checkoutSelector?.list?.status])

    return (
        <>
            <Toaster position="top-center" />
            <div className={"flex justify-between items-start my-5 gap-4"}>
                <div className={"w-1/2 h-[500px] overflow-y-scroll"}>
                    {
                        !loading ? (
                            Array?.isArray(MyLearningFromMemo) ? <div className={"flex flex-col gap-3"}>

                                {
                                    MyLearningFromMemo?.map((learning, index) => (
                                        <CardLearningComponent
                                            key={index}
                                            courses_title={learning?.courses_title}
                                            category_title={learning?.category_title}
                                            isFree={learning?.isFree}
                                            price={learning?.price}
                                            total_person_rate={learning?.total_person_rate}
                                            avg_rate={learning?.avg_rate}
                                            learningId={learning?.learningId}
                                            cover={learning?.cover}
                                            coursesId={learning?.coursesId}
                                            isPaid={learning?.isPaid}
                                        />
                                    ))
                                }

                            </div> : <EmptyContentComponent content={MyLearningFromMemo}/>
                        ) : <p>loading...</p>
                    }
                </div>
                <div className={"w-1/2 flex justify-center"}>
                    <div className={"card p-4 w-[80%]"}>
                        <div>
                            <h3 className={"text-[22px] capitalize"}>total :</h3>
                            <p className={"text-[20px]"}>{list?.response?.countIsPaid} courses payant :
                                ${calculeTotal}</p>
                        </div>
                        <div className={"my-2"}>
                            <h3 className={"text-[22px] capitalize"}>promotion :</h3>
                            <form onClick={handleSubmit(submit)}>
                                <div className={"flex items-center gap-4"}>
                                    <div className={"w-[70%]"}>
                                        <InputComponent
                                            type={InputPromo[0]?.type}
                                            placeholder={InputPromo[0]?.placeholder}
                                            IconInput={InputPromo[0]?.iconInput}
                                            register={register}
                                            errors={errors}
                                            regex={InputPromo[0]?.regex}
                                            required={false}
                                        />
                                    </div>
                                    <div className={"w-[30%]"}>
                                        <ButtonFormComponent submit={"apply"} loading={false} failed={false}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <form onSubmit={handleSubmit(checkout)}>
                            <div className={"w-[100%] flex justify-center"}>
                                <ButtonFormComponent submit={"checkout"} loading={checkoutSelector?.loading} failed={checkoutSelector?.failed}/>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </>
    )
}