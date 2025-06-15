import React, {useEffect} from "react";
import "./assets/styles/index.css";
import {useDispatch, useSelector} from "react-redux";
import {Client} from "./pages/frontoffice/client.jsx";
import {NewsThunk} from "./Middleware/NewsThunk.js";
import "./utils/caching.js"
import {BrowserRouter} from "react-router-dom";
import {GetUserDetailThunk} from "./Middleware/AuthThunk.js";
import Cookies from "js-cookie";
import {Admin} from "./pages/backOffice/admin.jsx";

function App() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);

    useEffect(() => {
        dispatch(NewsThunk());
    }, []);


    useEffect(() => {
        const user = Cookies.get("token");
        if(user) {
            dispatch(GetUserDetailThunk({key2: "user"}))
        }
    }, []);

    return (
        <>
            <BrowserRouter>
                {
                    user?.list?.response?.user?.role === "admin" || user?.list?.response?.user?.role === "superadmin" ? <Admin user={user?.list?.response?.user}/> :<Client user={user?.list?.response?.user}/>
                }
            </BrowserRouter>

        </>
    )
}

export default App
