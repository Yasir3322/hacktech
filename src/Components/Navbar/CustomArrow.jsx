import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const CustomArrow = ({ onClick, className, icon }) => (
  <div
    className={className}
    style={{
      position: "absolute",
      top: "50%",
      right: "-10",
      transform: "translateY(-50%)",
      zIndex: 2,
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <i className={icon} style={{ fontSize: "24px", color: "black" }}>
      {icon}
    </i>
  </div>
);

export const CustomLeftArrow = ({ onClick, ...rest }) => {
  return (
    <CustomArrow
      className="custom-left-arrow  z-20 bg-blue-gray-100 rounded-full p-0.5"
      icon={<AiOutlineLeft />}
      onClick={() => onClick()}
      {...rest}
    />
  );
};

export const CustomRightArrow = ({ onClick, ...rest }) => {
  return (
    <CustomArrow
      className="custom-right-arrow right-0 z-20 bg-blue-gray-100 rounded-full p-0.5"
      icon={<AiOutlineRight />}
      onClick={() => onClick()}
      {...rest}
    />
  );
};
