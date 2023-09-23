import React, { useState, useEffect } from "react";
import ChatFooter from "./ChatFooter";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useGlobalCotext } from "../../Context/Context";

const ChatBody = ({ socket }) => {
  const { id } = useParams();
  var localid = JSON.parse(localStorage.getItem("user"))._id;
  const [messages, setMessages] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const { setShow } = useGlobalCotext();

  useEffect(() => {
    console.log("called");
    socket.on("messageResponse", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]); // Use the previous state to update messages
    });
  }, [socket]);

  const getUserdetail = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/getuser/${id}`
    );
    setUserDetail(res.data.user);
  };

  useEffect(() => {
    getUserdetail();
  }, [id]);

  const getUserMess = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/message/allmessages`
    );
    // setMessages(res.data.allMessages);
    const allmess = res.data.allMessages;
    const filterMessages = allmess.filter((message) => {
      return (
        (message.id === localid && message.to === id) ||
        (message.id === id && message.to === localid)
      );
    });
    setMessages(filterMessages);
    setLoading(false);
  };

  useEffect(() => {
    getUserMess();
  }, [id, messages]);

  useEffect(() => {
    setLoading(true);
  }, [id]);

  const handleGoBackClick = () => {
    setShow(false);
  };

  return (
    <div className="p-5 w-full h-[28rem] relative">
      <Link
        to="/chat"
        className="px-4 absolute right-1"
        onClick={() => handleGoBackClick()}
      >
        Go back
      </Link>
      <div className="flex gap-2">
        <img
          src={userDetail?.image ? userDetail.image : "/assets/preview.avif"}
          alt="avatar"
          width={47}
          height={47}
          className="rounded-full"
        />
        <div>
          <p className="capitalize">{userDetail.fullName}</p>
          <span className="text-[#9C9797] text-xs">Active Now</span>
        </div>
      </div>
      <div className="w-full h-4/5 p-5 overflow-y-scroll custom-scrollbar">
        {!loading ? (
          messages.map((message) => {
            if (message.id === JSON.parse(localStorage.getItem("user"))._id) {
              return (
                <div className="w-full flex items-end justify-end">
                  <div className="ml-auto">
                    <div className=" bg-[#F9CC65]/30 mt-3 p-1 rounded-l-full px-2 rounded-tr-full text-sm w-80">
                      <p>{message.text}</p>
                    </div>
                  </div>
                </div>
              );
            } else if (
              message.to === JSON.parse(localStorage.getItem("user"))._id
            ) {
              return (
                <div className="message__chats mt-3">
                  <div className="flex gap-2">
                    <img
                      src={
                        userDetail?.image
                          ? userDetail.image
                          : "/assets/preview.avif"
                      }
                      alt="avatar"
                      width={27}
                      height={25}
                      className="rounded-full"
                    />
                    <div className="bg-[#9C9797]/30 p-1 rounded-r-full px-2 rounded-tl-full text-sm w-80">
                      <p>{message.text}</p>
                    </div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="w-full">
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatBody;
