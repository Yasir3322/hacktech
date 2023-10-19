import React, { useState } from "react";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = () => {};

  const handleChange = () => {};

  return (
    <section className="flex flex-wrap items-center justify-center h-screen font-['Poppins'] mt-4">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl lg:p-5 shadow-md rounded-md p-6 mx-auto text-center dark:bg-gray-800 ">
          <form onSubmit={handleSubmit} className="w-96 space-y-4 md:space-y-2">
            <div>
              <label
                for="password"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={newPassword.password}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                for="confirm-password"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm New password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={newPassword.confirmPassword}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
