import React from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";

const ChatPage = () => {
  return (
    <div className="flex gap-5 border border-black w-full h-screen">
      <ChatBar />
      <ChatBody />
    </div>
  );
};

export default ChatPage;
