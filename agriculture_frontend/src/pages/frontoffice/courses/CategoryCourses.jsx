import React, {useEffect, useMemo} from "react";
import {HeroComponent} from "../../../Components/fontOffice/HeroComponent.jsx";
import {useParams} from "react-router-dom";
import {CoursesCategoryThunk} from "../../../Middleware/CourseThunk.js";
import {useDispatch, useSelector} from "react-redux";
import {CourseComponent} from "../../../Components/fontOffice/CourseComponent.jsx";
import {NotFound} from "../../../Components/_not_found.jsx";

export const CategoryCourses = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, list } = useSelector(state => state.coursesCategoryReducer);

    useEffect(() => {
        dispatch(CoursesCategoryThunk({ category_id: id }))
    }, []);

    const CoursesCategoryMemo = useMemo(() => {
        return list || null;
    }, [list || null])

    return (
        <>
            <HeroComponent service={`courses/category/${id}`} storage={"categories_courses"} />
                <div className={"container mx-auto"}>
                    <div className={"mt-5 flex justify-between flex-wrap w-[79%] mx-auto"}>
                        {

                            loading ? <div className={"w-full"}><NotFound text={""} /></div> :
                                Array.isArray(CoursesCategoryMemo?.data) ? (
                                    CoursesCategoryMemo?.data?.map((cours, i) => (
                                        <CourseComponent
                                            key={i}
                                            title={cours.courses_title}
                                            description={cours.description}
                                            typePayment={cours.type_payment}
                                            category={cours.category_title}
                                            id={cours.id}
                                            cover={cours.cover}
                                            rating={cours?.avg_rate}
                                            person_rate={cours?.total_person_rate}
                                        />
                                    ))
                                ) : (
                                    <div className="w-full">
                                        <h1 className="text-xl ms-3 capitalize">{CoursesCategoryMemo?.courses}</h1>
                                    </div>
                                )

                        }
                    </div>
                </div>

        </>
    )
}