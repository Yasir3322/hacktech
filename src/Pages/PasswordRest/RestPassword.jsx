import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState({
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    const data = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/password/resetpassword`,
      email
    );
    console.log(data);
    setEmail("");
  };

  const handleChange = (e) => {
    setEmail((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <section className="flex flex-wrap items-center justify-center h-screen font-['Poppins'] mt-4">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl lg:p-5 shadow-md rounded-md p-6 mx-auto text-center dark:bg-gray-800 ">
          <form onSubmit={handleSubmit} className="w-96">
            <div className="mb-4 lg:mb-7">
              <input
                type="email"
                className="w-full px-4 py-4 lg:py-5 dark:text-gray-300 border-b bg-transparent border-black"
                name="email"
                value={email.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <button
              className="w-full px-2 py-2 text-sm font-bold text-gray-300 uppercase bg-[#DB3B39] rounded-md lg:text-lg dark:text-gray-300 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-900 "
              type="submit"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
