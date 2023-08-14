/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosSend } from "react-icons/io";

const ChatInput = ({ sendHandler }) => {
  const [message, setMessage] = useState("");
  return (
    <form
      className="w-full flex p-2 gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        if (message) {
          sendHandler(message);
          setMessage("");
        }
      }}
    >
      <input
        placeholder="Message"
        className="input-field"
        onChange={(event) => setMessage(event.target.value)}
        value={message}
      />
      <button
        type="submit"
        className="bg-purple-400 hover:bg-purple-500 rounded-full px-2 text-2xl transition-all"
      >
        <IoIosSend />
      </button>
    </form>
  );
};

export default ChatInput;
