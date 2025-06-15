import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveFromFavoriteThunk } from "../../Middleware/FavoriteThunk.js";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { AddLikeThunk } from "../../Middleware/LikeThunk.js";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export const LikeIcon = ({ type, id, size = null }) => {
    const dispatch = useDispatch();

    const { list2 } = useSelector(state => state.removeFavoriteReducer);
    const user = useSelector(state => state.userReducer);
    const userId = user?.list?.response?.user?.id;

    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const saved = localStorage.getItem(`like_userId-${userId}-${type}_id-${id}`);
        if (saved) {
            setIsSaved(true);
        } else {
            setIsSaved(false);
        }
    }, [userId, type, id]);

    const AddToFavorite = () => {
        const isLogin = Cookies.get("token");
        if (!isLogin) {
            toast.error("You need to login first");
        } else {
            const body = type === "courses" ? { courses_id: id } : { service_id: id };
            dispatch(AddLikeThunk({ type, body }));
            localStorage.setItem(`like_userId-${userId}-${type}_id-${id}`, true);
            setIsSaved(true);
        }
    };

    const RemoveFromFavorite = () => {
        if (isSaved) {
            dispatch(RemoveFromFavoriteThunk({ type, id }));
        }
    };

    useEffect(() => {
        if (list2?.data) {
            localStorage.removeItem(`like_userId-${userId}-${type}_id-${id}`);
            setIsSaved(false);
        }
    }, [list2?.data, type, id, userId]);

    return (
        <>
            <Toaster position="top-center" />
            {isSaved ? (
                <MdFavorite
                    className={`text-[${size ? size : "23"}px] font-bold icons cursor-pointer duration-500 active:scale-[0.90]`}
                    onClick={RemoveFromFavorite}
                />
            ) : (
                <MdFavoriteBorder
                    className={`text-[${size ? size : "23"}px] font-bold icons cursor-pointer duration-500 active:scale-[0.90]`}
                    onClick={AddToFavorite}
                />
            )}
        </>
    );
};
