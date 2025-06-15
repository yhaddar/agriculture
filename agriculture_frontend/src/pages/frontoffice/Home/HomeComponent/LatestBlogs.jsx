import React, {useEffect, useMemo, useState} from "react";
import {HeroHomeagination} from "../../../../Components/fontOffice/HeaderHomePagination.jsx";
import {useDispatch, useSelector} from "react-redux";
import {BlogsHomeThunk} from "../../../../Middleware/ServiceThunk.js";
import {BlogsComponent} from "../../../../Components/fontOffice/BlogsComponent.jsx";

export const LatestBlogs = () => {

    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const { list, loading } = useSelector(state => state.blogsHomeReducer);

    useEffect(() => {
        dispatch(BlogsHomeThunk({ service: "blogs", page, size: 2 }));
    }, [page]);

    const BlogsFromMemo = useMemo(() => {
        return list?.data || null
    }, [list || null]);

    return (

        <>
            <HeroHomeagination
                title={"latest blogs"}
                page={page}
                last_page={3}
                setPage={setPage}
            />

            <div className={"card w-full h-auto mb-[100px]"}>
                <div className={"container mx-auto py-5"}>

                    {
                        Array?.isArray(BlogsFromMemo?.data) && <div className={"flex gap-4"}>
                            <div className={"w-1/2"}>
                                {
                                    BlogsFromMemo?.data[0] ?
                                        <div className={"flex h-[495px]"}>

                                            <BlogsComponent
                                                id={BlogsFromMemo?.data[0]?.id}
                                                image={BlogsFromMemo?.data[0]?.image}
                                                title={BlogsFromMemo?.data[0]?.title}
                                                description={BlogsFromMemo?.data[0]?.description}
                                                category={BlogsFromMemo?.data[0]?.categories?.title}
                                                categoryId={BlogsFromMemo?.data[0]?.categories?.id}
                                                createdAt={BlogsFromMemo?.data[0]?.created_at}
                                            />
                                        </div>
                                        : null
                                }
                            </div>
                            <div className={"w-1/2"}>
                                {
                                    BlogsFromMemo?.data[1] ?
                                        <div className={"flex h-[495px]"}>

                                            <BlogsComponent
                                                id={BlogsFromMemo?.data[1]?.id}
                                                image={BlogsFromMemo?.data[1]?.image}
                                                title={BlogsFromMemo?.data[1]?.title}
                                                description={BlogsFromMemo?.data[1]?.description}
                                                category={BlogsFromMemo?.data[1]?.categories?.title}
                                                categoryId={BlogsFromMemo?.data[1]?.categories?.id}
                                                createdAt={BlogsFromMemo?.data[1]?.created_at}
                                            />
                                        </div> : null
                                }
                            </div>
                        </div>

                    }

                </div>
            </div>
        </>


    )
}