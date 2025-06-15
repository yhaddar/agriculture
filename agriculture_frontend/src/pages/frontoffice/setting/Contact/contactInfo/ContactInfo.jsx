import React from "react";
import {contactInfo} from "../../../../../utils/Lists.js";

export const ContactInfo = () => {
    return (
        <div className={"container mx-auto my-[120px]"}>
            <div className={"mt-[100px]"}>
                <h1 className={"text-[30px] text-center first-letter:capitalize"}>Or you can contact us directly
                    via</h1>
                <div className={"mt-[50px] h-[150px] flex flex-col justify-end"}>
                    <div className={"flex flex-wrap justify-between"}>
                        {
                            contactInfo.map((item, index) => {
                                return (
                                    <div key={index} className={"flex flex-wrap justify-center items-center relative flex-col"}>
                                        <div className={"flex items-center justify-center w-[60px] h-[60px] rounded-full card absolute top-[-25px]"}> <item.icon className={"text-[34px] text-white"} /> </div>
                                        <div className={"card w-[400px] h-[130px] flex flex-col items-center justify-center rounded-[4px]"}>
                                            <h1 className={"text-[18px]"}><span className={"capitalize"}>{item.key1}</span> : {item.title1}</h1>
                                            {item.key2 !== null &&
                                                <h1><span className={"capitalize"}>{item.key2}</span> : {item.title2}
                                                </h1>}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}