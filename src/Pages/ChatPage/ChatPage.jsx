import React from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";

const ChatPage = () => {
  return (
    <div className="flex gap-5 w-full h-full">
      <ChatBar />
      <ChatBody />
    </div>
  );
};

export default ChatPage;
