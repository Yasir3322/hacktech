import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useGlobalCotext } from "../../Context/Context";
import { Link, useLocation } from "react-router-dom";
import { CustomLeftArrow, CustomRightArrow } from "./CustomArrow"; // Import custom arrow components if available

const MultiCarousel = () => {

  const location = useLocation();

  const [isMobile, setIsMobile] = useState(false);

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

  const { allCatagories, setSelectedCatagory, selectedCatagory } =
    useGlobalCotext();

  const handleCategoryClick = (title) => {
    console.log(title);
    setSelectedCatagory(title);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      partialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      partialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      partialVisibilityGutter: 30,
    },
  };

  // Custom styles for arrows
  const customArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "grey", // Change the background color
    color: "black", // Change the text color
    width: "40px", // Adjust arrow width
    height: "40px", // Adjust arrow height
    borderRadius: "50%", // Make the arrow circular
    cursor: "pointer", // Add a pointer cursor
  };

  return (
    <div className={location.pathname.includes('/chat') && isMobile ? "hidden" : "relative mt-3 w-11/12 m-auto md:pb-0 pb-3"}>
      <Carousel
        ssr
        partialVisbile
        className="w-full overflow-x-hidden"
        containerClass=""
        responsive={responsive}
        infinite
        itemClass=""
        autoPlaySpeed={2000}
        autoPlay={false}
        customLeftArrow={
          <CustomLeftArrow
            style={customArrowStyles}
          // className="md:block hidden"
          />
        }
        customRightArrow={
          <CustomRightArrow
            style={customArrowStyles}
          // className="md:block hidden"
          />
        }
      >
        {allCatagories.map((category) => {
          const { images, title } = category;
          return (
            <div key={title} className="px-0.5">
              <Link
                onClick={() => handleCategoryClick(title)}
                className={`${selectedCatagory === title
                  ? "flex align-middle justify-center   cursor-pointer items-center rounded-lg shadow-lg md:rounded-md md:px-2 md:py-3 text-sm border p-3 font-medium ring-1 ring-inset ring-gray-500"
                  : " cursor-pointer flex  align-middle justify-center items-center rounded-lg shadow-lg md:rounded-md  md:px-2 md:py-3 text-sm border p-3 font-medium ring-1 ring-inset ring-gray-500/10"
                  }`}
              >
                <div className="flex gap-1 md:scale-95 scale-125">
                  <p className="text-xs md:hidden">{title}</p>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/api/v1/${images}`}
                    alt="category"
                    className=""
                  />
                  <p className="text-xs md:block hidden flex-nowrap ">
                    {title}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MultiCarousel;
