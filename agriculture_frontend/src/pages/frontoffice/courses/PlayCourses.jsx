import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {VideoCoursesThunk} from "../../../Middleware/CourseThunk.js";
import {useParams} from "react-router-dom";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {CiPlay1} from "react-icons/ci";
import {PlayedVideo} from "../../../utils/images.js";

export const PlayCourses = () => {
    const {list, loading} = useSelector(state => state.videoCoursesReducer);
    const { id } = useParams();
    const dispatch = useDispatch();

    const [visibility, setVisibility] = useState({});
    const [selectedVideo, setSelectedVideo] = useState(list);

    useEffect(() => {
        dispatch(VideoCoursesThunk({id}));
    }, [dispatch, id]);

    useEffect(() => {
        if (list?.response?.courses && list.response?.courses.length > 0) {
            setSelectedVideo(list.response?.courses[0]);
        }
    }, [list]);

    const ShowTheVideo = (videoId) => {
        setVisibility((prev) => ({
            ...prev,
            [videoId]: !prev[videoId],
        }));
    };

    const playSelectedVideo = (video) => {
        setSelectedVideo(video);
    };

    return (
        <div className={"h-[900px] mx-5 pt-[100px] flex gap-3 items-start"}>
            <div className={"w-[70%] h-full"}>
                <div className={""}>
                    {selectedVideo && (
                        <video src={selectedVideo.video_link} controls className="w-full" autoPlay id={"video"} />
                    )}
                </div>
            </div>
            <div className={"header-detail p-2 rounded-md w-[30%] h-[721px] overflow-scroll"}>
                {
                    Array.isArray(list?.response?.courses) ?
                        list.response?.courses.map((video, index) => {
                            const IconVisibility = visibility[video.id] ? FaChevronUp : FaChevronDown;

                            return (
                                <div
                                    key={index}
                                    className={"loading w-full my-3 p-3 rounded-sm transition-all duration-500 ease-in-out"}>
                                    <div className={"flex justify-between items-center"}>
                                        <h2 className={"capitalize text-xl"}>video {video.order} : {video.title}</h2>
                                        <IconVisibility
                                            className={"text-white w-5 h-5 cursor-pointer"}
                                            onClick={() => ShowTheVideo(video.id)}
                                        />
                                        {
                                            selectedVideo?.id === video.id &&
                                            <div className={"w-[50px]"}>
                                                <img src={`${PlayedVideo}`} alt={"loading..."}/>
                                            </div>
                                        }
                                    </div>
                                    <div className={`w-full my-3 ${visibility[video.id] ? 'block' : 'hidden'}`}>
                                        <p className={"text-lg"}>{video.description}</p>
                                        <div
                                            className={`w-full h-[330px] my-3 bg-[url(${video.cover})] bg-cover bg-center bg-no-repeat bg-border-box flex justify-center items-center hero_component_image relative`}
                                            onClick={() => playSelectedVideo(video)}
                                        >
                                            <div
                                                className={"flex border-2 border-white items-center absolute justify-center w-[50px] h-[50px] rounded-full"}
                                            >
                                                <CiPlay1 className="text-white w-full h-full p-2 cursor-pointer active:scale-[0.98]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className={"text-center text-white text-xl"}>{list?.response || "No videos found."}</div>
                        )
                }
            </div>
        </div>
    );
};
