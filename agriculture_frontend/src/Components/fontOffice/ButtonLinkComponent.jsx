import {Link} from "react-router-dom";
import React from "react";

export const ButtonLinkComponent = ({ text, link, byBg = true, size = 22 }) => {
    return (
        <Link
            to={`/${link}`}
              className={`text-[${size}px] flex items-center justify-center capitalize w-[186px] h-[58px] ${!byBg ? "contact-link" : "more"} rounded-md border-2 hover:bg-transparent duration-300 ease-in-out`}>{text}</Link>
    )
}