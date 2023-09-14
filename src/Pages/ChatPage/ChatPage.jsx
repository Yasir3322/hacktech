import React, { useEffect, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("called");
    socket.on("messageResponse", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]); // Use the previous state to update messages
    });
  }, [socket]);

  return (
    <div className="flex gap-5 w-full h-full">
      <ChatBar socket={socket} />
      <ChatBody socket={socket} messages={messages} />
    </div>
  );
};

export default ChatPage;
