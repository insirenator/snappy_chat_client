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
        <div className="bg-black bg-opacity-60 sm:my-16 my-2 mx-auto px-2 md:py-32 py-16 md:w-1/2 w-[96%] flex flex-col gap-8 justify-center items-center rounded-lg">
            <img src="/logo.svg" className="md:w-48 w-24"/>
            <h1 className="text-white">Snappy</h1>
            <div className="w-1/2 flex flex-col sm:flex-row gap-2 justify-center items-center">
                <Link to="/login" className="link green-link sm:w-1/2 w-full">Login</Link>
                <Link to="/register" className="link blue-link sm:w-1/2 w-full">Register</Link>
            </div>
        </div>
    )
}

export default Homepage;