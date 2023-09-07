import React from "react";
import { useNavigate } from "react-router-dom";

const UserListing = (props) => {
  const navigate = useNavigate();

  const handleEditButton = (id) => {
    navigate(`/edityourlisting/${id}`);
  };

  const handleProductClick = (id) => {
    navigate(`/productpage/${id}`);
  };

  return (
    <article>
      <div className="relative">
        <button className="bg-[#5B5B5BBF]/70 px-2 top-1 left-2 text-white text-sm font-normal rounded-full absolute">
          mark sold
        </button>
        <button
          onClick={() => handleEditButton(props.id)}
          className="bg-gradient-to-r from-[#EA1E1BBF]/75 px-2 text-white font-normal text-sm right-2 top-1  absolute rounded-full to-[#F7C337AC]/30"
        >
          Edit
        </button>
        <div className="cursor-pointer">
          <img src={props.image} alt="ipad" className="md:w-52 w-full" />
          <div>
            <span className="text-xs text-[#737373] font-normal">
              {props.upload_time}
            </span>
            <div className="flex align-middle justify-between">
              <p className="text-base font-semibold text-black">
                {props.title}
              </p>
              <p className="text-base font-semibold text-black">
                ${props.price}
              </p>
            </div>
            <span className="text-base text-[#C0C0C0] font-normal">
              {props.spec}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default UserListing;
