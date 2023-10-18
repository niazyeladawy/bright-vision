import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectAuth } from "./authSlice";


const PrivateRoute = () => {
    const isAuthenticated = useSelector(selectAuth)
    const location = useLocation()


    return (
        isAuthenticated
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )

}

export default PrivateRoute