import { useSelector } from "react-redux"
import { selectUserRole } from "../features/auth/authSlice"

const Home = () => {

    const role = useSelector(selectUserRole)



    return (
        <div>

            <div>
                normal user
            </div>

            {
                role === 'admin' && <div>
                    admin user
                </div>
            }

        </div>
    )
}

export default Home