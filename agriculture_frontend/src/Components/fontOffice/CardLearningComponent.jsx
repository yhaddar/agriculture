import React, {useEffect} from "react";
import {Stars} from "./Stars.jsx";
import {GoTrash} from "react-icons/go";
import {RemoveCoursesLearningThunk} from "../../Middleware/CourseThunk.js";
import {useDispatch, useSelector} from "react-redux";
import {Toaster} from "react-hot-toast";
import {Link} from "react-router-dom";

export const CardLearningComponent = ({ coursesId, learningId, courses_title, isPaid, category_title, cover, isFree, price, total_person_rate, avg_rate  }) => {

    const { list, loading } = useSelector(state => state.removeCoursesLearningReducer);
    const dispatch = useDispatch();

    const Remove = () => {
        dispatch(RemoveCoursesLearningThunk({id: learningId}))
    }

    useEffect(() => {
        if (list?.status === 200) {
            window.location.reload();
        }
    }, [list?.status, dispatch]);
    return (
        <>
            <Toaster position={"top-center"} />
            <div className={"card w-full"} id={"learning_cards"}>
                <div className={"p-3 flex gap-3 justify-between rounded-md"}>
                    <div className={`w-[130px] rounded-sm bg-[url(${cover})] bg-center bg-cover bg-no-repeat bg-border-box object-fit`}></div>
                    <div className={"w-[80%]"}>
                        <Link to={`/courses/detail/${coursesId}`} className={"text-[20px]"}>{courses_title}</Link>
                        <p className={"text-opacity"}>{category_title}</p>
                        <div className={"my-2"}>
                            <Stars rating={avg_rate} total_person_rate={total_person_rate}/>
                        </div>
                        <div className={"flex items-center gap-1 mt-3"}>
                            <p className={`py-1 px-4 capitalize rounded-sm ${isFree ? 'success' : 'gold'} flex`}>{isFree ? "free" : `$${price}`}</p>
                            <p className={`py-1 px-4 capitalize rounded-sm ${isPaid ? 'success' : 'bg-danger'} flex`}>{isPaid ? "Purchased" : `Unpurchased`}</p>
                        </div>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <GoTrash
                            className={"text-[35px] text-white bg-danger p-[5px] rounded-sm cursor-pointer active:Scale-[0.98]"} onClick={() => Remove()}/>
                    </div>
                </div>
            </div>
        </>
    )
}