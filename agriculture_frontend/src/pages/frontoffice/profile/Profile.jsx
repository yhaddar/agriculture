import React, {useEffect, useMemo} from "react";
import {Form} from "./Form.jsx";
import {MyFavoriteBlogs} from "./MyFavoriteBlogs.jsx";
import {useDispatch, useSelector} from "react-redux";
import {AllFavoriteThunk} from "../../../Middleware/FavoriteThunk.js";
import {MyFavoriteCourses} from "./MyFavoriteCourses.jsx";
import {TitleComponent} from "../../../Components/fontOffice/TitleComponent.jsx";
import {AllMyLearning} from "./AllMyLearning.jsx";
import {LoadingComponent} from "../../../Components/fontOffice/LoadingComponent.jsx";

export const Profile = ({ user }) => {

    const dispatch = useDispatch();
    const {list, loading} = useSelector(state => state.allToFavoriteReducer);

    useEffect(() => {
        dispatch(AllFavoriteThunk())
    }, [])

    const FavoriteFromMemo = useMemo(() => {
        return list?.response || null
    }, [list || null])

    return (
        <>
            {
                loading && <LoadingComponent />
            }
            <section className={"py-[150px]"}>
                <div className={"container mx-auto"}>
                    <div className={"my-5"}>
                        <Form />
                    </div>
                    <div className={"my-[50px]"}>
                        <div className={"my-5"}>
                            <TitleComponent title={"my favorite"}/>
                            <div className={"my-10"}>
                                <MyFavoriteBlogs FavoriteFromMemo={FavoriteFromMemo}/>
                            </div>
                            <div>
                                <MyFavoriteCourses FavoriteFromMemo={FavoriteFromMemo}/>
                            </div>
                        </div>
                    </div>
                    <div className={"mt-5 border-t-2 prev"}>
                        <div className={"mt-[50px]"}>
                            <TitleComponent title={"my learning"}/>
                        </div>
                        <AllMyLearning />
                    </div>
                </div>
            </section>
        </>
    )
}