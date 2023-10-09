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
        status: "delivered",
      };
      setInputText("");
      socket.emit("message", data);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/message/newmessage`,
        data
      );
    }
  };

  const handleFileChange = (files) => {
    console.log(files[0]);
  };

  return (
    <form
      className="w-11/12 absolute bottom-5 flex align-middle justify-between"
      onSubmit={handleSubmit}
    >
      <div>
        <label for="fileInput" className="file-input-label cursor-pointer">
          <img
            src="/assets/Attach-icon.svg"
            alt="Attach File"
            class="attach-icon"
          />
        </label>
        <input
          type="file"
          id="fileInput"
          className="file-input hidden"
          onChange={(e) => handleFileChange(e.target.files)}
        />
      </div>
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
