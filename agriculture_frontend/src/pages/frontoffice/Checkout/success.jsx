import React, {useEffect} from "react";
import {payment} from "../../../utils/images.js";
import {ButtonLinkComponent} from "../../../Components/fontOffice/ButtonLinkComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {SuccessThunk} from "../../../Middleware/CheckoutThunk.js";
import {LoadingComponent} from "../../../Components/fontOffice/LoadingComponent.jsx";

export const Success = () => {

    const { list, loading } = useSelector(state => state.successReducer);
    const dispatch = useDispatch();

    const session_id = useLocation();


    const sessionId = session_id?.search.split("=")[1];

    useEffect(() => {
        dispatch(SuccessThunk({ body: { session_id: sessionId } }));
    }, [])

    return <>
        {
            loading && <LoadingComponent />
        }
        <div className={"w-full h-screen flex justify-center items-center flex-col gap-3"}>
                <div
                    className={`bg-[url(${payment})] bg-center bg-cover bg-no-repeat bg-border-box object-fit w-[400px] h-[400px]`}></div>
            <h1 className={"text-[30px]"}>{list?.data}</h1>
            <ButtonLinkComponent link={""} text={"return back"} size={20} />
        </div>
    </>
}