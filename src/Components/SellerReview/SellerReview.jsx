import React from "react";
import ReviewCard from "../UI/ReviewCard";

const SellerReview = () => {
  return (
    <div className="mt-10">
      <div className="flex gap-4">
        <h2 className="font-semibold text-md">Seller reviews(0)</h2>
        <button className="text-[#DB3B39] font-normal text-sm">See all</button>
      </div>
      <div className="mt-8 grid grid-cols-3">
        <ReviewCard text="awesome very satisfied" name="Jamal" rating={3} />
      </div>
    </div>
  );
};

export default SellerReview;
