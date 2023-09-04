import React from "react";

const ChatFooter = () => {
  return (
    <div className="w-11/12 absolute bottom-5 flex align-middle justify-between">
      <button>
        <img src="/assets/Attach-icon.svg" />
      </button>
      <input type="text" placeholder="Send a message" className="w-full px-4" />
      <button>
        <img src="/assets/send-icon.svg" />
      </button>
    </div>
  );
};

export default ChatFooter;
