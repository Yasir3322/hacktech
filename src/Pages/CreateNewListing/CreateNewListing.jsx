import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import Footer from "../../Components/Footer/Footer";
const CreateNewListing = () => {
  return (
    <div className="w-full">
      <div className="w-11/12 m-auto pt-12">
        <div>
          <h1 className="font-semibold text-5xl">Create a new listing</h1>
          <p className="font-simibold text-2xl">
            Enter the details to create the listing
          </p>
        </div>
        <div className="mt-16">
          <form>
            <div className="flex gap-36 align-middle justify-between">
              <div className="flex flex-col flex-grow">
                <label className="text-base font-bold">Listing title?</label>
                <input
                  type="text"
                  className="border bg-white border-[#D0D4D9] w-full"
                />
                <label className="bg-[#000000s] text-base">
                  Click and start typing ↗
                </label>
              </div>
              <div class="border bg-white border-[#215AFF] h-9 mt-3 px-2 flex align-middle justify-between rounded-t-lg w-72 relative">
                <select
                  class="appearance-none bg-transparent border-none w-full py-2 pr-8 leading-tight focus:outline-none"
                  id="category"
                >
                  <option disabled>Category</option>
                  <option>select1</option>
                  <option>select2</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#215AFF]">
                  <IoIosArrowUp />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-base font-bold">Description</label>
              <input type="text" className="border border-[#D0D4D9]" />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="flex flex-col">
                  <label className="text-base font-bold">Hashtags</label>
                  <input type="text" className="border border-[#D0D4D9]" />
                </div>
                <div class="border bg-white border-[#215AFF] h-9 mt-3 px-2 flex align-middle justify-between rounded-t-lg w-72 relative">
                  <select
                    class="appearance-none bg-transparent border-none w-full py-2 pr-8 leading-tight focus:outline-none"
                    id="category"
                  >
                    <option disabled>Category</option>
                    <option>select1</option>
                    <option>select2</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#215AFF]">
                    <IoIosArrowUp />
                  </div>
                </div>
                <div className="flex gap-2 w-72 py-4 border-t border-b bg-white mt-4 border-black">
                  <input type="checkbox" name="" id="" />
                  <label>Is this an online product ?</label>
                </div>
              </div>
              <div class="flex items-center">
                <div class="relative">
                  <input
                    id="file-input"
                    type="file"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <img src="/assets/choosefile.svg" alt="Custom Icon" />
                </div>
              </div>
            </div>
            <button className="bg-[#DB3B39] text-white w-28 h-12 rounded-md mt-5">
              Sell an item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewListing;
