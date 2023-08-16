import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "../api/routes";
import { BiSolidCrown } from "react-icons/bi";

/*
    To store an SVG image as a base64 string, use Buffer library:
    const buffer = new Buffer(image.data);
    const str = buffer.toString("base64"));
*/

const SetAvatar = () => {

    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const setProfilePicture = async () => {
        const storedUser = JSON.parse(localStorage.getItem("chat-app-user"));

        if(!storedUser) navigate("/login");

        const { data } = await axios.post(`${routes.setAvatar}/${storedUser._id}`, { avatarImage: avatars[selectedAvatar].image});
        console.log(data);
        localStorage.setItem("chat-app-user", JSON.stringify(data.data));
        navigate("/chat");
    };

    useEffect(() => {
        async function fetchAvatars() {
            const { data } = await axios.get(routes.avatars);
            console.log(data);
            setAvatars(data.data);
            setIsLoading(false);
        }

        fetchAvatars();
    }, [])

    return (
        <div className="h-full flex flex-col gap-16 justify-center items-center mt-16">
            {
                isLoading ? (
                    <img src="/loader.gif" className="w-32 h-32 loader fixed top-1/2 -translate-y-16"/>
                ) : (
                    <>
                        <h1 className="text-3xl text-white font-bold">Pick your Avatar</h1>

                        {/* Free Avatars */}
                        <div className="flex gap-10 justify-center items-center flex-wrap sm:w-3/4 w-full p-1">
                        {
                            avatars.map((avatar, idx) => {
                                return (
                                    <div key={idx} className={ 
                                    selectedAvatar === idx ? 
                                    "border-2 border-purple-600 rounded-full" : ""
                                    }>
                                    <img 
                                    src={`data:image/svg+xml;base64,${avatar.image}`}
                                    alt="avatar"
                                    onClick={() => setSelectedAvatar(idx)}
                                    className="w-10 sm:w-16 m-1 cursor-pointer"
                                    />
                                    </div>
                                )
                            })
                        }
                        </div>

                        {/* Purchased Avatars */}
                        <div className="sm:w-3/4 w-full flex flex-col items-center gap-4">
                        <p className="text-yellow-400 text-center">Purchased Avatars</p>
                        <div  className="flex gap-10 justify-center items-center flex-wrap p-1">
                            {
                                avatars.slice(0, 3).map((avatar, idx) => {
                                    return (
                                        <div key={idx} className={ 
                                        selectedAvatar === idx ? 
                                        "border-2 border-purple-600 rounded-full" : ""
                                        }>
                                        <img 
                                        src={`data:image/svg+xml;base64,${avatar.image}`}
                                        alt="avatar"
                                        onClick={() => setSelectedAvatar(idx)}
                                        className="w-10 sm:w-16 m-1 cursor-pointer"
                                        />
                                        </div>
                                    )
                                })     
                            }
                        </div>
                        <Link to="/buyAvatars" className="text-white hover:text-purple-400 transition-all">Buy Avatars <BiSolidCrown className="text-yellow-300 inline text-lg"/></Link>
                        </div>

                        <button
                            disabled={selectedAvatar === null ? true : false} 
                            className="link blue-link disabled:bg-gray-500 disabled:text-gray-400"
                            onClick={setProfilePicture}
                        >
                            Set Profile Picture
                        </button>
                    </>
                )
            }
        </div>
    )
}

export default SetAvatar;