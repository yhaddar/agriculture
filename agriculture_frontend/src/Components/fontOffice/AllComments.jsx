import React, {useEffect, useMemo} from "react";
import {IoStar, IoStarOutline} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {dateFormat} from "../../utils/dateFormat.js";
import {EmptyContentComponent} from "./EmptyContentComponent.jsx";

export const AllComments = ({type, FctDispatch, id}) => {

    const {list, loading} = useSelector(state => state.allCommentReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FctDispatch({key1: type, key2: id}));
    }, [])

    const commentFromMemo = useMemo(() => {
        return list || null;
    }, [list || null])

    return (
        <>
            <div className={"w-full h-full overflow-scroll"}>
                {
                    Array.isArray(commentFromMemo) ?
                        commentFromMemo?.map((comment, index) => {
                            const star = Math.floor(Number(comment?.rate))
                                return (
                                    <div key={index} className={"w-full flex gap-2 my-5 items-center"}>
                                        <div className={`w-[80px] h-[70px] rounded-full object-cover bg-center bg-border-box bg-cover bg-no-repeat bg-[url(${comment.profile})]`}></div>
                                        <div className={"w-full"}>
                                            <div className={"w-full flex justify-between items-center"}>
                                                <div>
                                                    <div className={"flex items-center gap-[25px]"}>
                                                        <h1 className={"text-[20px]"}>{comment?.full_name}</h1>
                                                        <p className={"text-[16px]"}>{ dateFormat(`${comment?.created_at}`) }</p>
                                                    </div>
                                                    <div>
                                                        <a className={"blog-description"} href={`mailto:${comment?.email}`}>{comment?.email}</a>
                                                    </div>
                                                </div>
                                                <div className={"flex gap-1"}>
                                                    {Array(star)
                                                        .fill()
                                                        .map((_, index) => (
                                                            <IoStar className="star text-[23px] cursor-pointer"
                                                                    key={`filled-${index}`}/>
                                                        ))}
                                                    {Array(5 - star)
                                                        .fill()
                                                        .map((_, index) => (
                                                            <IoStarOutline className="star text-[23px] cursor-pointer"
                                                                           key={`empty-${index}`}/>
                                                        ))}
                                                </div>
                                            </div>
                                            <div>
                                                <p>{comment?.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )
                        : <EmptyContentComponent content={commentFromMemo} />
                }
            </div>
        </>
    )
}