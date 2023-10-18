import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { loginAsync, selectAuth } from "../features/auth/authSlice"
import './Login.css'
import { useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from "react-hot-toast"

const Login = () => {

    const isAuthenticated = useSelector(selectAuth)
    const location = useLocation()
    const [user, setUser] = useState({ email: "", password: "" });
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()


        try {

            const credentials = {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }

            const resultAction = await dispatch(loginAsync(user));
            if (loginAsync.fulfilled.match(resultAction)) {
                // Login was successful, handle the success case
            } else if (loginAsync.rejected.match(resultAction)) {
                // Login was rejected, handle the error case
                toast.error(resultAction.error.message)
                console.error(resultAction.payload);
            }
        } catch (error) {
            console.error(error);
        }


    }

    const handleChage = (e) => {
        const { value, name } = e.target


        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    if (isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />
    }


    return (
        <div className="container">
            <div className="login-cont">
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <input onChange={handleChage} type="email" name="email" placeholder="email" />
                    </div>
                    <div className="form-control">
                        <input onChange={handleChage} type="password" name="password" placeholder="password" />
                    </div>
                    <button className="submit-btn">Sign In</button>
                </form>
            </div>

            <Toaster />

        </div>
    )



}

export default Login