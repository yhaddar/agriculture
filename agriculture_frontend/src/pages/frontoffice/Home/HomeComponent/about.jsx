import React, {useEffect, useMemo} from "react";
import {AboutUs} from "../../../../utils/Lists.js";
import {useDispatch, useSelector} from "react-redux";
import {StatistiqueThunk} from "../../../../Middleware/StatistiqueThunk.js";

export const About = ({ services }) => {

    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.statistiqueReducer);

    useEffect(() => {
        dispatch(StatistiqueThunk({ key1: "statistic/all", key2: "counts" }));
    }, []);

    const statisticFromMemo = useMemo(() => {
        return list || null;
    }, [list || null])

    return (
        <>
            <div className={"my-[70px] container mx-auto"} id={"#about"}>

                <div className={"flex gap-3 items-center"}>
                    <div className={"w-1/2"}>
                        <div className={"w-[100%]"}>
                            <img className={"rounded-md w-full h-full"} src={`${AboutUs.image}`} alt={AboutUs.title}/>
                        </div>
                    </div>
                    <div className={"w-1/2 flex flex-col gap-2"}>
                        <div>
                            <h1 className={"text-[30px]"}>{AboutUs.title}</h1>
                            <h2 className={"subtitle text-[20px]"}>{AboutUs.subtitle}</h2>
                        </div>
                        <p className={"text-justify"}>{AboutUs.description}</p>
                        <div>
                            <h3 className={"text-[25px] subtitle"}>our services :</h3>
                            <ul>
                                {
                                    Array.isArray(services) && services?.map((service, index) => (
                                        <li key={index} className={""}>
                                            <p className={"text-[20px] text-opacity-2 text-lowercase text-justify first-letter:capitalize span"}>{service.title} : {service.description}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={"flex justify-around"}>
                            <div className={"relative flex"}>
                                <p className={"text-[30px]"}>{statisticFromMemo?.data?.blogs > 99 ? `+${statisticFromMemo?.data?.blogs}` : statisticFromMemo?.data?.blogs}</p>
                                <p className={"text-[32px] my-1 capitalize absolute top-[24px]"}>blogs</p>
                            </div>
                            <div className={"relative flex"}>
                                <p className={"text-[30px]"}>{statisticFromMemo?.data?.courses > 99 ? `+${statisticFromMemo?.data?.courses}` : statisticFromMemo?.data?.courses}</p>
                                <p className={"text-[32px] my-1 capitalize absolute top-[24px]"}>courses</p>
                            </div>
                            <div className={"relative flex"}>
                                <p className={"text-[30px]"}>{statisticFromMemo?.data?.innovations > 99 ? `+${statisticFromMemo?.data?.innovations}` : statisticFromMemo?.data?.innovations}</p>
                                <p className={"text-[32px] my-1 capitalize absolute top-[24px]"}>innovation</p>
                            </div>
                            <div className={"relative flex"}>
                                <p className={"text-[30px]"}>{statisticFromMemo?.data?.fermer > 99 ? `+${statisticFromMemo?.data?.fermer}` : statisticFromMemo?.data?.fermer}</p>
                                <p className={"text-[32px] my-1 capitalize absolute top-[24px]"}>fermer</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}