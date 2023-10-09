import React from "react";
import { useGlobalCotext } from "../../Context/Context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { allCatagories, setSelectedCatagory, selectedCatagory } =
    useGlobalCotext();

  const handleCategoryClick = (title) => {
    setSelectedCatagory(title);
  };

  return (
    <div className="relative flex">
      {allCatagories.map((category) => {
        const { images, title } = category;
        return (
          <div key={title} className="mt-3">
            <Link
              onClick={() => handleCategoryClick(title)}
              className={`${
                selectedCatagory === title
                  ? "inline-flex cursor-pointer w-30 items-center shadow-md md:border-2 md:rounded-md md:ml-2 md:px-5 md:py-3 text-sm font-medium ring-1 ring-inset ring-gray-500/10"
                  : "inline-flex cursor-pointer w-42 items-center shadow-sm md:rounded-md md:ml-2 ml-2 md:px-2 md:py-3 md:mr-3 text-sm font-medium ring-1 ring-inset ring-gray-500/10"
              }`}
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/api/v1/${images}`}
                alt="category"
                className="md:w-23 lg:w-36 h-4 md:scale-125 scale-95"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
