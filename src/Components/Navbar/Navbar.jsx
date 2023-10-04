import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalCotext } from "../../Context/Context";
import { Link } from "react-router-dom";
const Navbar = ({ props }) => {
  const { allCatagories, setSelectedCatagory, selectedCatagory } =
    useGlobalCotext();

  const handleCatagoryClick = (title) => {
    console.log(title);
    setSelectedCatagory(title);
  };

  return (
    <nav className="md:flex grid grid-cols-3 mt-4 relative">
      {allCatagories.map((catagory) => {
        const { images, title } = catagory;
        return (
          <Link
            onClick={() => handleCatagoryClick(title)}
            className={`${
              selectedCatagory === title
                ? "inline-flex cursor-pointer items-center shadow-md border-2 rounded-md ml-3  md:px-5 py-3 text-sm font-medium ring-1 ring-inset ring-gray-500/10"
                : "inline-flex cursor-pointer items-center shadow-sm rounded-md ml-3  md:px-5 py-3 text-sm font-medium ring-1 ring-inset ring-gray-500/10"
            }`}
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/api/v1/${images}`}
              alt="catagory"
              className="w-23 h-4 scale-125"
            />
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
