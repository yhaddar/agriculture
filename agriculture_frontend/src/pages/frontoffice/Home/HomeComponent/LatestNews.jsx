import React, {useEffect, useMemo, useState} from "react";
import {HeroHomeagination} from "../../../../Components/fontOffice/HeaderHomePagination.jsx";
import {useDispatch, useSelector} from "react-redux";
import {NewsHomeThunk} from "../../../../Middleware/ServiceThunk.js";
import {NewsComponent} from "../../../../Components/fontOffice/NewsComponent.jsx";

export const LatestNews = () => {

    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const { list, loading } = useSelector(state => state.newsHomeReducer);

    useEffect(() => {
        dispatch(NewsHomeThunk({ service: "news", page, size: 3 }));
    }, [page]);

    const NewsFromMemo = useMemo(() => {
        return list?.data || null
    }, [list || null]);

    return (

        <>
            <HeroHomeagination
                title={"latest news"}
                page={page}
                last_page={3}
                setPage={setPage}
            />

            <div className={"card w-full h-auto mb-[100px]"}>
                <div className={"container mx-auto py-5"}>

                    {
                        Array?.isArray(NewsFromMemo?.data) && <div className={"flex gap-4"}>
                            <div className={"w-[65%]"}>

                                {
                                    NewsFromMemo?.data[0] ?
                                        <NewsComponent
                                            id={NewsFromMemo?.data[0].id}
                                            title={NewsFromMemo?.data[0].title}
                                            categoryId={NewsFromMemo?.data[0]?.categories?.id}
                                            category={NewsFromMemo?.data[0]?.categories?.title}
                                            description={NewsFromMemo?.data[0].description}
                                            image={NewsFromMemo?.data[0].image}
                                            location={NewsFromMemo?.data[0].location}
                                            created_at={NewsFromMemo?.data[0].created_at}
                                        /> : null
                                }


                            </div>
                            <div className={"w-[35%]"}>
                                <div className={"flex flex-col gap-3"}>

                                    {
                                        NewsFromMemo?.data[1] ?
                                            <NewsComponent
                                                is_small={true}
                                                id={NewsFromMemo?.data[1].id}
                                                title={NewsFromMemo?.data[1].title}
                                                categoryId={NewsFromMemo?.data[1]?.categories?.id}
                                                category={NewsFromMemo?.data[1]?.categories?.title}
                                                description={NewsFromMemo?.data[1].description}
                                                image={NewsFromMemo?.data[1].image}
                                                location={NewsFromMemo?.data[1].location}
                                                created_at={NewsFromMemo?.data[1].created_at}
                                            /> : null
                                    }
                                    {
                                        NewsFromMemo?.data[2] ?
                                            <NewsComponent
                                                is_small={true}
                                                id={NewsFromMemo?.data[2].id}
                                                title={NewsFromMemo?.data[2].title}
                                                categoryId={NewsFromMemo?.data[2]?.categories?.id}
                                                category={NewsFromMemo?.data[2]?.categories?.title}
                                                description={NewsFromMemo?.data[2].description}
                                                image={NewsFromMemo?.data[2].image}
                                                location={NewsFromMemo?.data[2].location}
                                                created_at={NewsFromMemo?.data[2].created_at}
                                            /> : null
                                    }
                                </div>
                            </div>
                        </div>

                    }

                </div>
            </div>
        </>


    )
}