import React from "react";
import ShowRating from "../UI/ShowRating";
import { Link } from "react-router-dom";

const SellerCard = (props) => {
  const { fullName, image, _id } = props?.userDetail[0];
  console.log(props.userDetail);
  localStorage.setItem("profile", image);
  const isEmailVerified = localStorage.getItem("isEmailVerified");
  return (
    <div className="md:flex md:flex-row flex flex-col gap-10">
      <div>
        <div className="flex gap-3 align-middle items-center">
          <h3 className="font-semibold text-base md:w-auto w-40">
            Meet the seller
          </h3>
          <p className="text-[#000000] font-normal text-xs">
            This Seller usually responds within 24 hours
          </p>
        </div>
        <div className="flex align-middle justify-between gap-5 mt-4">
          <div className="flex flex-col gap-4">
            {image ? (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/api/v1/${image}`}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <img src="/assets/preview.avif" width={60} height={60} />
            )}
            <Link className="bg-[#ECEDF1] p-2" to={`/myprofile/${_id}`}>
              View Profile
            </Link>
          </div>
          <div className="flex flex-col mt-4">
            <h4>{fullName}</h4>
            <div className="md:flex md:flex-row flex flex-col align-middle md:gap-2 gap-0">
              <ShowRating rating={props.userAvgRating} />
              <div className="flex mt-1.5">
                <p>{props.totalReviews} review</p>
                <p className="border-l-2 border-black px-3 ml-3">
                  {props.userListingLength} listed
                </p>
                <p>{props.totalUserSale} sale</p>
              </div>
            </div>
            <div className="mt-3">
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
    </div>
  );
};

export default SellerCard;
