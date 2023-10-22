import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalCotext } from "../../Context/Context";

const NotiDropDown = ({ items }) => {
  const dropDownRef = useRef();

  const { useLogin, hideNotiDropdown, isNotificationDropdownOpen } =
    useGlobalCotext();
  const navigate = useNavigate();
  const handleDropdownLink = (url) => {
    if (url === "/") {
      localStorage.removeItem("hacktechtoken");
      localStorage.removeItem("user");
      localStorage.removeItem("profile");
      useLogin();
      navigate("/");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        hideNotiDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <div>
      {isNotificationDropdownOpen ? (
        <div
          className="absolute z-20 flex flex-col bg-white right-6 top-16 w-52 md:mt-0 mt-9"
          ref={dropDownRef}
        >
          {items.map((item) => (
            <button
              key={item.url}
              className="border p-2 text-sm border-black"
              onClick={() => handleDropdownLink(item.url)}
            >
              {item.title}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default NotiDropDown;
