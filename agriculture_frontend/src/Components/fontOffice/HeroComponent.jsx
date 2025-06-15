import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {HeroServiceThunk} from "../../Middleware/ServiceThunk.js";
import {ButtonLinkComponent} from "./ButtonLinkComponent.jsx";

export const HeroComponent = ({ storage = null, service }) => {


    const {list} = useSelector(state => state.heroBlogs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(HeroServiceThunk({service: service}));

    }, []);

    return (
       <>
           <section className={"h-screen w-full bg-cover bg-no-repeat bg-center bg-origin-border relative z-[1] hero_component_image"} style={{ backgroundImage: `url(${list?.data?.image})` }}>
               <div className={"relative"}>
                   <div className={"container mx-auto"}>
                       <div className={"flex flex-col justify-center w-full h-screen"}>
                           <div className={"flex flex-col justify-center py-5 items-center"}>
                               <div className={"w-[885px]"}>
                                   <h1 className={`text-center text-[33px] first-letter:text-[57px] ${service === "faq" ? "uppercase" : "capitalize"} hero-title`}>{list?.data?.title}</h1>
                                   <p className={"text-center text-[22px]"}>{list?.data?.description}</p>
                               </div>
                               {
                                   service === "home" ?
                                       <div className={"my-8"}>
                                           <div className={"flex gap-3 justify-center items-center"}>
                                               <ButtonLinkComponent
                                                   text={"more"}
                                                   link={"#about"}
                                               />
                                               <ButtonLinkComponent
                                                   text={"contact"}
                                                   link={"contact"}
                                                   byBg={false}
                                               />

                                           </div>
                                       </div>
                                       : null
                               }
                           </div>
                       </div>
                   </div>
               </div>
           </section>
       </>
    )
}