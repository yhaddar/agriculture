import React, {useEffect, useMemo} from "react";
import {HeroDetailComponent} from "../../../../Components/fontOffice/HeroDetailComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {InnovationDetailThunk} from "../../../../Middleware/InnovationThunk.js";
import {DescriptionInnovation} from "./DescriptionInnovation.jsx";
import {AddComment} from "../../../../Components/fontOffice/AddComment.jsx";
import {AddCommentThunk, AllCommentThunk} from "../../../../Middleware/CommentThunk.js";
import {AllComments} from "../../../../Components/fontOffice/AllComments.jsx";

export const DetailInnovation = () => {

    const {list, loading} = useSelector(state => state.innovationDetailReducer);
    const dispatch = useDispatch();
    const {id} = useParams();


    useEffect(() => {
        dispatch(InnovationDetailThunk({id}));
    }, [])

    const detailInnovation = useMemo(() => {
        return list || null;
    }, [list || null])


    return (
        <>
            <HeroDetailComponent
                list={detailInnovation}
                storage={"innovations"}
                rating={detailInnovation?.data?.avg_rate || 0}
                person_rate={detailInnovation?.data?.total_person_rate || 0}
            />

            <div className={"container mx-auto my-5"}>
                <DescriptionInnovation
                    description={detailInnovation?.data?.description}
                    impact={detailInnovation?.data?.impact}
                    innovation={detailInnovation?.data?.innovation}
                />
                <div className={"w-full flex my-10 gap-3 items-center"}>
                    <div className={"w-1/2"}>
                        <div className={"w-[65%] mx-auto flex justify-center"}>
                            <AddComment
                                id={id}
                                FctAddComment={AddCommentThunk}
                                key1={"innovation"}
                            />
                        </div>
                    </div>
                    <div className={"w-1/2 card p-3 h-[400px]"}>
                        <AllComments
                            FctDispatch={AllCommentThunk}
                            type={"innovation"}
                            id={id}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}