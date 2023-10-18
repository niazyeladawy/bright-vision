import { Link } from "react-router-dom"
import './Navbar.css'
import { useDispatch, useSelector } from "react-redux"
import { logout, selectAuth } from "../../features/auth/authSlice"

const Navbar = () => {

    const isAuthenticated = useSelector(selectAuth)
    const dispatch = useDispatch()

    const handleLogout = ()=>{
        dispatch(logout())
    }

    return (
        <nav className="navbar">
            <Link className="logo" to='/'>Bright Vision</Link>
            {
                isAuthenticated && <button className="singout" onClick={handleLogout}>Sign out</button>
            }
            
        </nav>
    )
}

export default Navbar