import {Route, Routes, useLocation} from "react-router-dom";
import {NavbarComponent} from "../../Components/fontOffice/NavbarComponent.jsx";
import {Home} from "./Home/Home.jsx";
import {Blogs} from "./Blogs/Blogs.jsx";
import React, {useEffect, useState} from "react";
import {FooterComponent} from "../../Components/fontOffice/FooterComponent.jsx";
import {DetailBlog} from "./Blogs/DetailBlogs/DetailBlog.jsx";
import {CategoryDetail} from "./servicesComponent/CategoryDetail.jsx";
import {News} from "./News/News.jsx";
import {Authentication} from "../Authentication/Authentication.jsx";
import {Mail} from "./mail/mail.jsx";
import {ResetPassword} from "../Authentication/ResetPassword/ResetPassword.jsx";
import {Courses} from "./courses/Courses.jsx";
import {Innovation} from "./Innovation/Innovation.jsx";
import {Contact} from "./setting/Contact/contact.jsx";
import {PrivacyPolicy} from "./setting/privacy_policy/PrivacyPolicy.jsx";
import {FAQ} from "./setting/FAQ/FAQ.jsx";
import {OurApps} from "./setting/ourApps/ourApps.jsx";
import {DetailInnovation} from "./Innovation/DetailInnovation/DetailInnovation.jsx";
import {CategoryCourses} from "./courses/CategoryCourses.jsx";
import {DetailCourses} from "./courses/DetailCourses.jsx";
import {PlayCourses} from "./courses/PlayCourses.jsx";
import {Profile} from "./profile/Profile.jsx";
import {AddReviewComponent} from "../../Components/fontOffice/AddReviewComponent.jsx";
import {IsAuthenticated} from "../../utils/isAuthenticated.js";
import {PageNotFound} from "../../Components/fontOffice/404.jsx";
import {Forbidden} from "../../Components/fontOffice/403.jsx";
import {Success} from "./Checkout/success.jsx";
import {Cancel} from "./Checkout/Cancel.jsx";
import Cookies from "js-cookie";

export const Client = ({ user }) => {

    const [auth, setAuth] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {

        if(pathname === "/reset/password") setAuth(false);

    }, [auth])

    const path = (pathname === "/validate/email" || pathname.toString().startsWith("/reset"));

    const [showRate, setShowRate] = useState(false);

    useEffect(() => {
        const review = document.getElementById("review").classList;

        if(review[4] === "block"){
            document.body.classList.add("overflow-hidden")
        }else {
            document.body.classList.remove("overflow-hidden")
        }
    }, [showRate]);

    return <>

        <div
            className={`top-0 w-full h-screen fixed ${!showRate ? "hidden" : 'block'} z-10 bg-review flex justify-center items-center`}
            id={"review"}>
            <AddReviewComponent setShowRate={setShowRate} showRate={showRate} user={user?.id}/>
        </div>

        {
            !path ? <NavbarComponent
                auth={auth}
                setAuth={setAuth}
                isLogin={Cookies.get("token")}
                profile={user?.profile}
            /> : null
        }
        {
            auth && <Authentication setAuth={setAuth} auth={auth}/>
        }
        <Routes>
            <Route path={"/"} element={<Home auth={auth}/>}/>
            <Route path={"/blogs"} element={<Blogs/>}/>
            <Route path={"/:service/detail"} element={<DetailBlog/>}/>
            <Route path={":service/category"} element={<CategoryDetail/>}/>
            <Route path={"/news"} element={<News/>}/>
            <Route path={"/validate/email"}
                   element={<Mail title={"Validate Your Email"} pathname={pathname} auth={auth} setAuth={setAuth}/>}/>
            <Route path={"/reset/password"}
                   element={<Mail title={"Reset your password"} pathname={pathname} auth={auth} setAuth={setAuth}/>}/>
            <Route path={"/reset-password/email/:email"} element={<ResetPassword/>}/>
            <Route path={"courses"} element={<Courses/>}/>
            <Route path={"innovation"} element={<Innovation/>}/>
            <Route path={"contact"} element={<Contact/>}/>
            <Route path={"/*"} element={<PageNotFound />}/>
            <Route path={"privacy policy"} element={<PrivacyPolicy/>}/>
            <Route path={"faq"} element={<FAQ/>}/>
            <Route path={"our apps"} element={<OurApps/>}/>
            <Route path={`/innovation/:id`} element={<DetailInnovation/>}/>
            <Route path={`/courses/category/:id`} element={<CategoryCourses/>}/>
            <Route path={`/courses/detail/:id`} element={<DetailCourses/>}/>
            <Route path={'/play-video/:id'} element={<PlayCourses/>}/>
            <Route path={"/profile"} element={<IsAuthenticated> <Profile user={user}/></IsAuthenticated>}/>
            <Route path={"/forbidden"} element={<Forbidden />} />
            <Route path={"/success"} element={<IsAuthenticated><Success /></IsAuthenticated>} />
            <Route path={"/cancel"} element={<IsAuthenticated><Cancel /></IsAuthenticated>} />
        </Routes>
        {
            !path ? <FooterComponent setShowRate={setShowRate} showRate={showRate} user={user?.id} /> : null
        }
    </>
}