import React, { useState, useEffect } from "react";
import { useGlobalCotext } from "../../Context/Context";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import Rating from "../UI/Rating";

const SoldtowhoPopup = () => {
  const { isSoldPopupOpen, showSoldPopup } = useGlobalCotext();
  const [users, setUsers] = useState([]);

  const peoples = [
    {
      name: "Smit Mathew",
      bio: "Hi David Hope youre doing...",
      image: "/assets/Avatar.svg",
    },
    {
      name: "Merry an",
      bio: "Hi David Hope youre doing...",
      image: "/assets/Avatar.svg",
    },
    {
      name: "Jhon walton",
      bio: "Hi David Hope youre doing...",
      image: "/assets/Avatar.svg",
    },
    {
      name: "Monica Randawa",
      bio: "Hi David Hope youre doing...",
      image: "/assets/Avatar.svg",
    },
  ];

  const getPeople = async () => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/getchatusers/${userid}`
    );
    console.log(res.data);
    res.data.chatusers.map((user) => {
      setUsers((prev) => {
        return [...prev, user.chatuser[0]];
      });
    });
  };

  useEffect(() => {
    getPeople();
  }, []);

  const handleSoldToUserClick = (id) => {
    console.log(id);
  };

  return (
    <div
      className={`${
        isSoldPopupOpen ? "w-full h-screen fixed bg-black/50  z-20 " : ""
      }`}
    >
      <div
        className={`${
          isSoldPopupOpen
            ? "show absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 p-5   bg-white rounded-2xl"
            : "hidden"
        }`}
      >
        <h2 className="font-medium text-2xl">Sold to who?</h2>
        <button
          className="absolute right-1 top-1"
          onClick={() => showSoldPopup()}
        >
          <AiFillCloseCircle />
        </button>
        <div className="flex gap-10">
          <div className="border-r-2 p-2">
            <p className="mt-8">your recent chats</p>
            <div className="flex flex-col gap-4 mt-4">
              {users.map((people) => {
                const { image, fullName, _id } = people;
                return (
                  <div
                    className="flex gap-3 cursor-pointer"
                    onClick={() => handleSoldToUserClick(_id)}
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
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="mb-4">
              {/* <img src="/assets/star.svg" /> */}
              <ThemeProvider>
                <CSSReset />
                <Rating
                  size={20}
                  icon="star"
                  scale={5}
                  fillColor="gold"
                  strokeColor="grey"
                />
              </ThemeProvider>
            </div>
            <div>
              <h2 className="font-bold text-sm">
                How did you feel about your buyer?
              </h2>
              <textarea
                className="border w-full rounded-md"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoldtowhoPopup;
