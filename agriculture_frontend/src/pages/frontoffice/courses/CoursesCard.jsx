import React, {useEffect, useState} from "react";
import {CiPlay1} from "react-icons/ci";
import {MdFavorite, MdOutlineCategory, MdOutlinePayments, MdOutlineTranslate} from "react-icons/md";
import {GoClock, GoVideo} from "react-icons/go";
import {LuCalendarDays} from "react-icons/lu";
import {dateFormat} from "../../../utils/dateFormat.js";
import {ButtonFormComponent} from "../../../Components/fontOffice/ButtonFormComponent.jsx";
import toast, {Toaster} from "react-hot-toast";
import {FavoriteIcon} from "../../../Components/fontOffice/FavoriteIcon.jsx";
import Cookies from "js-cookie";
import {AddMyLearningThunk} from "../../../Middleware/CourseThunk.js";
import {useDispatch, useSelector} from "react-redux";

export const CoursesCard = ({
                                cover,
                                category,
                                totalHours,
                                type_video,
                                langues,
                                dateAdded,
                                type_payment,
                                id,
                                trailer,
                                price,
                                old_price,
                                videos_count,
                                likes_count
                            }) => {

    const [isTrailer, setTrailer] = useState(false);

    const dispatch = useDispatch();
    const {list, loading, failed} = useSelector(state => state.addToMyLearning);

    const AddToMyLearning = (e) => {
        e.preventDefault();

        const isLogin = Cookies.get("token");
        if (!isLogin || isLogin === "" || isLogin == null) {
            toast.error("you need to login first");
        } else {

            dispatch(AddMyLearningThunk({body: {courses_id: id}}));
            if (list?.status === 400 && list?.data) {
                toast.error(list.data);
            } else if (list?.status === 201 && list?.data) {
                toast.success(list.data);
            }
        }
    }


    return (
        <>
            <Toaster position={"top-center"} reserveOrder={false}/>
            <div
                className={"w-[100%] mx-auto h-[250px] rounded-sm bg-border bg-border-box bg-no-repeat bg-center bg-cover"}
                style={{backgroundImage: `url(${cover}`}}>
                <div className={"flex justify-center items-center w-full h-full"}>
                    {
                        !isTrailer &&
                        <div
                            className={"flex border-2 border-white items-center absolute justify-center w-[50px] h-[50px] rounded-full"}
                            onClick={() => setTrailer(true)}>
                            <CiPlay1 className="text-white w-full h-full p-2 cursor-pointer active:scale-[0.98]"/>
                        </div>
                    }
                    {
                        isTrailer &&
                        <video
                            src={trailer}
                            title={trailer}
                            width="1200"
                            height="1200"
                            controls
                            className={"w-full h-full"}
                            autoPlay
                            style={{backgroundColor: "transparent", objectFit: "cover"}}
                        />
                    }
                </div>
            </div>
            <div className={"w-full h-full my-3 flex flex-col gap-3"}>
                <div className={"flex items-center gap-3"}>
                    <MdOutlineCategory className={"text-white w-8 h-8"}/>
                    <p className={"text-xl"}>{category}</p>
                </div>
                <div className={"flex items-center gap-3"}>
                    <GoClock className={"text-white w-8 h-8"}/>
                    <p className={"text-xl"}>{totalHours} in this video</p>
                </div>
                <div className={"flex items-center gap-3"}>
                    <GoVideo className={"text-white w-8 h-8"}/>
                    <p className={"text-xl"}>{type_video === "video" ? "1 video" : `${videos_count} video`}</p>
                </div>
                <div className={"flex items-center gap-3"}>
                    <MdOutlineTranslate className={"text-white w-8 h-8"}/>
                    <p className={"text-xl"}>{typeof langues === 'string' && JSON.parse(langues).join(", ")}</p>
                </div>
                <div className={"flex items-center gap-3"}>
                    <LuCalendarDays className={"text-white w-8 h-8"}/>
                    <p className={"text-xl"}>{dateFormat(dateAdded)}</p>
                </div>
                <div className={"flex items-center gap-3"}>
                    <MdOutlinePayments className={"text-white w-8 h-8"}/>
                    <div className={"flex items-end gap-1"}>
                        <p className={"text-xl"}>{type_payment === "free" ? type_payment : `$${price}`}</p>
                        {
                            type_payment === "paid" && old_price > 0 &&
                            <p className={"danger line-through"}>{`$${old_price}`}</p>
                        }
                    </div>
                </div>
                <div className={"flex items-center gap-3"}>
                    <MdFavorite className={"text-white w-8 h-8"}/>
                    <p className={"text-xl"}>{`${likes_count || 0} person like this courses`}</p>
                </div>
                <div className={"flex justify-between items-center w-full"}>
                    <div className={"w-[90%]"}>
                        <form onSubmit={AddToMyLearning} method={"POST"}>
                            <ButtonFormComponent submit={"add to my learning"} loading={loading} failed={failed}/>
                        </form>
                    </div>
                    <div className={"flex justify-center items-center"}>
                        <FavoriteIcon type={"courses"} id={id} size={48}/>
                    </div>
                </div>
            </div>
        </>
    )
}