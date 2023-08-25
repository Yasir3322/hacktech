import React from "react";

const SellerCard = () => {
  return (
    <div className="flex gap-10">
      <div>
        <h3 className="font-semibold text-base">Meet the seller</h3>
        <div className="flex align-middle justify-between gap-5 mt-4">
          <img src="/assets/Ellipse 25 (1).svg" />
          <div className="flex flex-col mt-4">
            <h4>Sean Kim</h4>
            <div className="flex">
              <img src="/assets/svg.svg" />
              <img src="/assets/svg.svg" />
              <img src="/assets/svg.svg" />
              <img src="/assets/svg.svg" />
              <p>158 review</p>
              <p className="border-l-2 border-black px-3 ml-3">255 listed</p>
              <p>167 sale</p>
            </div>
            <div className="flex">
              <img src="/assets/icn-verified.svg.svg" />
              <p>Profile Verified</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="bg-[#ECEDF1] p-2">View Profile</button>
        <p className="text-[#000000] font-normal text-xs mt-3">
          This Seller usually responds within 24 hours
        </p>
      </div>
    </div>
  );
};

export default SellerCard;
