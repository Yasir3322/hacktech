import React from "react";
import ShowRating from "../UI/ShowRating";
import { Link } from "react-router-dom";

const SellerCard = (props) => {
  const { fullName, image, _id } = props?.userDetail[0];
  const isEmailVerified = localStorage.getItem("isEmailVerified");
  return (
    <div className="flex gap-10">
      <div>
        <h3 className="font-semibold text-base">Meet the seller</h3>
        <div className="flex align-middle justify-between gap-5 mt-4">
          {image ? (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/api/v1/${image}`}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <img src="/assets/preview.avif" width={60} height={60} />
          )}
          <div className="flex flex-col mt-4">
            <h4>{fullName}</h4>
            <div className="flex align-middle gap-2">
              <ShowRating rating={props.userAvgRating} />
              <div className="flex mt-1.5">
                <p>{props.totalReviews} review</p>
                <p className="border-l-2 border-black px-3 ml-3">
                  {props.userListingLength} listed
                </p>
                <p>{props.totalUserSale} sale</p>
              </div>
            </div>
            <div>
              {isEmailVerified ? (
                <div className="flex">
                  <img src="/assets/icn-verified.svg.svg" />
                  <p>Profile Verified</p>
                </div>
              ) : (
                <div className="flex">
                  <p>Profile Not Verified</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link className="bg-[#ECEDF1] p-2" to={`/myprofile/${_id}`}>
          View Profile
        </Link>
        <p className="text-[#000000] font-normal text-xs mt-3">
          This Seller usually responds within 24 hours
        </p>
      </div>
    </div>
  );
};

export default SellerCard;
