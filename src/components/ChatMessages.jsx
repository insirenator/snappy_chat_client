import { Fragment, useEffect, useRef, useState } from "react";
import { BiDownArrow, BiLock } from "react-icons/bi";

const selfMsgStyle = "bg-green-600 px-2 py-2 max-w-sm text-sm rounded";
const otherMsgStyle = "bg-slate-600 px-2 py-2 max-w-sm text-sm rounded";

/* eslint-disable react/prop-types */
const ChatMessages = ({ messages }) => {
  const scrollRef = useRef();
  const chatWindowRef = useRef();
  const [showGoToBottom, setShowGoToBottom] = useState(false);

  useEffect(() => {
    scrollRef.current.scrollIntoView({
      behavior: "auto",
    });
    setShowGoToBottom(false);
  }, [messages]);

  return (
    <div
      ref={chatWindowRef}
      onScroll={() => {
        const scrollBottom = scrollRef.current.getBoundingClientRect().bottom;
        const chatWindowBottom = chatWindowRef.current.getBoundingClientRect().bottom;

        if (scrollBottom > chatWindowBottom) setShowGoToBottom(true);
        else setShowGoToBottom(false);
      }}
      className="chat-msgs flex-1 flex flex-col gap-2 items-start overflow-y-scroll w-full py-3 px-4 relative min-h-[400px] max-h-96 sm:max-h-full"
    >
      {Object.keys(messages).length <= 0 ? (
        <p className="text-md text-gray-500 mx-auto my-auto">No Messages</p>
      ) : (
        <div className="text-xs flex gap-1 mx-auto text-yellow-400">
            <BiLock/>
            <p>All Messages are Encrypted</p>
        </div>
      )}

      {
        Object.keys(messages).length > 0 &&
          Object.keys(messages).map((label, idx) => {
            return (
              <Fragment key={idx}>
              <p key={label} className="text-[10px] text-gray-400 bg-gray-900 mx-auto p-1 rounded-lg">{label}</p>
              {
                messages[label].map((msg, idx) => {
                  return (
                    <div key={idx} className={msg.fromSelf ? "ml-auto" : ""}>
                      <p className={msg.fromSelf ? selfMsgStyle : otherMsgStyle}>
                        {msg.message}
                      </p>
                      <p
                        className={`text-[10px] text-gray-400 mt-1 font-mono font-light ${
                          msg.fromSelf ? "text-right" : ""
                        }`}
                      >
                        {sanitizeTimestamp(msg.timestamp)}
                      </p>
                    </div>
                  );
                })}
              </Fragment>
            ) 
          })
          
      }
      <div ref={scrollRef}></div>
      {showGoToBottom && (
        <div
          className="bg-gray-900 p-2 rounded-full shadow-2x animate-bounce text-green-400 sticky ml-auto bottom-0 cursor-pointer"
          onClick={() => {
            scrollRef.current.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <BiDownArrow />
        </div>
      )}
    </div>
  );
};

const sanitizeTimestamp = (timestamp) => {
  const inputTimestamp = new Date(timestamp);

  const inputTime =
    inputTimestamp.getHours().toString().padStart(2, 0) +
    ":" +
    inputTimestamp.getMinutes().toString().padStart(2, 0);

  return inputTime;
};

export default ChatMessages;
