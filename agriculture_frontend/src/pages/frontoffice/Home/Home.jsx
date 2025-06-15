import React, {useEffect, useMemo} from "react";
import {HeroComponent} from "../../../Components/fontOffice/HeroComponent.jsx";
import {OurServices} from "./HomeComponent/OurServices.jsx";
import {About} from "./HomeComponent/about.jsx";
import {useDispatch, useSelector} from "react-redux";
import {SettingThunk} from "../../../Middleware/SettingThunk.js";
import {OurTeams} from "./HomeComponent/Teams.jsx";
import {LatestBlogs} from "./HomeComponent/LatestBlogs.jsx";
import {LatestNews} from "./HomeComponent/LatestNews.jsx";
import {LastCourses} from "./HomeComponent/LastCourses.jsx";
import {Reviews} from "./HomeComponent/Reviews.jsx";
import {Weather} from "./HomeComponent/Weather.jsx";
import {LoadingComponent} from "../../../Components/fontOffice/LoadingComponent.jsx";

export const Home = ({ auth }) => {

    const { list, loading } = useSelector((state) => state.settingReducer);
    const dispatch = useDispatch();

    const ourServicesFromMemo = useMemo(() => {
        return list || null;
    }, [list]);

    useEffect(() => {
        dispatch(SettingThunk({ key1: "setting/all", key2: "our_services" }));
    }, []);
    return (
        <>
            {
                loading && <LoadingComponent />
            }
            <HeroComponent service={"home"} />
            <OurServices services={ourServicesFromMemo?.data} />
            <About services={ourServicesFromMemo?.data} />
            <OurTeams />
            <Weather />
            <LatestBlogs />
            <LastCourses />
            <LatestNews />
            <Reviews />
        </>
    )
}