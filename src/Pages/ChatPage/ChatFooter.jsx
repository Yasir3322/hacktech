import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const ChatFooter = ({ socket }) => {
  const [inputtext, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState("");
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
    setFile(files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(!isLoading);
    const formdata = new FormData();
    formdata.append("images", file);
    const res = await axios.post(
      "http://localhost:8000/api/aws/upload",
      formdata
    );
    if (res.status === 200) {
      const data = {
        text: res.data.Location,
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
    setIsLoading(false);
    setFile("");
    console.log(res);
  };

  return (
    <div className="flex md:w-[59rem] w-96 gap-3 z-50 align-middle border-t-2 absolute md:bottom-2 bottom-16 md:pb-1 pb-12">
      {file ? (
        <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
          <div className="flex align-middle justify-between">
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
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files)}
            />
            <div>
              {isLoading && file ? (
                <p className="mt-2 ml-8">Sending Wait...</p>
              ) : (
                <p className="mt-2 ml-8">Sent</p>
              )}
            </div>
            <button type="submit" className="ml-96">
              <img src="/assets/send-icon.svg" />
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-row align-middle justify-between px-2">
          <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
            <div className="flex align-middle justify-between">
              <label
                for="fileInput"
                className="file-input-label cursor-pointer"
              >
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
              <button type="submit" className={file ? "block" : "hidden"}>
                <img src="/assets/send-icon.svg" />
              </button>
            </div>
          </form>
          <form
            className="md:w-[57rem] w-80 left-16 -bottom-16  flex align-middle justify-between"
            onSubmit={handleSubmit}
            enctype="multipart/form-data"
          >
            <input
              type="text"
              placeholder="Send a message"
              className="w-full px-4"
              name="inputtext"
              value={inputtext}
              onChange={handleChange}
            />
            <button type="submit" className="ml-2 scale-150">
              <img src="/assets/send-icon.svg" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatFooter;
