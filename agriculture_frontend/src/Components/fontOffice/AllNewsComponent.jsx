import React, {useMemo} from "react";

import {NewsComponent} from "./NewsComponent.jsx";
import {PaginationComponent} from "./PaginationComponent.jsx";
import {NotFound} from "../_not_found.jsx";

export const AllNewsComponent = ({list = [], page, setPage}) => {

    const NewsFromMemo = useMemo(() => {
        return list;
    }, [list]);

    return (
        <>

        <div className={"container mx-auto my-10"}>
            <div className={"w-[90%] mx-auto flex flex-col gap-5"}>
                {
                    NewsFromMemo?.data?.length > 0 ?

                        (
                            <>
                                <div className={"flex gap-4"}>
                                    <div className={"w-[60%]"}>
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
                                                />: null
                                        }
                                    </div>
                                    <div className={"flex flex-col gap-2 w-[40%]"}>

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
                                <div className={"flex gap-4"}>
                                    <div className={"w-[60%]"}>
                                        {
                                            NewsFromMemo?.data[3] ?
                                                <NewsComponent
                                                    id={NewsFromMemo?.data[3].id}
                                                    title={NewsFromMemo?.data[3].title}
                                                    categoryId={NewsFromMemo?.data[3]?.categories?.id}
                                                    category={NewsFromMemo?.data[3]?.categories?.title}
                                                    description={NewsFromMemo?.data[3].description}
                                                    image={NewsFromMemo?.data[3].image}
                                                    location={NewsFromMemo?.data[3].location}
                                                    created_at={NewsFromMemo?.data[3].created_at}
                                                /> : null
                                        }
                                    </div>
                                    <div className={"flex flex-col gap-2 w-[40%]"}>
                                        {
                                            NewsFromMemo?.data[4] ?
                                                <NewsComponent
                                                    is_small={true}
                                                    id={NewsFromMemo?.data[4].id}
                                                    title={NewsFromMemo?.data[4].title}
                                                    categoryId={NewsFromMemo?.data[4]?.categories?.id}
                                                    category={NewsFromMemo?.data[4]?.categories?.title}
                                                    description={NewsFromMemo?.data[4].description}
                                                    image={NewsFromMemo?.data[4].image}
                                                    location={NewsFromMemo?.data[4].location}
                                                    created_at={NewsFromMemo?.data[4].created_at}
                                                /> : null
                                        }
                                        {
                                            NewsFromMemo?.data[5] ?
                                                <NewsComponent
                                                    is_small={true}
                                                    id={NewsFromMemo?.data[5].id}
                                                    title={NewsFromMemo?.data[5].title}
                                                    categoryId={NewsFromMemo?.data[5]?.categories?.id}
                                                    category={NewsFromMemo?.data[5]?.categories?.title}
                                                    description={NewsFromMemo?.data[5].description}
                                                    image={NewsFromMemo?.data[5].image}
                                                    location={NewsFromMemo?.data[5].location}
                                                    created_at={NewsFromMemo?.data[5].created_at}
                                                /> : null
                                        }
                                    </div>
                                </div>
                            </>
                        )

                        : <NotFound text={NewsFromMemo}/>
                }
            </div>
        </div>

            <PaginationComponent setPage={setPage} page={page} currentPage={list?.current_page || 4}
                                 lastPage={list?.last_page}/>
        </>
    )
}