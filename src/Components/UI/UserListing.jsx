import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalCotext } from "../../Context/Context";

const UserListing = (props) => {
  const { showSoldPopup, isLogin } = useGlobalCotext();
  const { id } = useParams();
  if (isLogin) {
    var localstorageid = JSON.parse(localStorage.getItem("user"))._id;
  }
  const navigate = useNavigate();

  const handleEditButton = (id) => {
    navigate(`/edityourlisting/${id}`);
  };

  const handleProductClick = (id) => {
    navigate(`/productpage/${id}`);
  };

  const handleMarkSold = async (id) => {
    // const data = {
    //   isSold: true,
    // };

    // const res = await axios.patch(
    //   `${import.meta.env.VITE_BACKEND_URL}/api/product/editlisting/${id}`,
    //   data
    // );
    // if (res.status === 200) {
    //   toast.success("Your product marked as Sold", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
    console.log(id);
    showSoldPopup(id);
  };

  return (
    <article>
      <div className="relative">
        <button
          onClick={() => handleMarkSold(props.id)}
          className={`${
            id === localstorageid
              ? "bg-[#5B5B5BBF]/70 px-2 top-1 left-2 text-white text-sm font-normal rounded-full absolute"
              : "hidden"
          }`}
        >
          mark sold
        </button>
        <button
          onClick={() => handleEditButton(props.id)}
          className={`${
            id === localstorageid
              ? "bg-gradient-to-r from-[#EA1E1BBF]/75 px-2 text-white font-normal text-sm right-2 top-1  absolute rounded-full to-[#F7C337AC]/30"
              : "hidden"
          }`}
        >
          Edit
        </button>
        <div
          className="cursor-pointer"
          onClick={() => handleProductClick(props.id)}
        >
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/api/v1/${props.image}`}
            alt="ipad"
            className="md:w-52 w-full"
          />
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
