import {logo} from "../../utils/images.js";
import {pages} from "../../utils/Lists.js";
import {Link, NavLink} from "react-router-dom";
import {FaRegUser} from "react-icons/fa";
import React, {useEffect} from "react";
import {MdOutlineNotifications} from "react-icons/md";
import {PiTranslateBold} from "react-icons/pi";

export const NavbarComponent = ({auth, setAuth, isLogin, profile}) => {

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                document.querySelector("header").classList.add("header")
            } else {
                document.querySelector("header").classList.remove("header")
            }
        })
    }, []);

    return (
        <>
            <header className={"fixed w-full z-10"}>
                <div className={"container mx-auto py-4"}>
                    <div className={"flex"}>
                        <div className={"w-[16%]"}>
                            <div className={"w-[100px] h-[80px] flex justify-center items-center"}>
                                <img src={`${logo}`} alt={"logo"}/>
                            </div>

                        </div>
                        <div className={"w-[68%]"}>
                            <ul className={"flex gap-10 justify-center items-center h-full"}>
                                {
                                    pages?.map((page, id) => (
                                        <li key={id} className={"relative"}>
                                            <NavLink
                                                to={`${page === "home" ? "/" : page}`}
                                                className={"text-2xl capitalize text-white text-bold page-hover duration-500 ease-in-out"}>{page}</NavLink>
                                        </li>
                                    ))
                                }
                            </ul>

                        </div>
                        <div className={"w-[16%]"}>
                            <div className={"flex justify-end items-center h-full gap-2"}>
                                <MdOutlineNotifications className={"text-4xl text-white"}/>
                                {
                                    !isLogin ? <FaRegUser className={"text-3xl icons duration-300 cursor-pointer"} onClick={() => setAuth(!auth)} /> :
                                        <Link to={"/profile"}>
                                            <div
                                                className={"w-[43px] h-[43px] rounded-full bg-cover bg-border-box bg-no-repeat bg-center"}
                                                style={{ backgroundImage: `url(${profile})` }}></div>
                                        </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}