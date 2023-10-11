import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalCotext } from "../../Context/Context";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";

const Header = ({ user, socket }) => {
  const navigate = useNavigate();

  const {
    useLogin,
    showCreateAccountPopup,
    showLoginPopup,
    showNotiDropdown,
    showProfileDropdown,
    isLogin,
    setSearchProduct,
    setAllSearchProducts,
  } = useGlobalCotext();

  if (isLogin) {
    var localstorageprofile = localStorage.getItem("profile").replace(/"/g, "");

    var profile = `${
      localstorageprofile
        ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/${localstorageprofile}`
        : "/assets/preview.avif"
    }`;
  }

  const handleSignup = () => {
    // useLogin();
    showCreateAccountPopup();
    // navigate("/home");
  };
  const handleLogin = () => {
    // useLogin();
    showLoginPopup();
    // navigate("/home");
  };

  const handleNotificationbutton = () => {
    showNotiDropdown();
  };

  const handleProfileDropdownButton = () => {
    showProfileDropdown();
  };

  const handleChatClick = (e) => {
    e.preventDefault();
    const id = JSON.parse(localStorage.getItem("user"))._id;
    socket.emit("newuser", {
      userid: id,
      socketId: socket.id,
    });

    navigate("/chat");
  };

  const handleSearchChange = async (e) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/allproducts?title=${
        e.target.value
      }`
    );
    console.log(res);
    setAllSearchProducts(res?.data?.allProducts);
  };

  return (
    <section className="md:flex md:flex-row flex flex-col align-middle justify-between w-full md:px-10">
      <div className="md:flex md:flex-row flex flex-col align-middle justify-between flex-grow mt-3">
        <Link className="flex md:ml-0 ml-4" to={user ? "/" : "/"}>
          <img
            src="/assets/trojansquare.svg"
            alt="uniswap"
            className="md:w-48 w-24 h-12 ml-3 scale-150 "
          />
        </Link>
        <div className="md:w-full md:pl-8 md:mr-24 md:ml-12">
          <form>
            <label className="relative block">
              <span class="absolute inset-y-0 left-1.5 top-2 pl-1 flex items-center bg-[#DB3B39] rounded-full w-7 h-7">
                <svg
                  className="h-5 w-5 fill-white "
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                >
                  <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                </svg>
              </span>
              <input
                className="w-full  bg-white placeholder:font-italitc border border-slate-300 rounded-full h-11 pl-10 pr-4 focus:outline-none"
                type="text"
                onChange={handleSearchChange}
              />
            </label>
          </form>
        </div>
      </div>
      <div className="mt-3">
        {user ? (
          <div className="md:flex md:flex-row flex flex-row gap-8 align-middle justify-around">
            <button
              className="w-28 h-10 rounded-full border  bg-[#DB3B39] text-white"
              onClick={() => navigate("/createnewlisting")}
            >
              Sell an item
            </button>
            <div className="flex gap-3">
              <img src="/assets/Line 20.svg" alt="line" />
              <div className="flex gap-3">
                <Link to="/likedproduct">
                  <img
                    src="/assets/Vectorheader.svg"
                    alt="vectorheader"
                    className="w-6 mt-3 h-6"
                  />
                </Link>
                <button to="/chat" onClick={handleChatClick}>
                  <img
                    src="/assets/Vectorheader1.svg"
                    alt="vectorheader"
                    className="w-6 mt-1 h-6"
                  />
                </button>
                <button onClick={handleNotificationbutton}>
                  <img
                    src="/assets/Vectorheader2.svg"
                    alt="vectorheader"
                    className="w-6 h-6"
                  />
                </button>
                <Link to="/cart">
                  <img
                    src="/assets/Vectorheader3.svg"
                    alt="vectorheader"
                    className="w-6 mt-3 h-6"
                  />
                </Link>
              </div>
            </div>
            <div className="flex gap-3 align-middle justify-center">
              <Link
                to={`myprofile/${JSON.parse(localStorage.getItem("user"))._id}`}
              >
                <img
                  src={`${profile}`}
                  alt="userprofile"
                  width={50}
                  height={50}
                  className="w-11 h-11 rounded-full"
                />
              </Link>
              <button
                className=" cursor-pointer"
                onClick={handleProfileDropdownButton}
              >
                <IoIosArrowDown />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex md:gap-7 gap-1 ml-5 align-middle justify-between ">
            <button className="md:w-28  w-12 leading-3 rounded-md h-10 md:rounded-full border md:border-black ">
              Sell an item
            </button>
            <button
              className="md:w-24 w-12 leading-3 rounded-md h-10 md:rounded-full border"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="md:w-24 w-12 leading-3 rounded-md h-10 md:rounded-full border bg-[#DB3B39] text-white"
              onClick={handleSignup}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
