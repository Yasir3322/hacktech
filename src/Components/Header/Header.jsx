import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalCotext } from "../../Context/Context";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";

const Header = ({ user, socket }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showListingbtn, setShowListingbtn] = useState(false);
  const navigate = useNavigate();
  const dropDownRef = useRef();

  const {
    useLogin,
    showCreateAccountPopup,
    showLoginPopup,
    showNotiDropdown,
    showProfileDropdown,
    isLogin,
    setSearchProduct,
    setAllSearchProducts,
    isShowMobileIcon,
    setIsShowMobileIcon,
    isNotificationDropdownOpen,
    setIsNotificationDropdownOpen,
    isProfileDropdownOpen,
    setIsProfileDropdownOpen,
    setAllProducts,
    hideNotiDropdown,
  } = useGlobalCotext();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        console.log("Clicked Outside");
        hideNotiDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);

  if (isLogin) {
    var localstorageprofile = localStorage.getItem("profile").replace(/"/g, "");

    var profile = `${
      localstorageprofile !== "null"
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
    console.log("called");
    console.log({ isNotificationDropdownOpen });
    showNotiDropdown();
  };

  const handleProfileDropdownButton = () => {
    console.log("called");
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
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
    if (e.target.value.length > 0) {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/allproducts?title=${
          e.target.value
        }`
      );
      console.log(res);
      setAllProducts(res?.data?.allProducts);
    } else {
      var res;
      if (isLogin) {
        const id = JSON.parse(localStorage.getItem("user"))._id;
        res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/allproducts`,
          {
            headers: {
              "ngrok-skip-browser-warning": true,
              userid: id,
            },
          }
        );
      } else {
        res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/allproducts`
        );
      }
      console.log(res);
      setAllProducts(res?.data?.allProducts);
    }
  };

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 768); // Adjust the width as needed for your mobile breakpoint
  };

  useEffect(() => {
    checkScreenSize(); // Check the initial screen size
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize); // Clean up the event listener
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hacktechtoken");
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    useLogin();
    navigate("/");
  };

  return (
    <section className="md:flex md:flex-row flex flex-col align-middle justify-between w-full md:px-10">
      <div className="md:flex md:flex-row align-middle justify-between flex-grow mt-3">
        <div className="flex align-middle justify-between">
          <Link className="flex md:ml-0 ml-4 mt-1.5" to="/">
            <img
              src={
                isMobile
                  ? "/assets/fingerlogoblack.svg"
                  : "/assets/black-logo.svg"
              }
              alt="uniswap"
              className="md:w-48 w-8 h-8 scale-150"
            />
          </Link>
          <button
            className={!isLogin ? "md:hidden block mr-3" : "hidden"}
            onClick={() => setIsShowMobileIcon(!isShowMobileIcon)}
          >
            <img src="/assets/threeline.svg" alt="" />
          </button>
        </div>
        <div className="md:hidden block">
          {isLogin ? (
            <div>
              <div className="relative w-full h-10 flex flex-col">
                <div className="flex gap-3 absolute right-14 align-middle">
                  <button
                    onClick={() =>
                      setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
                    }
                  >
                    <img
                      src="/assets/Vectorheader2.svg"
                      alt="vectorheader"
                      className="md:w-6 md:h-6 w-8 h-8 mt-2"
                    />
                  </button>
                  <button onClick={() => setShowListingbtn(!showListingbtn)}>
                    <img
                      src="/assets/user.svg"
                      alt="vectorheader"
                      className="md:w-6 md:mt-3 mt-2 md:h-6 w-8 h-8"
                    />
                  </button>
                </div>
              </div>
              <div className="md:hidden block w-full m-auto mt-4">
                {showListingbtn ? (
                  <div className=" flex flex-col gap-3 px-4">
                    <Link
                      to={`/myprofile/${
                        JSON.parse(localStorage.getItem("user"))._id
                      }`}
                      className="border border-black p-2 w-full rounded-lg flex align-middle justify-center"
                    >
                      My Listing
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-[#DB3B39] p-2 w-full text-white rounded-lg"
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="md:w-full md:pl-8 md:mr-24 md:ml-4 md:mt-0 mt-4 md:px-0 px-5">
          <form className={showListingbtn ? "hidden" : "block "}>
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
                className="w-full shadow-sm  bg-white placeholder:font-italitc border border-slate-300 rounded-full h-11 pl-10 pr-4 focus:outline-none"
                type="text"
                onChange={handleSearchChange}
              />
            </label>
          </form>
        </div>
      </div>
      <div className="mt-3">
        {user ? (
          <div className="md:flex hidden md:flex-row  gap-8 align-middle justify-around">
            <button
              className="md:w-28 w-full h-10 rounded-full border  bg-[#DB3B39] text-white"
              onClick={() => navigate("/createnewlisting")}
            >
              Sell an item
            </button>
            <div className="flex align-middle justify-between gap-4">
              <div className="flex gap-3">
                <img src="/assets/Line 20.svg" alt="line" />
                <div className="flex gap-3">
                  <Link to="/likedproduct">
                    <img
                      src="/assets/Vectorheader.svg"
                      alt="vectorheader"
                      className="md:w-6 md:mt-3 mt-2 md:h-6 w-8 h-8"
                    />
                  </Link>
                  <button to="/chat" onClick={handleChatClick}>
                    <img
                      src="/assets/Vectorheader1.svg"
                      alt="vectorheader"
                      className="md:w-6 mt-1 md:h-6 w-8 h-8"
                    />
                  </button>
                  <button
                    onClick={() => handleNotificationbutton()}
                    ref={dropDownRef}
                  >
                    <img
                      src="/assets/Vectorheader2.svg"
                      alt="vectorheader"
                      className="md:w-6 md:h-6 w-8 h-8"
                    />
                  </button>

                  {/* add to cart button  */}

                  {/* <Link to="/cart">
                    <img
                      src="/assets/Vectorheader3.svg"
                      alt="vectorheader"
                      className="md:w-6 md:mt-3 mt-2 md:h-6 w-8 h-8"
                    />
                  </Link> */}
                </div>
              </div>
              <div className="flex gap-3 align-middle justify-center">
                <Link
                  to={`myprofile/${
                    JSON.parse(localStorage.getItem("user"))._id
                  }`}
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
                  onClick={() => handleProfileDropdownButton()}
                >
                  <IoIosArrowDown />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="md:block hidden">
              <div className="md:flex md:flex-row flex flex-col md:gap-7 gap-1 ml-5 align-middle justify-between ">
                <button
                  className="md:w-28  w-full leading-3 rounded-md h-10 md:rounded-full border md:border-black "
                  onClick={() => showLoginPopup()}
                >
                  Sell an item
                </button>
                <button
                  className="md:w-24 w-full leading-3 rounded-md h-10 md:rounded-full border"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  className="md:w-24 w-full leading-3 rounded-md h-10 md:rounded-full border bg-[#DB3B39] text-white"
                  onClick={handleSignup}
                >
                  Sign up
                </button>
              </div>
            </div>
            <div className="md:hidden block">
              {isShowMobileIcon ? (
                <div className="md:flex md:flex-row flex flex-col md:gap-7 gap-1 px-3 align-middle justify-between ">
                  <button
                    className="md:w-28  w-full leading-3 rounded-xl h-10 md:rounded-full border border-black "
                    onClick={() => showLoginPopup()}
                  >
                    Sell an item
                  </button>
                  <button
                    className="md:w-24 w-full leading-3 rounded-xl h-10 md:rounded-full border"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <button
                    className="md:w-24 w-full leading-3 rounded-xl h-10 md:rounded-full border bg-[#DB3B39] text-white"
                    onClick={handleSignup}
                  >
                    Sign up
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
