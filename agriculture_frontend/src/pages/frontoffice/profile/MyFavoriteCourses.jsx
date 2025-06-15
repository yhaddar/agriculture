import React from "react";
import {NotFound} from "../../../Components/_not_found.jsx";
import {CourseComponent} from "../../../Components/fontOffice/CourseComponent.jsx";

export const MyFavoriteCourses = ({ FavoriteFromMemo }) => {

    return (
        <>
            <div className={"w-[79%] mx-auto gap-2 flex justify-between flex-wrap my-4"}>
                {
                    FavoriteFromMemo?.courses?.length > 0 ?
                        FavoriteFromMemo?.courses?.map((cours, index) => {
                            return (
                                <CourseComponent
                                    key={index}
                                    title={cours.courses_title}
                                    description={cours.description}
                                    typePayment={cours.type_payment}
                                    category={cours.category_title}
                                    id={cours.id}
                                    cover={cours.cover}
                                    rating={cours?.avg_rate}
                                    person_rate={cours?.total_person_rate}
                                />
                            )
                        })
                        : <div className={"w-full"}><NotFound text={""}/></div>
                }
            </div>
        </>
    )
}