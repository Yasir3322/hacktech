import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartCard = (props) => {
  const handleRemoveFromCart = async (id) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/cart/removefromcart/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      }
    );
    if (res.status === 200) {
      toast.success("Removed Successfully", {
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

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-6 p-6">
        <div className="md:flex md:flex-row flex flex-col align-middle justify-between">
          <div className="flex align-middle justify-center gap-5">
            <img src={props.image} alt="cart" width={80} height={80} />
            <div className="flex flex-col mt-4">
              <h4 className="font-medium text-2xl">{props.title}</h4>
              <p className="font-medium text-xl">${props.price}</p>
            </div>
          </div>
          <div className="flex gap-7  w-96 align-middle justify-between mr-4">
            <div className="flex align-middle justify-center gap-16 mt-6">
              <button className="w-7 h-7 rounded-full items-center bg-white">
                +
              </button>
              <p>qty:{props.quantity}</p>
              <button className="w-7 h-7 rounded-full bg-white">-</button>
            </div>
            <button
              className="font-semibold text-base"
              onClick={() => handleRemoveFromCart(props.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
