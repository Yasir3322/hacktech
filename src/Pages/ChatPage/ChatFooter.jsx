import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const ChatFooter = ({ socket }) => {
  const [inputtext, setInputText] = useState("");
  const { id } = useParams();
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputtext) {
      const data = {
        text: inputtext,
        name: JSON.parse(localStorage.getItem("user")).fullName,
        id: JSON.parse(localStorage.getItem("user"))._id,
        to: id,
        socketID: socket.id,
      };

      socket.emit("message", data);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/message/newmessage`,
        data
      );
    }
    setInputText("");
  };

  return (
    <form
      className="w-11/12 absolute bottom-5 flex align-middle justify-between"
      onSubmit={handleSubmit}
    >
      <button>
        <img src="/assets/Attach-icon.svg" />
      </button>
      <input
        type="text"
        placeholder="Send a message"
        className="w-full px-4"
        name="inputtext"
        value={inputtext}
        onChange={handleChange}
      />
      <button type="submit">
        <img src="/assets/send-icon.svg" />
      </button>
    </form>
  );
};

export default ChatFooter;
