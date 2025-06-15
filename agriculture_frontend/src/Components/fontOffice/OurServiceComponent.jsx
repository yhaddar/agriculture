import React from "react";

export const OurServiceComponent = ({ title, image }) => {
   return (
       <div
           className={`w-[calc(100%/5)] px-2`}
       >
           <div
               className="border-2 card-border mx-auto rounded-xl h-40 flex gap-3 flex-col items-center justify-center text-lg font-semibold shadow-md">
               <div className={"w-[70px]"}>
                   <img
                       src={`${image}`}
                       alt=""
                       className={"w-full h-full"}
                   />
               </div>
               <p className={"text-[20px] capitalize"}>{title}</p>
           </div>
       </div>
   )
}