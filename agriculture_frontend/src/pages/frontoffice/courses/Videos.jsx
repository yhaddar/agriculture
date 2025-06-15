import React, {useEffect, useMemo, useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {VideoCoursesThunk} from "../../../Middleware/CourseThunk.js";
import {useDispatch, useSelector} from "react-redux";
import {CiPlay1} from "react-icons/ci";
import {MdLockOutline} from "react-icons/md";
import toast, {Toaster} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

export const Videos = ({courses_id, type_payment}) => {

    const [visibility, setVisibility] = useState({});

    const ShowTheVideo = (courses_id) => {

        setVisibility((prev) => ({
            ...visibility,
            [courses_id]: !prev[courses_id],
        }));
    }

    const {list, loading} = useSelector(state => state.videoCoursesReducer);
    const router = useNavigate();

    const RedirectToPageVideos = () => {
        const isLogin = Cookies.get("token");
        if (isLogin) {

            router(`/play-video/${courses_id}`);

        }else {
            toast.error("you need to login first");
        }
    }


    const dispatch = useDispatch();

    useEffect(() => {
        if(Cookies.get("token")){
            dispatch(VideoCoursesThunk({id: courses_id}))
        }

    }, []);


    const videosMemo = useMemo(() => {
        return list || null;
    }, [list || null]);

    return (
        <>
            <Toaster position="top-center" />
            <h1 className={"text-xl capitalize"}>courses content</h1>
            {
                Array.isArray(videosMemo?.response?.courses) ?
                    (
                        videosMemo?.response?.courses.map((video, index) => {
                            const IconVisibility = visibility[video.id] ? FaChevronUp : FaChevronDown;
                            return (
                                <div
                                    key={index}
                                    className={"card-primary-2 w-full my-3 p-3 rounded-sm transition-all duration-500 ease-in-out"}
                                    id={`card-primary-2-id`}>
                                    <div className={"flex justify-between items-center"}>
                                        <h2 className={"capitalize text-xl"}>video {video.order} : {video.title}</h2>
                                        {
                                            type_payment === "free" || videosMemo?.response?.checkout?.status === "paid" ?
                                                <>
                                                    <IconVisibility className={"text-white w-5 h-5 cursor-pointer"}
                                                                    onClick={() => ShowTheVideo(video.id)}/>
                                                </>
                                                : <MdLockOutline className={"text-white w-5 h-5 cursor-pointer"}/>
                                        }
                                    </div>
                                    <div className={`w-full my-3 ${visibility[video.id] ? 'block' : 'hidden'}`}>
                                        <p className={"text-lg"}>{video.description}</p>
                                        <div
                                            className={`w-[100%] h-[330px] my-3 bg-[url(${video.cover})] bg-cover bg-center bg-no-repeat bg-border-box flex justify-center items-center hero_component_image relative`}>
                                            <div
                                                className={"flex border-2 border-white items-center absolute justify-center w-[50px] h-[50px] rounded-full"}
                                                onClick={() => RedirectToPageVideos()}
                                            >
                                                <CiPlay1
                                                    className="text-white w-full h-full p-2 cursor-pointer active:scale-[0.98]"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                    ) : Cookies.get("token") ?
                        <div className={"text-center text-white text-xl"}>{videosMemo?.response?.courses}</div> :
                        <div className={"text-center text-white text-xl"}>you need to login first</div>
            }
        </>
    )
}