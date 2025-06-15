import React, {useEffect, useState} from "react";
import {HeroComponent} from "../../../Components/fontOffice/HeroComponent.jsx";
import {AllInnovationComponent} from "../../../Components/fontOffice/AllInnovationComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {InnovationThunk} from "../../../Middleware/InnovationThunk.js";
import {LoadingComponent} from "../../../Components/fontOffice/LoadingComponent.jsx";

export const Innovation = () => {

    const { list, loading } = useSelector(state => state.innovationReducer);

    const size = 4;
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(InnovationThunk({size, page}));
    }, [page]);

    return <>
        {
            loading && <LoadingComponent />
        }
        <HeroComponent service={"innovation"} />
        <AllInnovationComponent list={list?.data} page={page} setPage={setPage} />
    </>
}