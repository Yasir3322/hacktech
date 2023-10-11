import React from "react";
import { useGlobalCotext } from "../../Context/Context";

const Footer = () => {
  const { isLogin } = useGlobalCotext();

  return (
    <footer className="md:relative absolute w-full md:h-52 h-16 lg:h-96 md:mt-0 mt-10">
      <img
        src="/assets/footer/Vector.svg"
        alt="vector"
        className="z-10 absolute  bottom-0 2xl:h-52 md:h-48 h-20"
      />
      <img
        src="/assets/footer/Vector (1).svg"
        alt="vector_1"
        className="z-0 absolute  bottom-0 2xl:h-44 2xl:left-28 md:h-44 left-5 h-14"
      />
      <img
        src="/assets/footer/Vector (2).svg"
        alt="vector_1"
        className="z-10 right-0 absolute  bottom-0 2xl:h-52 md:h-48 h-20"
      />
      <div className="absolute bottom-6 md:left-8 left-5 text-white md:text-xl text-xs z-10">
        {isLogin ? <button>Contact Us</button> : ""}
      </div>
      <div className="absolute z-10 md:right-8 right-2 md:bottom-6 bottom-0">
        <div className="flex">
          <img
            src="/assets/trojansquare.svg"
            alt="uniswap"
            className="md:w-32 w-14 h-11 ml-3 scale-125"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
