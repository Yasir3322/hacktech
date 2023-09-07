import React from "react";
import { Link } from "react-router-dom";

const Failure = () => {
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="container flex align-middle justify-center border px-6 py-12 mx-auto">
        <div>
          <p class="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Something Went Wrong
          </h1>
          <p class="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, please try again later.
          </p>

          <div class="flex items-center mt-6 gap-x-3">
            <Link
              class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
              to="http://127.0.0.1:5173"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 rtl:rotate-180"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </Link>

            <Link
              to="http://127.0.0.1:5173"
              class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            >
              Take me home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Failure;
