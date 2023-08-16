import { useState, useEffect, useRef } from "react";
import axios from "axios";
import routes from "../api/routes.js";
import Contacts from "../components/Contacts";
import ChatBox from "../components/ChatBox.jsx";
import Welcome from "../components/Welcome.jsx";
import { useNavigate } from "react-router-dom";
// import { BiPowerOff } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import { io } from "socket.io-client";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const socket = useRef();


  useEffect(() => {
    async function fetchContacts() {
      const storedUser = JSON.parse(localStorage.getItem("chat-app-user"));
      if (!storedUser) navigate("/login");
      else {
        setCurrentUser(storedUser);
        const { data } = await axios.get(`${routes.contacts}/${storedUser._id}`);
        setContacts(data.data);
      }
    }
    fetchContacts();
  }, [navigate]);

  useEffect(() => {
    if(currentUser){
      socket.current = io(routes.HOST);
      socket.current.on("active-users", (active_users) => {
        setActiveUsers(active_users);
      })
      socket.current.emit("add-user", currentUser._id);

      return () => {
        socket.current.emit("remove-user", currentUser._id);
      }
    }
  }, [currentUser])

  return (
    <div className="bg-gray-800 text-white mt-10 mx-auto w-[95%] lg:w-3/4 xl:w-1/2 shadow-md flex rounded-xl h-[600px]">
      <div className="bg-gray-900 w-1/4 rounded-s-xl flex flex-col">
        <div className="flex items-center justify-center gap-2 py-4">
          <img src="/logo.svg" className="w-10" />
          <h1 className="text-white uppercase font-bold">Snappy</h1>
        </div>
        {/* CONTACTS */}
        <Contacts contacts={contacts} onClickHandler={setSelectedContact} selectedContact={selectedContact} activeUsers={activeUsers}/>

        <div className="flex items-center justify-center gap-6 bg-black py-5 mt-auto rounded-es-xl">
          <img
            src={
              currentUser.avatarImage
                ? `data:image/svg+xml;base64,${currentUser.avatarImage}`
                : "/no-profile-picture.png"
            }
            alt="avatar"
            className="w-10"
          />
          <h3>{currentUser.username}</h3>
          <button
            className="bg-pink-500 hover:bg-pink-400 p-1 rounded"
            onClick={() => {
              navigate("/settings");
            }}
          >
            <IoIosSettings />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        {selectedContact === null ? (
          <Welcome />
        ) : (
          <ChatBox 
            currentUser={currentUser}
            contact={contacts[selectedContact]} 
            onBack={() => setSelectedContact(null)} 
            socket={socket}
            isActive={activeUsers.includes(contacts[selectedContact]._id)}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
