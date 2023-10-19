import React, { useEffect, useState } from "react";
import { useGlobalCotext } from "../../Context/Context";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { m } from "../Magic-client";
import { toast } from "react-toastify";

const CreateAccountPopup = ({ socket }) => {
  const navigate = useNavigate();
  const {
    isCreateAccountPopupOpen,
    showCreateAccountPopup,
    useLogin,
    showLoginPopup,
  } = useGlobalCotext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    privacypolicy: false,
    socketid: socket.id,
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("called");
    // Toggle loading state to true when the signup process starts

    if (formData.password === formData.confirmPassword) {
      setLoading(true);
      try {
        // email verification code
        const didtoken = await m.auth.loginWithMagicLink({
          email: formData.email,
        });
        console.log(didtoken);

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/createuser`,
          formData
        );

        console.log(res);

        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          privacypolicy: false,
        });
        showCreateAccountPopup();
        const token = res.data.token;

        if (token && didtoken) {
          const { _id, fullName } = res.data.user;
          const user = { _id, fullName };
          localStorage.setItem("hacktechtoken", token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("isEmailVerified", true);
          useLogin();
          socket.emit("newuser", {
            userid: _id,
            socketId: socket.id,
          });
          navigate("/");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        // Toggle loading state back to false when the signup process is complete (whether it succeeded or failed)
        setLoading(false);
      }
    } else {
      setError("Passwords not matched");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleLoginInstead = () => {
    showCreateAccountPopup();
    showLoginPopup();
  };

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  return (
    <div
      className={`${
        isCreateAccountPopupOpen
          ? "w-full h-screen fixed bg-black/50  z-20 "
          : ""
      }`}
    >
      <div
        className={`${
          isCreateAccountPopupOpen
            ? "show absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2   bg-white rounded-2xl"
            : "hidden"
        }`}
      >
        <div className="w-full">
          <p
            className={
              error.length
                ? "w-full flex align-middle justify-center text-red-500 transition-opacity duration-300 ease-in-out"
                : "hidden"
            }
          >
            {error}
          </p>
        </div>
        <form
          className="flex flex-col justify-center items-center px-5 pb-5 gap-3 "
          onSubmit={handleSignup}
        >
          <h1 className="text-4xl font-bold">Create an Account!</h1>
          <button
            className="absolute right-1 top-1"
            onClick={() => showCreateAccountPopup()}
          >
            <AiFillCloseCircle />
          </button>
          <button className="border text-lg w-full h-8 flex gap-2 align-middle justify-center">
            <img src="/assets/Frame.png" className="mt-1" />
            <span>Continue with Google</span>
          </button>
          <div className="flex flex-col w-full">
            <label className="font-semibold text-base">Full Name</label>
            <input
              type="text"
              className="border border-[#CDCED2] rounded-sm h-8"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-semibold text-base">Email address</label>
            <input
              type="email"
              className="border border-[#CDCED2] rounded-sm h-8"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-semibold text-base">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Use at least 8 characters"
                className="border w-full border-[#CDCED2] rounded-sm h-8 px-2"
                name="password"
                value={formData.password}
                onChange={handleChange}
                pattern="^.{8,}$"
                title="Must contain at least one number, and at least 8 or more characters"
                required
              />
              <span
                className="absolute right-2 top-1 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <img src="/assets/eye.svg" alt="Toggle Password Visibility" />
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="font-semibold text-base">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Use at least 8 characters"
                className="border w-full border-[#CDCED2] rounded-sm h-8 px-2"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                pattern="^.{8,}$"
                title="Must contain at least one number, and at least 8 or more characters"
                required
              />
              <span
                className="absolute right-2 top-1 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                <img src="/assets/eye.svg" alt="Toggle Password Visibility" />
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="privacypolicy"
              checked={formData.privacypolicy}
              onChange={handleChange}
              required
            />
            <label className="text-xs">
              I agree to the uniswap Terms of Service and Privacy Policy
            </label>
          </div>
          <button className="bg-[#DB3B39]  text-white w-full p-1" type="submit">
            {!loading ? "Sign up" : "Loading..."}
          </button>
          <span className="text-[#006ACB] text-sm">
            Have an account already?{" "}
            <button onClick={() => handleLoginInstead()}>Login instead</button>
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

export default CreateAccountPopup;
