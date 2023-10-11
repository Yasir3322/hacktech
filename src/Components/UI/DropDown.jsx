import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalCotext } from "../../Context/Context";

const DropDown = ({ items }) => {
  const dropDownRef = useRef();

  const { useLogin, showProfileDropdown, showNotiDropdown } = useGlobalCotext();
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
        showProfileDropdown(false);
        showNotiDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <div
      className="absolute z-20 flex flex-col bg-white right-6 top-16 w-52"
      ref={dropDownRef}
    >
      {items.map((item) => {
        return (
          <button
            className="border p-2 text-sm border-black"
            onClick={() => handleDropdownLink(item.url)}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
};

export default DropDown;
