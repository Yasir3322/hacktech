import React from "react";
import { AiOutlineRight } from "react-icons/ai";

const CustomArrow = ({ onClick, className, icon }) => (
  <div
    className={className}
    style={{
      position: "absolute",
      top: "40%",
      //   right: "0",
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
      className="custom-left-arrow left-0 hidden"
      icon="fas fa-chevron-left"
      onClick={() => onClick()}
      {...rest}
    />
  );
};

export const CustomRightArrow = ({ onClick, ...rest }) => {
  return (
    <CustomArrow
      className="custom-right-arrow right-3"
      icon={<AiOutlineRight />}
      onClick={() => onClick()}
      {...rest}
    />
  );
};
