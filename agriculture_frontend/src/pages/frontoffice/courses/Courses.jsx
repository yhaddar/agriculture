import React, {useEffect, useMemo} from 'react';
import {HeroComponent} from "../../../Components/fontOffice/HeroComponent.jsx";
import {HeroPagination} from "../../../Components/fontOffice/HeaderPagination.jsx";
import {CourseComponent} from "../../../Components/fontOffice/CourseComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {CoursesThunk} from "../../../Middleware/CourseThunk.js";
import {NotFound} from "../../../Components/_not_found.jsx";
import {LoadingComponent} from "../../../Components/fontOffice/LoadingComponent.jsx";

export const Courses = () => {

    const dispatch = useDispatch();
    const {list, loading} = useSelector(state => state.coursesReducer);

    useEffect(() => {
        dispatch(CoursesThunk());

    }, [])

    const CoursesFromMemo = useMemo(() => {
        return list || null;
    }, [list || null]);

    return <>
        {
            loading && <LoadingComponent />
        }
        <HeroComponent service={"courses"}/>
        <div className={"container mx-auto my-5"}>
            {
                loading ? <NotFound text={""}/> :
                    <>
                        {
                            Array.isArray(CoursesFromMemo?.data) ?
                                (
                                    CoursesFromMemo?.data?.length > 0 ? (
                                        CoursesFromMemo?.data.map((course, index) => {

                                            return (
                                                <div key={index} className="w-[79%] my-[100px] mx-auto">
                                                    <HeroPagination
                                                        category_title={course.category_title}
                                                        category_id={course.category_id}
                                                    />
                                                    <div className="mt-5 flex justify-between flex-wrap w-full">
                                                        {
                                                            Array.isArray(course?.courses) ? (
                                                                course?.courses?.map((cours, i) => (
                                                                    <CourseComponent
                                                                        key={i}
                                                                        title={cours.courses_title}
                                                                        description={cours.description}
                                                                        typePayment={cours.type_payment}
                                                                        category={course.category_title}
                                                                        id={cours.id}
                                                                        cover={cours.cover}
                                                                        rating={cours?.avg_rate}
                                                                        person_rate={cours?.total_person_rate}
                                                                    />
                                                                ))
                                                            ) : (
                                                                <div className="w-full">
                                                                    <h1 className="text-xl ms-3 capitalize">{course?.courses}</h1>
                                                                </div>
                                                            )

                                                        }
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <NotFound text={""}/>
                                    )
                                ) : <NotFound text={CoursesFromMemo?.data}/>
                        }

                    </>
            }
        </div>
    </>
}