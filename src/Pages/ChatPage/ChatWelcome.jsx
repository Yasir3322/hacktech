import React from "react";

const ChatWelcome = () => {
  return (
    <div className="w-full  hidden h-full md:flex items-center align-middle text-center">
      <div className="w-full gap-3 items-center flex flex-col align-middle justify-center">
        <img src="/assets/Group 1.svg" alt="" width={40} height={40} />
        <h2 className="text-2xl font-bold">Welcome to Uniswap Chat</h2>
        <p>Interact With your Customer, give them a best user experience</p>
        <p className="font-semibold text-[#db3b39]">Continue to chat</p>
      </div>
    </div>
  );
};

export default ChatWelcome;
