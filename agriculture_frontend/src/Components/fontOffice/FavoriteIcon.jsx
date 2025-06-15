import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToFavoriteThunk, RemoveFromFavoriteThunk } from "../../Middleware/FavoriteThunk.js";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

export const FavoriteIcon = ({ type, id, size = 23, favoriteId }) => {
    const dispatch = useDispatch();
    const { list } = useSelector(state => state.addToFavoriteReducer);
    const { list2 } = useSelector(state => state.removeFavoriteReducer);
    const user = useSelector(state => state.userReducer);

    const userId = user?.list?.response?.user?.id;
    const localKey = `favorite_userId-${userId}-${type}_id-${id}`;

    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(localKey);
        if (saved === "true") {
            setIsSaved(true);
        }
    }, [localKey]);

    const AddToFavorite = () => {
        const isLogin = Cookies.get("token");
        if (!isLogin) {
            toast.error("You need to login first");
            return;
        }

        const body = type === "blogs" ? { blog_id: id } : { course_id: id };
        dispatch(AddToFavoriteThunk({ type, body }));

        localStorage.setItem(localKey, "true");
        setIsSaved(true);
    };

    const RemoveFromFavorite = () => {
        if (!isSaved) return;

        if (!favoriteId) {
            toast.error("Favorite ID is missing.");
            return;
        }

        dispatch(RemoveFromFavoriteThunk({ type, id: favoriteId }));

        console.log(favoriteId);

        localStorage.removeItem(localKey);
        setIsSaved(false);
    };

    // Handle removal from localStorage on successful removal
    useEffect(() => {
        if (list2?.data) {
            localStorage.removeItem(localKey);
            setIsSaved(false);
        }
    }, [list2?.data, localKey]);

    return (
        <>
            <Toaster position="top-center" />
            {isSaved ? (
                <IoBookmark
                    className={`text-[${size}px] font-bold icons cursor-pointer duration-500 active:scale-90`}
                    onClick={RemoveFromFavorite}
                />
            ) : (
                <IoBookmarkOutline
                    className={`text-[${size}px] font-bold icons cursor-pointer duration-500 active:scale-90`}
                    onClick={AddToFavorite}
                />
            )}
        </>
    );
};
