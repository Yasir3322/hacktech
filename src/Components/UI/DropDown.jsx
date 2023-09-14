import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalCotext } from "../../Context/Context";

const DropDown = ({ items }) => {
  const { useLogin } = useGlobalCotext();
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

  return (
    <div className="absolute z-20 flex flex-col bg-white right-6 top-16 w-52">
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
