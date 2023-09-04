import React from "react";
import ChatFooter from "./ChatFooter";

const ChatBody = () => {
  return (
    <div className="p-5 w-full h-auto relative">
      <div className="flex gap-2">
        <img src="/assets/Avatar.svg" alt="avatar" />
        <div>
          <p>Smith Mathew</p>
          <span className="text-[#9C9797] text-xs">Active Now</span>
        </div>
      </div>

      <div>
        <div className="flex align-middle items-center mt-10 gap-3">
          <img src="/assets/Avatar.svg" className="w-8 h-8" />
          <p className="bg-[#9C9797]/30 p-1 rounded-r-full px-2 rounded-tl-full text-sm">
            Are you still traveling
          </p>
        </div>

        <div className="flex align-middle items-center mt-10 gap-3 float-right">
          <p className="bg-[#F9CC65]/30 p-1 rounded-l-full px-2 rounded-tr-full text-sm">
            Yes, i'm at istanbul
          </p>
        </div>
      </div>
      <div className="w-full">
        <ChatFooter />
      </div>
    </div>
  );
};

export default ChatBody;
