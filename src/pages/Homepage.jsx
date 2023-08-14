import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("chat-app-user")){
            navigate("/chat");
        }
    }, [])

    return (
        <div className="bg-black my-16 mx-auto px-8 py-32 max-w-md flex flex-col gap-8 justify-center items-center rounded-lg">
            <img src="/logo.svg" className="w-48"/>
            <h1 className="text-white">Snappy</h1>
            <div className="w-1/2 flex gap-2 justify-center items-center">
                <Link to="/login" className="link green-link w-1/2">Login</Link>
                <Link to="/register" className="link blue-link w-1/2">Register</Link>
            </div>
        </div>
    )
}

export default Homepage;