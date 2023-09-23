import React from "react";
import ShowRating from "../UI/ShowRating";

const SellerCard = () => {
  return (
    <div className="flex gap-10">
      <div>
        <h3 className="font-semibold text-base">Meet the seller</h3>
        <div className="flex align-middle justify-between gap-5 mt-4">
          <img src="/assets/preview.avif" width={60} height={60} />
          <div className="flex flex-col mt-4">
            <h4>Sean Kim</h4>
            <div className="flex align-middle gap-2">
              <ShowRating rating={3} />
              <div className="flex mt-1.5">
                <p>1 review</p>
                <p className="border-l-2 border-black px-3 ml-3">0 listed</p>
                <p>0 sale</p>
              </div>
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
