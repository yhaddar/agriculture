import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SettingThunk} from "../../Middleware/SettingThunk.js";
import {dateFormat} from "../../utils/dateFormat.js";
import {LoadingComponent} from "./LoadingComponent.jsx";

export const SettingComponent = ({setting}) => {


    const {list, loading} = useSelector(state => state.settingReducer);
    const dispatch = useDispatch();


    const lists = document.querySelectorAll(".setting ul");
    lists.forEach((item) => {
        item.classList.add("list-disc", "ml-[38px]");
    })

    useEffect(() => {
        dispatch(SettingThunk({key1: "setting/all", key2: setting}));
    }, [])

    const settingFromMemo = useMemo(() => {
        return list || null
    }, [list || null]);


    useEffect(() => {

        if(Array.isArray(settingFromMemo)) {
            const latestDate = settingFromMemo?.data?.reduce((latest, item) => {
                const currentDate = new Date(item?.updated_at);

                return currentDate > latest ? currentDate : latest;

            }, new Date(0));

            document.querySelector(".latestDate").innerText = dateFormat(latestDate);
        }

    }, [list])


    return (
        <>
            {
                loading && <LoadingComponent />
            }
            <div className={"container mx-auto"}>
                <div className={"my-[30px] card w-[70%] mx-auto p-5 rounded-sm"}>
                    {
                        Array.isArray(settingFromMemo?.data) ?
                            settingFromMemo?.data?.map((item, index) => {
                                return (
                                    <div key={index} className={"my-[20px]"}>
                                        <h1 className={"text-[28px] text-description capitalize"}>{index + 1}. {item?.title}</h1>
                                        <div
                                            className={"text-white text-[20px] mb-[15px] leading-[32px] setting fist-letter:capitalize"}
                                            dangerouslySetInnerHTML={{__html: item.description}}/>
                                    </div>
                                )
                            }) : <div className={"flex justify-center items-center"}><h1
                                className={"text-[20px]"}>{settingFromMemo?.data}</h1></div>

                    }
                    <div
                        className={"w-[100%] h-[3px] rounded-md clr-opacity-08-white mt-[30px] mb-[10px] mx-auto"}></div>
                    <h4>last update : <span className={"latestDate"}></span> </h4>
                </div>
            </div>
        </>
    )
}