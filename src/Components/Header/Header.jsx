import React from "react";

const Header = () => {
  return (
    <section className="flex align-middle justify-between w-full mt-8 px-10">
      <div className="flex">
        <div className="flex">
          <img src="/assets/Group 1.svg" alt="group1_" className="w-8 h-12" />
          <img
            src="/assets/uniswap.sc.svg"
            alt="uniswap"
            className="w-48 h-12 ml-3"
          />
        </div>
        <div className="w-96 ml-6">
          <form>
            <label className="relative block">
              <span class="absolute inset-y-0 left-1.5 top-2 pl-1 flex items-center bg-[#DB3B39] rounded-full w-7 h-7">
                <svg
                  className="h-5 w-5 fill-white "
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                >
                  <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                </svg>
              </span>
              <input
                className="w-full  bg-white placeholder:font-italitc border border-slate-300 rounded-full h-11 pl-10 pr-4 focus:outline-none"
                type="text"
              />
            </label>
          </form>
        </div>
      </div>
      <div className="flex gap-7">
        <button className="w-28 h-10 rounded-full border border-black">
          Sell an item
        </button>
        <button className="w-24 h-10 rounded-full border ">Login</button>
        <button className="w-24 h-10 rounded-full border bg-[#DB3B39] text-white">
          Sign up
        </button>
      </div>
    </section>
  );
};

export default Header;
