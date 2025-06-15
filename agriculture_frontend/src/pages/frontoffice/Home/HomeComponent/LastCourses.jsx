import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CoursesHomeThunk} from "../../../../Middleware/CourseThunk.js";
import {HeroHomeagination} from "../../../../Components/fontOffice/HeaderHomePagination.jsx";
import {CourseComponent} from "../../../../Components/fontOffice/CourseComponent.jsx";

export const LastCourses = () => {

    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const {list, loading} = useSelector(state => state.coursesHomeReducer);

    useEffect(() => {
        dispatch(CoursesHomeThunk({page, size: 3}));
    }, [page]);

    const CoursesFromMemo = useMemo(() => {
        return list?.data || null
    }, [list || null]);

    return (
        <>
            <HeroHomeagination
                title={"Most liked Courses"}
                page={page}
                last_page={CoursesFromMemo?.last_page < 3 ? CoursesFromMemo?.last_page : 3}
                setPage={setPage}
            />
            <div className={"container mx-auto h-auto mb-[100px]"}>

                <div className={"flex justify-between mx-auto"}>
                    {
                        Array.isArray(CoursesFromMemo?.data) ? (
                            CoursesFromMemo?.data?.map((cours, i) => (
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
                        ) : null

                    }
                </div>

            </div>
        </>
    )
}