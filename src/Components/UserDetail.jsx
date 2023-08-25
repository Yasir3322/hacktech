import React from "react";

const UserDetail = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-4/5 m-auto mt-5 align-middle justify-between">
        <div className="flex flex-col flex-grow">
          <div className="flex">
            <h2 className="w-96 h-7 font-semibold text-5xl">Kevin Gerges</h2>
            <img
              src="/assets/badge.svg"
              alt="userprofilebadge"
              width={45}
              height={45}
              className="mt-3"
            />
          </div>
          <div className="w-full">
            <span>158 reviews | 255 listed |167 sales</span>
          </div>
          <div className="h-8">
            <img src="/assets/star.svg" />
          </div>
        </div>
        <div>
          <img
            src="/assets/userprofile.svg"
            alt="userprofile"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="mt-5">
        <img src="/assets/Line 18.svg" />
      </div>
    </div>
  );
};

export default UserDetail;
