import React from "react";
import { useGlobalCotext } from "../../Context/Context";

const LoginPopup = () => {
  const { isLoginPopupOpen, useLogin } = useGlobalCotext();

  const handleSignup = (e) => {
    e.preventDefault();
    useLogin();
    navigate("/user");
  };

  return (
    <div
      className={`${
        isLoginPopupOpen ? "w-full h-screen fixed bg-black/50  z-20 " : ""
      }`}
    >
      <div
        className={`${
          isLoginPopupOpen
            ? "show absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  bg-white rounded-2xl"
            : "hidden"
        }`}
      >
        <form className="flex flex-col justify-center items-center p-5 gap-3 ">
          <h1 className="text-4xl font-bold">Login into an Account!</h1>
          <button className="border text-lg w-full h-8 flex gap-2 align-middle justify-center">
            <img src="/assets/Frame.png" className="mt-1" />
            <span>Continue with Google</span>
          </button>
          <div className="flex flex-col w-full">
            <label className="font-semibold text-base">Email address</label>
            <input
              type="email"
              className="border border-[#CDCED2] rounded-sm h-8"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-semibold text-base">Password</label>
            <input
              type="password"
              placeholder="Use at least 8 characters"
              className="border border-[#CDCED2] rounded-sm h-8 px-2"
            />
          </div>
          <div className="flex gap-2">
            <input type="checkbox" />
            <label className="text-xs">
              I agree to the uniswap Terms of Service and Privacy Policy
            </label>
          </div>
          <button
            className="bg-[#CDCED2] text-white w-full p-1"
            onClick={() => handleSignup}
          >
            Sign in
          </button>
          <span className="text-[#006ACB] text-sm">
            Have an account already? Login instead
          </span>
          <div className="w-64 font-normal text-xs items-center">
            <p>
              We keep your information safe. We never use your information
              outside of uniswap.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
