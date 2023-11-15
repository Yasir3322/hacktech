import React, { useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
const ChatFooter = ({ socket, setMessages, scrolltodiv }) => {
  const [inputtext, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const prodid = searchParams.get("prodid");
  console.log(prodid);
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
        productid: prodid,
      };
      setInputText("");
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/message/newmessage`,
        data
      );
      const message = res.data.message;
      setMessages(prev => {
        return [...prev, message]
      })
      setTimeout(() => {
        scrolltodiv.current.scrollIntoView({
          // behavior: "smooth",
          block: "center",
          inline: "start"
        })

      }, 100)
      console.log(message);
      socket.emit("message", message);
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
      `${import.meta.env.VITE_BACKEND_URL}/api/aws/upload`,
      formdata
    );
    console.log({ res });
    if (res.status === 200) {
      const data = {
        text: res.data.Location,
        name: JSON.parse(localStorage.getItem("user")).fullName,
        id: JSON.parse(localStorage.getItem("user"))._id,
        to: id,
        productid: prodid,
        socketID: socket.id,
        status: "delivered",
      };
      console.log({ data });
      setInputText("");
      const res2 = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/message/newmessage`,
        data
      );
      console.log({ res })
      const message = res2.data.message;
      setMessages(prev => {
        return [...prev, message]
      })
      setTimeout(() => {
        scrolltodiv.current.scrollIntoView({
          // behavior: "smooth",
          block: "center",
          inline: "start"
        })

      }, 100)
      socket.emit("message", message);
    }
    setIsLoading(false);
    setFile("");
  };

  return (
    <div className="flex gap-3 z-50 align-middle border-t-2 w-full  ">
      {file ? (
        <form
          onSubmit={handleFormSubmit}
          enctype="multipart/form-data"
          className="w-full"
        >
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
              className="w-full file-input hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files)}
            />
            <div className="w-full">
              {isLoading && file ? (
                <p className="mt-2 ml-8">Sending Wait...</p>
              ) : (
                <p className="mt-2 ml-8">Sent</p>
              )}
            </div>
            <button type="submit" className="scale-150">
              <img src="/assets/send-icon.svg" />
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-row align-middle w-full justify-between px-2">
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
                className="w-full file-input hidden"
                onChange={(e) => handleFileChange(e.target.files)}
              />
              <button type="submit" className={file ? "block" : "hidden"}>
                <img src="/assets/send-icon.svg" />
              </button>
            </div>
          </form>
          <form
            className="w-full left-16  flex align-middle justify-between"
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
