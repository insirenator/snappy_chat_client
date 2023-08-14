/* eslint-disable react/prop-types */

import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const ChatHeader = ({ contact, onBack, isActive }) => {
  const [showProfile, SetShowProfile] = useState(false);

  return (
    <div className="flex items-center gap-4 w-full p-4 shadow-xl bg-gray-900 rounded-se-xl">
      <button
        className="text-xl hover:text-slate-400 transition-all"
        onClick={onBack}
      >
        <BiArrowBack />
      </button>
      <div className="relative">
        <img
          src={
            contact.avatarImage
              ? `data:image/svg+xml;base64,${contact.avatarImage}`
              : "/no-profile-picture.png"
          }
          alt="avatar"
          className="w-10 cursor-pointer"
          onClick={() => SetShowProfile(prev => !prev)}
        />
        {/* Status Circle */}
        <div className={"w-3 h-3 rounded-full absolute right-0 bottom-0 border-gray-900 border-2 " + (isActive ? "bg-green-400" : "bg-gray-400")}></div>
      </div>
      <h3>{contact.username}</h3>

      {/* ContactProfile */}
      {showProfile && (
        <div className="fixed top-1/4 left-1/2 bg-gray-900 w-64 h-64 -translate-x-16 -translate-y-16 p-8 flex flex-col justify-center items-center gap-4 rounded-xl shadow-2xl">
          <img
            src={
              contact.avatarImage
                ? `data:image/svg+xml;base64,${contact.avatarImage}`
                : "/no-profile-picture.png"
            }
            alt="avatar"
            className="w-32"
          />
          <h1 className="text-2xl">{contact.username}</h1>
          <p 
            className="fixed top-3 right-3 cursor-pointer hover:text-gray-500"
            onClick={() => SetShowProfile(false)}
          >
            X
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
