import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CoursesDetailThunk} from "../../../Middleware/CourseThunk.js";
import {useParams} from "react-router-dom";
import {HeroDetailComponent} from "../../../Components/fontOffice/HeroDetailComponent.jsx";
import {KeyLearning} from "./KeyLearning.jsx";
import {CoursesCard} from "./CoursesCard.jsx";
import {ModuleAndTopics} from "./ModuleAndTopics.jsx";
import {Videos} from "./Videos.jsx";
import {AddComment} from "../../../Components/fontOffice/AddComment.jsx";
import {AddCommentThunk, AllCommentThunk} from "../../../Middleware/CommentThunk.js";
import {AllComments} from "../../../Components/fontOffice/AllComments.jsx";
import {LoadingComponent} from "../../../Components/fontOffice/LoadingComponent.jsx";

export const DetailCourses = () => {

    const { list, loading } = useSelector(state => state.coursesDetailReducer);
    const dispatch = useDispatch();
    const { id } = useParams();


    useEffect(() => {
        dispatch(CoursesDetailThunk({ id }));
    }, [])

    const detailCourses = useMemo(() => {
        return list || null;
    }, [list || null])

    return (
        <>
            {
                loading && <LoadingComponent />
            }
            <HeroDetailComponent
                list={detailCourses}
                storage={"courses"}
                rating={list?.data?.avg_rate}
                person_rate={list?.data?.total_person_rate}
            />
            <div className={"container mx-auto my-10"}>
                <div className="flex justify-between gap-3">
                    <div className={"w-[70%] card p-5 rounded-md"}>
                        <KeyLearning keyLearning={list?.data?.keys_learning} />
                    </div>
                    <div className={"w-[30%] p-5 h-full card rounded-md"}>
                        <CoursesCard
                            cover={list?.data?.cover}
                            category={list?.data?.category_title}
                            totalHours={list?.data?.total_hours}
                            type_video={list?.data?.type_video}
                            langues={list?.data?.langues}
                            dateAdded={list?.data?.created_at}
                            type_payment={list?.data?.type_payment}
                            id={id}
                            trailer={list?.data?.trailer}
                            price={list?.data?.price}
                            old_price={list?.data?.old_price}
                            videos_count={list?.data?.videos_count}
                            likes_count={list?.data?.likes_count}
                        />
                    </div>
                </div>
                <div className={"card w-full my-5 p-5"}>
                    <ModuleAndTopics moduleAndTopics={list?.data?.modules_and_topics} />
                </div>
                <div className={"w-[40%] mx-auto card h-full p-5"}>
                    <Videos
                        courses_id={id}
                        type_payment={list?.data?.type_payment}
                    />
                </div>

                <div className={"w-full flex my-10 gap-3 items-center"}>
                    <div className={"w-1/2"}>
                        <div className={"w-[65%] mx-auto flex justify-center"}>
                            <AddComment
                                id={id}
                                FctAddComment={AddCommentThunk}
                                key1={"courses"}
                            />
                        </div>
                    </div>
                    <div className={"w-1/2 card p-3 h-[400px]"}>
                        <AllComments
                            FctDispatch={AllCommentThunk}
                            type={"courses"}
                            id={id}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}