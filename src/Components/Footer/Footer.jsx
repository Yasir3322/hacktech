import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 relative w-full md:h-64 h-20">
      <img
        src="/assets/footer/Vector.svg"
        alt="vector"
        className="z-10 absolute md:h-52 md:mt-12 h-20"
      />
      <img
        src="/assets/footer/Vector (1).svg"
        alt="vector_1"
        className="z-0 absolute md:h-52 md:mt-12 h-20"
      />
      <img
        src="/assets/footer/Vector (2).svg"
        alt="vector_1"
        className="z-10 right-0 absolute md:h-64 h-20"
      />
      <div className="absolute bottom-6 left-8 text-white text-xl z-10">
        <button>Contact Us</button>
      </div>
      <div className="absolute z-10 right-8 bottom-6">
        <div className="flex">
          <img
            src="/assets/Group 55.svg"
            alt="group1_"
            className="w-6 h-8 mt-1"
          />
          <img
            src="/assets/uniswap.sc (1).svg"
            alt="uniswap"
            className="md:w-32 w-48 h-11 ml-3"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
