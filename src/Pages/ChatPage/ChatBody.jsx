import React, { useState, useEffect, useRef } from "react";
import ChatFooter from "./ChatFooter";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGlobalCotext } from "../../Context/Context";
import { useQuery } from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";

const ChatBody = ({ socket }) => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const prodid = searchParams.get("prodid");
  var localid = JSON.parse(localStorage.getItem("user"))._id;
  const [messages, setMessages] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const { setShow, allActiveUsers, setAllActiveUsers } = useGlobalCotext();
  const [active, setActive] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showModelImage, setShowModelImage] = useState("");
  const [product, setProduct] = useState({});

  const navigate = useNavigate();
  const scrolltodiv = useRef()

  useEffect(() => {
    const active = allActiveUsers.some((user) => user.userid === id);
    if (active) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [id, socket]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      setAllActiveUsers(data);
    });
  }, [socket]);

  const getProductdetail = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/singleproduct/${prodid}`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
          userid: JSON.parse(localStorage.getItem("user"))._id,
        },
      }
    );
    setProduct(res?.data?.product[0]);
  };


  // useEffect(() => {
  //   getProductdetail();
  // }, [prodid]);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      // console.log({ data });
      setMessages((prevMessages) => [...prevMessages, data]); // Use the previous state to update messages
      socket.emit("messagesRead", data);
      setTimeout(() => {
        scrolltodiv.current.scrollIntoView({
          // behavior: "smooth",
          block: "center",
          inline: "start"
        })

      }, 100)
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
    getUserMess();
    getProductdetail();
  }, [id, socket, prodid]);

  const getUserMess = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/message/allmessages`
    );
    const allmess = res.data.allMessages;
    const filterMessages = allmess.filter((message) => {
      return (
        (message.id === localid && message.productid === prodid) ||
        (message.productid === prodid && message.to === localid)
      );
    });
    setMessages(filterMessages);
    setLoading(false);
    setTimeout(() => {
      scrolltodiv.current.scrollIntoView({
        // behavior: "smooth",
        block: "center",
        inline: "start"
      })

    }, 100)
  };

  // useEffect(() => {
  //   getUserMess();
  // }, [socket, prodid]);

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
    getUserMess();
  };

  useEffect(() => {
    // updateMessStatus();
  }, [socket, id]);

  const handleImageClick = (imgurl) => {
    setShowModelImage(imgurl);
    setShowModel(!showModel);
  };

  const handleProdClick = () => {
    navigate(`/productpage/${prodid}`);
  };


  return (
    <div className=" w-full h-full md:border-l-2">
      <div className="items-start w-full h-8">
        <Link
          to="/chat"
          className="px-4 absolute  md:hidden block"
          onClick={() => handleGoBackClick()}
        >
          Go back
        </Link>
      </div>
      <div className="p-5 md:h-[34rem] h-[30rem]  relative">
        <div
          className={
            showModel
              ? "absolute w-3/4 h-80 shadow-xl border-1 z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              : "hidden"
          }
        >
          <button
            className="absolute -right-2 -top-2 z-50"
            onClick={() => setShowModel(!showModel)}
          >
            <AiFillCloseCircle size={30} />
          </button>
          <img
            src={showModelImage}
            alt=""
            className="w-full h-full z-100 object-cover rounded-lg"
          />
        </div>

        <div className="flex align-middle justify-between gap-3">
          <div className="flex flex-col">
            <Link className="flex gap-2" to={`/myprofile/${userDetail._id}`}>
              <img
                src={
                  userDetail?.image
                    ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/${userDetail.image
                    }`
                    : "/assets/preview.avif"
                }
                alt="avatar"
                className="rounded-full w-12 h-12"
              />
              <div>
                <p className="capitalize">{userDetail.fullName}</p>
                <span className="text-[#9C9797] text-xs flex align-middle">
                  Active Now{" "}
                  <div>
                    {active ? (
                      <img
                        src="/assets/Ellipse 28.svg"
                        alt=""
                        className="mt-1"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </span>
              </div>
            </Link>
          </div>
          <Link
            className="bg-blue-900 rounded-md text-white w-24 h-8 flex align-middle justify-center py-0.5"
            to="https://forms.gle/x4r2TUppFJePVzC78"
            target="_blank"
          >
            report user
          </Link>
        </div>
        <div
          className="flex w-full items-start bg-[#fbfbfb] mt-2 cursor-pointer "
          onClick={() => handleProdClick()}
        >
          {Object.keys(product).length ? (
            <div className="flex align-middle justify-between w-full">
              <p className="flex">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/api/v1/${product?.images[0]
                    }`}
                  alt=""
                  className="h-full w-16"
                />
              </p>
              <div className="flex flex-col h-full align-middle justify-between mt-4">
                <span className="leading-3 text-base mt-0">
                  {product?.title}
                </span>
                <span className="text-xs">{product?.description}</span>
              </div>
              <span className="pr-3 mt-4">${product?.price}</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="h-[16rem]">
          <div className="w-full md:h-[20rem] h-[14rem]  overflow-y-scroll custom-scrollbar " >
            <div>
              {!loading ? (
                messages.map((message) => {
                  if (
                    message.id === JSON.parse(localStorage.getItem("user"))._id
                  ) {
                    // console.log(message.createdAt);
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

                    const formattedTime = `${adjustedHours}:${minutes < 10 ? "0" : ""
                      }${minutes} ${period}`;
                    return (
                      <div className="w-full flex items-end justify-end">
                        <div className="ml-auto relative mt-5">
                          <div>
                            {message.text.startsWith(
                              "https://trojansquarechatimage.s3.amazonaws.com"
                            ) ? (
                              <div
                                className="mt-3 p-1 rounded-l-full px-2 cursor-pointer rounded-md text-sm w-80 h-auto"
                                onClick={() => handleImageClick(message.text)}
                              >
                                <img
                                  src={message.text}
                                  alt=""
                                  className="rounded-md"
                                />
                              </div>
                            ) : (
                              <div>
                                <div className="md:leading-3  leading-5 md:bg-black bg-transparent md:border-none text-black border border-gray-400 md:py-2 py-2 md:text-white mt-3 z-0 p-1  md:rounded-l-full px-6 pr-12 md:rounded-tr-full rounded-tr-2xl text-sm md:w-80 w-auto">
                                  <p>{message.text}</p>
                                </div>
                              </div>
                            )}
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

                    const formattedTime = `${adjustedHours}:${minutes < 10 ? "0" : ""
                      }${minutes} ${period}`;
                    return (
                      <div className="message__chats mt-3">
                        <div className="flex gap-2">
                          <img
                            src={
                              userDetail?.image
                                ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/${userDetail.image
                                }`
                                : "/assets/preview.avif"
                            }
                            alt="avatar"
                            className="rounded-full w-8 h-8 md:block hidden"
                          />
                          <div className="flex flex-col">
                            <div>
                              {message.text.startsWith(
                                "https://trojansquarechatimage.s3.amazonaws.com"
                              ) ? (
                                <div
                                  onClick={() => handleImageClick(message.text)}
                                  className={`mt-3 p-1 rounded-l-full px-2 rounded-md text-sm w-80 h-auto cursor-pointer`}
                                >
                                  <img
                                    src={message.text}
                                    alt=""
                                    className="rounded-md"
                                  />
                                </div>
                              ) : (
                                <div className="md:leading-3 leading-5 md:bg-[#9C9797]/30 bg-[#f9f9f9] mt-3 p-1 md:rounded-r-full rounded-r-xl md:px-2 px-2 md:py-2 py-4  md:rounded-tl-full rounded-tl-xl text-sm md:w-80 w-auto">
                                  <p>{message.text}</p>
                                </div>
                              )}
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
              <div ref={scrolltodiv}></div>
            </div>
          </div>
          <div className="w-full">
            <ChatFooter socket={socket} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
