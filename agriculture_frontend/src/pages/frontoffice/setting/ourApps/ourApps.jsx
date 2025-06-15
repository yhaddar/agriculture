import React, {useEffect, useMemo} from "react";
import {HeroComponent} from "../../../../Components/fontOffice/HeroComponent.jsx";
import {AppComponent} from "../../../../Components/fontOffice/AppsComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {SettingThunk} from "../../../../Middleware/SettingThunk.js";
import {LoadingComponent} from "../../../../Components/fontOffice/LoadingComponent.jsx";

export const OurApps = () => {

    const { loading, list } = useSelector(state => state.settingReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(SettingThunk({key1: "setting/all", key2: "our_apps"}));
    }, [])

    const ourAppsFromMemo = useMemo(() => {
        return list || null
    }, [list || null]);

    return (
        <>
            {
                loading && <LoadingComponent />
            }
            <HeroComponent service={"ourApps"} />
            <div className={"container mx-auto my-[100px]"}>

                {
                    Array.isArray(ourAppsFromMemo?.data) ?

                        ourAppsFromMemo?.data.map((app, index) => {
                            return (
                                <AppComponent
                                    key={index}
                                    description={app.description}
                                    image={app.image}
                                    link={app.link}
                                    services={app.services}
                                />
                            )
                        }) : <div className={"flex justify-center items-center"}><h1
                            className={"text-[20px]"}>{ourAppsFromMemo?.data}</h1></div>
                }

            </div>
        </>
    )
}