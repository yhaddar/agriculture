import React, {useEffect, useMemo, useState} from "react";
import {HeroHomeagination} from "../../../../Components/fontOffice/HeaderHomePagination.jsx";
import {ReviewComponent} from "../../../../Components/fontOffice/ReviewComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {AllReviewThunk} from "../../../../Middleware/ReviewThunk.js";

export const Reviews = () => {

    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const {list, loading} = useSelector(state => state.allReviewReducer);

    useEffect(() => {
        dispatch(AllReviewThunk({page: page, size: 3}))
    }, [page]);

    const ReviewMemo = useMemo(() => {
        return list?.data || null;
    }, [list || null]);


    return (
        <>
            <div className={"mt-[150px] mb-[100px]"}>
                <HeroHomeagination
                    title={""}
                    page={page}
                    last_page={ReviewMemo?.last_page}
                    setPage={setPage}
                />

                <div className={"container mx-auto"}>
                    {
                        Array.isArray(ReviewMemo?.data) ?

                            <div className={"flex justify-center gap-2"}>
                                {
                                    ReviewMemo?.data[0] ?
                                        <div className={"w-[35%]"}>
                                            <ReviewComponent
                                                profile={ReviewMemo?.data[0]?.profile}
                                                full_name={ReviewMemo?.data[0]?.full_name}
                                                email={ReviewMemo?.data[0]?.email}
                                                rating={ReviewMemo?.data[0]?.rating}
                                                review={ReviewMemo?.data[0]?.review}
                                            />
                                        </div> : null
                                }

                                {
                                    ReviewMemo?.data[1] ?
                                        <div className={"w-[35%]"}>
                                            <ReviewComponent
                                                profile={ReviewMemo?.data[1]?.profile}
                                                full_name={ReviewMemo?.data[1]?.full_name}
                                                email={ReviewMemo?.data[1]?.email}
                                                rating={ReviewMemo?.data[1]?.rating}
                                                review={ReviewMemo?.data[1]?.review}
                                            /></div> : null
                                }

                                {
                                    ReviewMemo?.data[2] ?
                                        <div className={"w-[35%]"}>
                                            <ReviewComponent
                                                profile={ReviewMemo?.data[2]?.profile}
                                                full_name={ReviewMemo?.data[2]?.full_name}
                                                email={ReviewMemo?.data[2]?.email}
                                                rating={ReviewMemo?.data[2]?.rating}
                                                review={ReviewMemo?.data[2]?.review}
                                            /></div> : null
                                }
                            </div>

                            : <div
                                className={"text-2xl w-full h-full text-white flex justify-center items-center"}>{ReviewMemo?.data}</div>
                    }

                </div>

            </div>
        </>
    )
}