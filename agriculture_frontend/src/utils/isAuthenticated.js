import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const IsAuthenticated = ({ children }) => {
    const isLogin = Cookies.get("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate("/forbidden", { replace: true });
        }
    }, [isLogin, navigate]);

    return children;
}