import React, { useState, useEffect } from "react";
import { useGlobalCotext } from "../../Context/Context";

const Footer = () => {
  const { isLogin } = useGlobalCotext();
  const [isMobile, setIsMobile] = useState();

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

  return (
    <div className={isLogin && isMobile ? "hidden" : "block"}>
      <footer className="w-full relative">
        <img
          src="/assets/footer/Mask group.png"
          alt="vector"
          className="w-full relative"
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
    </div>
  );
};

export default Footer;
