import {BlogsComponent} from "./BlogsComponent.jsx";
import {PaginationComponent} from "./PaginationComponent.jsx";
import React, {useMemo} from "react";
import {NotFound} from "../_not_found.jsx";

export const AllBlogsComponent = ({page, setPage, list}) => {

    const BlogsFromMemo = useMemo(() => {
        return list
    }, [list]);


    return (
        <>
            {
                BlogsFromMemo?.data?.length > 0  ?
                    <div className={"container mx-auto"}>
                        <h1>{BlogsFromMemo[0] ? BlogsFromMemo[0]?.id : null}</h1>

                        <div className={"w-[90%] mx-auto flex flex-col gap-3 py-5"}>
                            <div className={"flex justify-between gap-3"}>
                                {
                                    BlogsFromMemo?.data[0] ?
                                        <div className={"flex w-[685px] h-[495px]"}>

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
                                {
                                    BlogsFromMemo?.data[1] ?
                                        <div className={"flex w-[685px] h-[495px]"}>

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


                            <div className={"flex justify-between gap-3"}>
                                {
                                    BlogsFromMemo?.data[2] ?
                                        <div className={"flex w-[774px] h-[495px]"}>

                                            <BlogsComponent
                                                id={BlogsFromMemo?.data[2]?.id}
                                                image={BlogsFromMemo?.data[2]?.image}
                                                title={BlogsFromMemo?.data[2]?.title}
                                                description={BlogsFromMemo?.data[2]?.description}
                                                category={BlogsFromMemo?.data[2]?.categories?.title}
                                                categoryId={BlogsFromMemo?.data[2]?.categories?.id}
                                                createdAt={BlogsFromMemo?.data[2]?.created_at}
                                            />
                                        </div>
                                        : null
                                }
                                {
                                    BlogsFromMemo?.data[3] ?
                                        <div className={"flex w-[597px] h-[495px]"}>

                                            <BlogsComponent
                                                id={BlogsFromMemo?.data[3]?.id}
                                                image={BlogsFromMemo?.data[3]?.image}
                                                title={BlogsFromMemo?.data[3]?.title}
                                                description={BlogsFromMemo?.data[3]?.description}
                                                category={BlogsFromMemo?.data[3]?.categories?.title}
                                                categoryId={BlogsFromMemo?.data[3]?.categories?.id}
                                                createdAt={BlogsFromMemo?.data[3]?.created_at}
                                            />
                                        </div>
                                        : null
                                }

                            </div>


                            <div className={"flex justify-between gap-3"}>

                                <div className={"flex gap-3"}>
                                    {
                                        BlogsFromMemo?.data[4] ?
                                            <div className={"flex w-[460px] h-[517px]"}>

                                                <BlogsComponent
                                                    width={"460"}
                                                    id={BlogsFromMemo?.data[4]?.id}
                                                    image={BlogsFromMemo?.data[4]?.image}
                                                    title={BlogsFromMemo?.data[4]?.title}
                                                    description={BlogsFromMemo?.data[4]?.description}
                                                    category={BlogsFromMemo?.data[4]?.categories?.title}
                                                    categoryId={BlogsFromMemo?.data[4]?.categories?.id}
                                                    createdAt={BlogsFromMemo?.data[4]?.created_at}
                                                />
                                            </div> : null
                                    }

                                    {
                                        BlogsFromMemo?.data[5] ?
                                            <div className={"flex w-[460px] h-[517px]"}>

                                                <BlogsComponent
                                                    width={"460"}
                                                    id={BlogsFromMemo?.data[5]?.id}
                                                    image={BlogsFromMemo?.data[5]?.image}
                                                    title={BlogsFromMemo?.data[5]?.title}
                                                    description={BlogsFromMemo?.data[5]?.description}
                                                    category={BlogsFromMemo?.data[5]?.categories?.title}
                                                    categoryId={BlogsFromMemo?.data[5]?.categories?.id}
                                                    createdAt={BlogsFromMemo?.data[5]?.created_at}
                                                />
                                            </div> : null
                                    }

                                </div>

                                <div className={"flex flex-col justify-between gap-3"}>
                                    {
                                        BlogsFromMemo?.data[6] ?
                                            <div className={"flex w-[439px] h-[252px]"}>

                                                <BlogsComponent
                                                    width={"439"}
                                                    id={BlogsFromMemo?.data[6]?.id}
                                                    image={BlogsFromMemo?.data[6]?.image}
                                                    title={BlogsFromMemo?.data[6]?.title}
                                                    description={BlogsFromMemo?.data[6]?.description}
                                                    category={BlogsFromMemo?.data[6]?.categories?.title}
                                                    categoryId={BlogsFromMemo?.data[6]?.categories?.id}
                                                    createdAt={BlogsFromMemo?.data[6]?.created_at}
                                                />
                                            </div> : null
                                    }

                                    {
                                        BlogsFromMemo?.data[7] ?
                                            <div className={"flex w-[439px] h-[252px]"}>
                                                <BlogsComponent
                                                    width={"439"}
                                                    id={BlogsFromMemo?.data[7]?.id}
                                                    image={BlogsFromMemo?.data[7]?.image}
                                                    title={BlogsFromMemo?.data[7]?.title}
                                                    description={BlogsFromMemo?.data[7]?.description}
                                                    category={BlogsFromMemo?.data[7]?.categories?.title}
                                                    categoryId={BlogsFromMemo?.data[7]?.categories?.id}
                                                    createdAt={BlogsFromMemo?.data[7]?.created_at}
                                                />
                                            </div> : null
                                    }

                                </div>

                            </div>


                        </div>

                    </div>
                    : <NotFound text={BlogsFromMemo}/>
            }

            <PaginationComponent setPage={setPage} page={page} currentPage={list?.current_page || 1}
                                 lastPage={list?.last_page}/>
        </>
    )
}