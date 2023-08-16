import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import axios from "axios";
import routes from "../api/routes";

/* eslint-disable react/prop-types */
const ChatBox = ({ currentUser, contact, onBack, socket, isActive }) => {
  const [messages, setMessages] = useState([]);

  const handleSend = async (message) => {
    socket.current.emit("send-msg", {
      to: contact._id,
      from: currentUser._id,
      message,
    });

    const { data } = await axios.post(routes.postMessage, {
      from: currentUser._id,
      to: contact._id,
      message,
    });

    console.log(data);

    const today = messages["Today"] || []; //if there are no messages in today
    today.push({ fromSelf: true, message, timestamp: data.data.createdAt });
    setMessages((prev) => ({
      ...prev,
      Today: today,
    }));
  };

  useEffect(() => {
    async function fetchMessages() {
      const { data } = await axios.get(
        `${routes.getMessages}?from=${currentUser._id}&to=${contact._id}`
      );
      setMessages(groupByDay(data.data));
    }

    fetchMessages();
  }, [currentUser._id, contact._id]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setMessages((prev) => {
          console.log(prev);
          const today = prev["Today"] || [];
          today.push({
            fromSelf: false,
            message: msg,
            timestamp: new Date().toISOString(),
          });
          return {
            ...prev,
            Today: today,
          };
        });
      });
    }
  }, [socket]);

  return (
    <>
      <ChatHeader contact={contact} onBack={onBack} isActive={isActive}/>
      <ChatMessages messages={messages} />
      <ChatInput sendHandler={handleSend} />
    </>
  );
};

const MONTHS = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const groupByDay = (messages) => {
  const groups = {};

  for (let msg of messages) {
    const date = sanitizeDate(msg.timestamp);

    if (groups[date]) {
      groups[date].push(msg);
    } else {
      groups[date] = [msg];
    }
  }

  return groups;
};

const sanitizeDate = (timestamp) => {
  const today = new Date();
  const inputDate = new Date(timestamp);
  let label;

  const todayObj = {
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  };

  const inputDateObj = {
    date: inputDate.getDate(),
    month: inputDate.getMonth(),
    year: inputDate.getFullYear(),
  };

  if (
    todayObj.date === inputDateObj.date &&
    todayObj.month === inputDateObj.month &&
    todayObj.year === inputDateObj.year
  ) {
    label = "Today";

  } else if (
    todayObj.date - 1 === inputDateObj.date &&
    todayObj.month === inputDateObj.month &&
    todayObj.year === inputDateObj.year
  ) {
    label = "Yesterday";

  } else if (
    todayObj.date !== inputDateObj.date &&
    todayObj.month !== inputDateObj.month &&
    todayObj.year === inputDateObj.year
  ) {
    label = inputDateObj.date + " " + MONTHS[inputDate.month];

  } else {
    label = inputDateObj.date + " " + MONTHS[inputDateObj.month] + " " + inputDateObj.year;

  }

  return label;
};

export default ChatBox;
