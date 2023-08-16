import { useEffect, useState } from "react";
import { BiPowerOff } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const Settings = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("chat-app-user"));

    if (!storedUser) {
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  return user ? (
    <div className="bg-gray-900 w-[95%] max-w-[900px] mx-auto mt-4 lg:mt-16 p-8 text-white">

      <h1 className="text-xl font-extrabold text-gray-400">SETTINGS</h1>

      <div className="flex md:gap-4 gap-2 items-center my-8">
        <img
          src={
            user.avatarImage
              ? `data:image/svg+xml;base64,${user.avatarImage}`
              : "/no-profile-picture.png"
          }
          alt="avatar"
          className="md:w-16 md:h-16 w-10 h-10"
        />
        <div>
            <h1 className="text-xl">{user.username}</h1>
            <p className="text-sm text-gray-400">{user.email}</p>
        </div>

        <button 
            className="ml-auto text-2xl text-red-400 hover:text-red-500"
            onClick={() => {
                localStorage.removeItem("chat-app-user");
                navigate("/");
            }}  
        >
            <BiPowerOff />
        </button>
      </div>

      <div className="h-[2px] bg-gray-700"></div>

      <div className="mt-8 transition-all">
        <Link to="/setAvatar" className="text-sm bg-gray-500 p-1.5 rounded bg-opacity-50 hover:bg-purple-400 hover:bg-opacity-50 transition-all">
            {(user.isAvatarImageSet ? "Change" : "Set") + " your Avatar" }
        </Link>
      </div>


    </div>
  ) : (
    <img
      src="/loader.gif"
      className="w-32 h-32 loader fixed top-1/2 left-1/2 -translate-y-16 -translate-x-16"
    />
  );
};

export default Settings;
