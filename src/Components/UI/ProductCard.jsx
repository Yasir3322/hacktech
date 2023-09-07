import React from "react";
import { useGlobalCotext } from "../../Context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const { isLogin } = useGlobalCotext();

  const navigate = useNavigate();

  const handleLikedButton = async (id) => {
    const token = localStorage.getItem("hacktechtoken");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/favourite/favouriteproduct`,
        { productid: id },
        {
          headers: {
            token: token,
            "ngrok-skip-browser-warning": true,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Added to Your Liked Items", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveLikedButton = async (id) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/favourite/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      }
    );
    if (res.status === 200) {
      toast.success("Removed successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleProductClick = (id) => {
    navigate(`/productpage/${id}`);
  };

  return (
    <article>
      <div className="relative">
        {props.isliked ? (
          <button
            className="absolute top-2 right-3 bg-red-500 p-1 rounded-full"
            onClick={() => handleRemoveLikedButton(props.id)}
          >
            <img src="/assets/liked-icon-white.svg" />
          </button>
        ) : (
          <div>
            {isLogin ? (
              <button
                className="absolute top-2 right-3 bg-white p-1 rounded-full"
                onClick={() => handleLikedButton(props.id)}
              >
                <img src="/assets/liked-icon.svg" />
              </button>
            ) : (
              <button className="absolute top-2 right-3 bg-white p-1 rounded-full">
                <img src="/assets/liked-icon.svg" />
              </button>
            )}
          </div>
        )}
        <div
          className="cursor-pointer"
          onClick={() => handleProductClick(props.id)}
        >
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

export default ProductCard;
