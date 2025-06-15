import React from "react";
import {logo} from "../../utils/images.js";
import {NavLink} from "react-router-dom";
import {contacts, otherPages, pages} from "../../utils/Lists.js";
import {IoStar} from "react-icons/io5";
export const FooterComponent = ({ setShowRate, showRate, user }) => {

    const rate = JSON.parse(localStorage.getItem(`isRating-${user}`));

    return (
        <>
            <footer className={"footer"}>
                <div className={"container mx-auto"}>
                    <div className={"flex justify-between py-10"}>
                        <div className={"w-[16%]"}>
                            <div className={"w-[160px]"}>
                                <img src={`${logo}`} className={"w-full"} alt={"logo"}/>
                            </div>
                        </div>
                        <div className={"w-[25%]"}>
                            <h1 className={"text-[22px] capitalize mb-3"}>home pages</h1>
                            <ul className={"flex flex-col gap-2"}>
                                {
                                    pages?.map((page, index) => (
                                        <li key={index}>
                                            <NavLink
                                                className={"capitalize text-[17px] text-bold page-hover duration-500 ease-in-out"}
                                                to={`${page === "home" ? "/" : page}`}>{page}</NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={"w-[25%]"}>
                            <h1 className={"text-[22px] capitalize mb-3"}>other pages</h1>
                            <ul className={"flex flex-col gap-2"}>
                                {
                                    otherPages?.map((page, index) => (
                                        <li key={index}>
                                            <NavLink
                                                className={"capitalize text-[17px] text-bold page-hover duration-500 ease-in-out"}
                                                to={`${page === "home" ? "/" : page}`}>{page}</NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={"w-[25%]"}>
                            <h1 className={"text-[22px] capitalize mb-3"}>contact</h1>
                            <ul className={"flex flex-col gap-2"}>
                                <li className={"capitalize text-[17px] text-bold text-white"}>email: <a href={`mailto:${contacts.email}`}>{contacts.email}</a></li>
                                <li className={"capitalize text-[17px] text-bold text-white"}>phone: <a href={`tel:${contacts.phone}`}>{contacts.phone}</a></li>
                                <li className={"capitalize text-[17px] text-bold text-white"}>fix: <a href={`tel:${contacts.fix}`}>{contacts.fix}</a></li>
                                <li className={"capitalize text-[17px] text-bold text-white"}>whatsapp: {contacts.whatsapp}</li>
                            </ul>
                        </div>
                    </div>
                    <div className={`border-t-2 footer py-2 flex items-center ${rate ? "justify-center" : "justify-between"} `}>
                        <p className={"text-white text-[14px]"}>  © {new Date().getFullYear()} Designed and developed by HADDAR Youssef.</p>
                        {
                            !rate ? <div className={"flex items-center gap-1"}>
                                <IoStar className="star text-[15px] cursor-pointer text-yellow-500"/>
                                <button className={"text-white text-[14px] capitalize"}
                                        onClick={() => setShowRate(!showRate)}>rate now
                                </button>
                            </div> : null
                        }
                    </div>
                </div>
            </footer>
        </>
    )
}