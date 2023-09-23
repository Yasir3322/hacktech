import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useGlobalCotext } from "../../Context/Context";

const ChatBar = ({ socket }) => {
  const [usersList, setUsersList] = useState([]);
  const [peoples, setPeople] = useState([]);
  const { show, setShow } = useGlobalCotext();

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      setUsersList(data);
    });
  }, [socket, usersList]);

  console.log({ usersList });

  const getChatWithUser = async () => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/getchatusers/${userid}`
    );
    console.log(res.data);
    res.data.chatusers.map((user) => {
      setPeople((prev) => {
        return [...prev, user.chatuser[0]];
      });
    });
  };

  console.log(peoples);

  useEffect(() => {
    getChatWithUser();
  }, []);

  const handleChatClick = (id) => {
    setShow(!show);
  };

  // const peoples = [
  //   // {
  //   //   name: "Smit Mathew",
  //   //   bio: "Hi David Hope youre doing...",
  //   //   image: "/assets/Avatar.svg",
  //   // },
  //   // {
  //   //   name: "Merry an",
  //   //   bio: "Hi David Hope youre doing...",
  //   //   image: "/assets/Avatar.svg",
  //   // },
  //   // {
  //   //   name: "Jhon walton",
  //   //   bio: "Hi David Hope youre doing...",
  //   //   image: "/assets/Avatar.svg",
  //   // },
  //   // {
  //   //   name: "Monica Randawa",
  //   //   bio: "Hi David Hope youre doing...",
  //   //   image: "/assets/Avatar.svg",
  //   // },
  //   // {
  //   //   name: "Monica Randawa",
  //   //   bio: "Hi David Hope youre doing...",
  //   //   image: "/assets/Avatar.svg",
  //   // },
  //   // {
  //   //   name: "Monica Randawa",
  //   //   bio: "Hi David Hope youre doing...",
  //   //   image: "/assets/Avatar.svg",
  //   // },
  //   // {
  //   //   name: "Monica Randawa",
  //   //   bio: "Hi David Hope youre doing...",
  //   //   image: "/assets/Avatar.svg",
  //   // },
  //   // {
  //   //   name: "Monica Randawa",
  //   //   bio: "Hi David Hope youre doing...",
  //   //   image: "/assets/Avatar.svg",
  //   // },
  // ];

  return (
    <div className="flex w-full">
      <div
        className={
          !show
            ? "border-r-2 md:w-1/4 block  w-full p-4 h-[28rem] overflow-y-scroll custom-scrollbar"
            : "border-r-2 md:w-1/4 md:block hidden w-full p-4 h-[28rem] overflow-y-scroll custom-scrollbar"
        }
      >
        <h4 className="text-lg">Chat</h4>
        <div className="flex w-full flex-col gap-3 mt-4">
          {peoples.map((people) => {
            const { image, fullName, _id } = people;
            return (
              <Link
                className="flex gap-3 cursor-pointer"
                to={`/chat/${_id}`}
                onClick={() => handleChatClick(_id)}
              >
                <img
                  src={image?.length > 0 ? image : "/assets/preview.avif"}
                  alt="image"
                  width={45}
                  height={45}
                  className="rounded-full"
                />
                <div>
                  <h4>{fullName}</h4>
                  <span className="text-[#9C9797] text-xs">{`Hi ${fullName} Hope youre doing...`}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div
        id="detail"
        className={
          show ? "md:w-3/4 w-full md:block" : "md:w-3/4 w-full md:block hidden"
        }
      >
        <Outlet />
      </div>
    </div>
  );
};

export default ChatBar;
