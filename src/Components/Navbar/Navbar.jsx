import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useGlobalCotext } from "../../Context/Context";
import { Link } from "react-router-dom";
import { CustomLeftArrow, CustomRightArrow } from "./CustomArrow"; // Import custom arrow components if available

const MultiCarousel = () => {
  const { allCatagories, setSelectedCatagory, selectedCatagory } =
    useGlobalCotext();

  const handleCategoryClick = (title) => {
    console.log(title);
    setSelectedCatagory(title);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
      partialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      partialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
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
    <div className="relative mt-3 w-11/12 m-auto">
      <Carousel
        ssr
        partialVisbile
        className="w-full overflow-x-hidden"
        containerClass=""
        responsive={responsive}
        infinite
        autoPlaySpeed={2000}
        autoPlay={false}
        customLeftArrow={<CustomLeftArrow style={customArrowStyles} />} // Apply custom styles to left arrow
        customRightArrow={<CustomRightArrow style={customArrowStyles} />} // Apply custom styles to right arrow
      >
        {allCatagories.map((category) => {
          const { images, title } = category;
          return (
            <div key={title} className="px-2 md:px-2">
              <Link
                onClick={() => handleCategoryClick(title)}
                className={`${
                  selectedCatagory === title
                    ? "inline-flex cursor-pointer w-30 items-center shadow-md md:border-2 md:rounded-md md:ml-3 md:mr-2 md:px-5 md:py-3 border text-sm font-medium ring-1 ring-inset ring-gray-500/10"
                    : "inline-flex cursor-pointer w-42 items-center shadow-sm md:rounded-md md:ml-3 ml-2 md:mr-2 md:px-2 md:py-3 text-sm border p-1.5 font-medium ring-1 ring-inset ring-gray-500/10"
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
      </Carousel>
    </div>
  );
};

export default MultiCarousel;
