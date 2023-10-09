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
  const { setShow, allActiveUsers } = useGlobalCotext();
  const [active, setActive] = useState(false);

  useEffect(() => {
    console.log(allActiveUsers);
    const active = allActiveUsers.some((user) => user.userid === id);
    if (active) {
      setActive(true);
    } else {
      setActive(false);
    }
    console.log(active);
  }, [id, socket]);

  useEffect(() => {
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

  const updateMessStatus = async () => {
    const recieverid = id;
    const senderid = JSON.parse(localStorage.getItem("user"))._id;
    await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/message/updatestatus`,
      {},
      {
        headers: {
          id: senderid,
          to: recieverid,
        },
      }
    );
  };

  useEffect(() => {
    updateMessStatus();
  }, [socket, id]);

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
          src={
            userDetail?.image
              ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/${userDetail.image}`
              : "/assets/preview.avif"
          }
          alt="avatar"
          width={47}
          height={47}
          className="rounded-full"
        />
        <div>
          <p className="capitalize">{userDetail.fullName}</p>
          <span className="text-[#9C9797] text-xs flex align-middle">
            Active Now{" "}
            <div>
              {active ? (
                <img src="/assets/Ellipse 28.svg" alt="" className="mt-1" />
              ) : (
                ""
              )}
            </div>
          </span>
        </div>
      </div>
      <div className="w-full h-4/5 p-5 overflow-y-scroll custom-scrollbar">
        {!loading ? (
          messages.map((message) => {
            if (message.id === JSON.parse(localStorage.getItem("user"))._id) {
              const date = new Date(message.createdAt);
              const hours = date.getHours();
              const minutes = date.getMinutes();

              let period = "AM";
              let adjustedHours = hours;
              if (hours >= 12) {
                period = "PM";
                if (hours > 12) {
                  adjustedHours = hours - 12;
                }
              }

              const formattedTime = `${adjustedHours}:${
                minutes < 10 ? "0" : ""
              }${minutes} ${period}`;

              return (
                <div className="w-full flex items-end justify-end">
                  <div className="ml-auto relative mt-5">
                    <div className=" bg-[#F9CC65]/30 mt-3 p-1 rounded-l-full px-2 rounded-tr-full text-sm w-80">
                      <p>{message.text}</p>
                    </div>
                    <div className="absolute right-0 flex gap-1 mt-1">
                      <div>
                        {message.status === "read" ? (
                          <img
                            src="/assets/doubletick.svg"
                            alt="delivered"
                            className="scale-125 mt-1"
                          />
                        ) : (
                          <img
                            src="/assets/singletick.svg"
                            alt="delivered"
                            className="scale-125 mt-1"
                          />
                        )}
                      </div>
                      <p className="text-[#DEDEDE] text-xs font-normal">
                        {formattedTime}
                      </p>
                    </div>
                  </div>
                </div>
              );
            } else if (
              message.to === JSON.parse(localStorage.getItem("user"))._id
            ) {
              const date = new Date(message.createdAt);
              const hours = date.getHours();
              const minutes = date.getMinutes();

              let period = "AM";
              let adjustedHours = hours;
              if (hours >= 12) {
                period = "PM";
                if (hours > 12) {
                  adjustedHours = hours - 12;
                }
              }

              const formattedTime = `${adjustedHours}:${
                minutes < 10 ? "0" : ""
              }${minutes} ${period}`;
              return (
                <div className="message__chats mt-3">
                  <div className="flex gap-2">
                    <img
                      src={
                        userDetail?.image
                          ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/${
                              userDetail.image
                            }`
                          : "/assets/preview.avif"
                      }
                      alt="avatar"
                      width={27}
                      height={25}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="bg-[#9C9797]/30 p-1 rounded-r-full px-2 rounded-tl-full text-sm w-80">
                        <p>{message.text}</p>
                      </div>
                      <div>
                        <p className="text-[#DEDEDE] text-xs font-normal">
                          {formattedTime}
                        </p>
                      </div>
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
