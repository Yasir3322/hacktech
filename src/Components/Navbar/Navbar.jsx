import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalCotext } from "../../Context/Context";
const Navbar = ({ props }) => {
  const { allCatagories } = useGlobalCotext();

  return (
    <nav className="md:flex grid grid-cols-3 mt-4 relative">
      {allCatagories.map((catagory) => {
        const { images } = catagory;
        return (
          <span class="inline-flex items-center shadow-sm rounded-md ml-3  md:px-5 py-3 text-sm font-medium ring-1 ring-inset ring-gray-500/10">
            <img src={images} alt="catagory" className="w-23 h-4 scale-125" />
          </span>
        );
      })}
    </nav>
  );
};

export default Navbar;
