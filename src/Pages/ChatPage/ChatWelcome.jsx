import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChatWelcome = () => {
  const navigate = useNavigate();
  const handleContinueChat = () => {
    toast.info("Meke product Request", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    navigate("/");
  };

  return (
    <div className="w-full  hidden h-full md:flex items-center align-middle text-center">
      <div className="w-full gap-3 items-center flex flex-col align-middle justify-center">
        <img src="/assets/trojansquare.png" alt="" width={40} height={40} />
        <h2 className="text-2xl font-bold">Welcome to TrojanSquare Chat</h2>
        <p>Interact With your Customer, give them a best user experience</p>
        <button className="font-semibold text-[#db3b39] cursor-pointer">
          Continue to chat
        </button>
      </div>
    </div>
  );
};

export default ChatWelcome;
