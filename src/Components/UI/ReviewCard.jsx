import React from "react";
import ShowRating from "./ShowRating";

const ReviewCard = (props) => {
  return (
    <div>
      <div className="flex gap-2">
        <div className="flex">
          <ShowRating rating={props.rating} />
        </div>
        <p className="text-[#6B6B6B] font-normal text-xs mt-3">
          {props.createdat}
        </p>
      </div>
      <p>{props.text}</p>
      <div className="flex gap-3 align-middle">
        {props.image ? (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/api/v1/${props.image}`}
            className="w-10 h-10 rounded-full mt-2"
          />
        ) : (
          <img src="/assets/div.svg" />
        )}
        <p className="mt-4">{props.name}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
