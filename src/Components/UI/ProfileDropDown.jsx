import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalCotext } from "../../Context/Context";

const ProfileDropDown = () => {
  const profile_dropdown_props = [
    {
      title: "My profile",
      url: "/myprofile",
    },
    {
      title: "Information",
      url: "/information",
    },
    {
      title: "Logout",
      url: "/",
    },
  ];
  const dropDownRef = useRef();

  const { useLogin, isProfileDropdownOpen, setIsProfileDropdownOpen } =
    useGlobalCotext();
  const navigate = useNavigate();
  const handleDropdownLink = (url) => {
    console.log(url);
    if (url === "/") {
      localStorage.removeItem("hacktechtoken");
      localStorage.removeItem("user");
      localStorage.removeItem("profile");
      useLogin();
      navigate("/");
    } else if (url === "/myprofile") {
      const id = JSON.parse(localStorage.getItem("user"))._id;
      navigate(`${url}/${id}`);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef, setIsProfileDropdownOpen]);

  return (
    <div>
      {isProfileDropdownOpen ? (
        <div
          className="absolute z-20 flex flex-col bg-white right-6 top-16 w-52"
          ref={dropDownRef}
        >
          {profile_dropdown_props.map((item, index) => {
            return (
              <button
                key={index}
                className="border p-2 text-sm border-black"
                onClick={() => handleDropdownLink(item.url)}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileDropDown;
