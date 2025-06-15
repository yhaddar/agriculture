import React from "react";
import {BlogsComponent} from "../../../Components/fontOffice/BlogsComponent.jsx";
import {NotFound} from "../../../Components/_not_found.jsx";

export const MyFavoriteBlogs = ({ FavoriteFromMemo }) => {

    return (
        <>
            <div className={"w-[79%] mx-auto gap-2 flex justify-between my-4"}>
                {
                    FavoriteFromMemo?.blogs?.length > 0 ?
                        FavoriteFromMemo?.blogs?.map((blog, index) => {
                            return (
                                <div key={index} className={"flex w-[685px] h-[495px]"}>

                                    <BlogsComponent
                                        id={blog?.id}
                                        image={blog?.image}
                                        title={blog?.title}
                                        description={blog?.description}
                                        category={blog?.category_title}
                                        categoryId={blog?.category_id}
                                        createdAt={blog?.created_at}
                                    />
                                </div>
                            )
                        })
                        : <div className={"w-full"}><NotFound text={""}/></div>
                }
            </div>
        </>
    )
}