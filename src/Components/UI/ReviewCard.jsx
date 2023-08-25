import React from "react";

const ReviewCard = (props) => {
  return (
    <div>
      <div className="flex gap-2">
        <div className="flex">
          <img src="/assets/svg.svg" />
          <img src="/assets/svg.svg" />
          <img src="/assets/svg.svg" />
          <img src="/assets/svg.svg" />
        </div>
        <p className="text-[#6B6B6B] font-normal text-xs">03/02/23</p>
      </div>
      <p>{props.text}</p>
      <div className="flex gap-3 ">
        <img src="/assets/div.svg" />
        <p className="mt-4">{props.name}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
