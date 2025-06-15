import React from "react";

export const HeroCategoryComponent = ({ storage, image, title, description }) => {

    return (
       <>
           <section className={"h-screen w-full bg-cover bg-no-repeat bg-center bg-origin-border relative z-[1] hero_component_image"} style={{ backgroundImage: `url(${image})` }}>
               <div className={"relative"}>
                   <div className={"container mx-auto"}>
                       <div className={"flex flex-col justify-center w-full h-screen"}>
                           <div className={"flex flex-col justify-center py-5 items-center"}>
                               <div className={"w-[885px]"}>
                                   <h1 className={`text-center text-[33px] first-letter:text-[57px] capitalize"} hero-title`}>{title}</h1>
                                   <p className={"text-center text-[22px]"}>{description}</p>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </section>
       </>
    )
}