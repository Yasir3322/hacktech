import React from "react";
import { useGlobalCotext } from "../../Context/Context";

const Footer = () => {
  const { isLogin } = useGlobalCotext();

  return (
    <footer className="md:relative absolute b-0 w-full md:h-52 h-16 lg:h-96 md:mt-0 mt-40">
      <img
        src="/assets/footer/Vector.svg"
        alt="vector"
        className="z-10 absolute bottom-0 xl:h-[15rem]  2xl:h-[25rem] md:h-48 h-20"
      />
      <img
        src="/assets/footer/Vector (1).svg"
        alt="vector_1"
        className="z-0 absolute bottom-0 xl:h-[11rem] 2xl:h-[23rem] 2xl:left-28 md:h-44 left-5 h-14"
      />
      <img
        src="/assets/footer/Vector (2).svg"
        alt="vector_1"
        className="z-10 right-0 absolute xl:h-[15rem] bottom-0 2xl:h-[25rem] md:h-48 h-20"
      />
      <div className="absolute bottom-6 md:left-4 left-0 text-white md:text-xl text-xs z-10">
        <div className="flex">
          <img
            src="/assets/footer-finger.svg"
            alt="uniswap"
            className="md:w-32 w-14 h-11 ml-3 md:scale-125 "
          />
        </div>
      </div>
      <div className="absolute z-10 md:right-4 right-2 md:bottom-6 bottom-0">
        <div className="flex">
          <img
            src="/assets/TROJAN SQUARE.svg"
            alt="uniswap"
            className="md:w-32 w-14 h-11 ml-3 md:scale-125"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
