import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const UserDetail = (props) => {
  const [fullName, setFullName] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const handleFileChange = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const token = localStorage.getItem("hacktechtoken");
    const formdata = new FormData();
    formdata.append("images", e.target.files[0]);

    const res = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/uploadpic`,
      formdata,
      {
        headers: {
          token: token,
        },
      }
    );
    if (res.status === 200) {
      toast.success("profile Changed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const { image } = res.data.newUser;
      localStorage.setItem("profile", JSON.stringify(image));
      props.setProfileImage();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-4/5 m-auto mt-5 align-middle justify-between">
        <div className="flex flex-col flex-grow">
          <div className="flex">
            <h2 className="w-96 h-7 font-semibold text-5xl capitalize">
              {fullName.fullName}
            </h2>
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
        <form>
          <label htmlFor="fileInput">
            <img
              src={`${props.image ? props.image : "/assets/preview.avif"}`}
              alt="userprofile"
              width={100}
              height={100}
              className="w-20 h-20 rounded-full cursor-pointer"
              id="imagePreview"
            />
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </form>
      </div>
      <div className="mt-5">
        <img src="/assets/Line 18.svg" />
      </div>
    </div>
  );
};

export default UserDetail;
