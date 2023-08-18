import React from "react";

const ProductCard = (props) => {
  return (
    <article>
      <div>
        <img src={props.image} alt="ipad" className="w-48" />
        <div>
          <span className="text-xs text-[#737373] font-normal">
            {props.upload_time}
          </span>
          <div className="flex align-middle justify-between">
            <p className="text-base font-semibold text-black">{props.title}</p>
            <p className="text-base font-semibold text-black">{props.price}</p>
          </div>
          <span className="text-base text-[#C0C0C0] font-normal">
            {props.spec}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
