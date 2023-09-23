import React, { useEffect, useState } from "react";
import CartCard from "../../Components/UI/CartCard";
import axios from "axios";
import { useGlobalCotext } from "../../Context/Context";

const Cart = () => {
  const { userCartItems, setUserCartItems } = useGlobalCotext();
  const getUserCartItem = async () => {
    const token = localStorage.getItem("hacktechtoken");
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/cart/getusercartitems`,
      { headers: { token: token, "ngrok-skip-browser-warning": true } }
    );
    setUserCartItems(res.data.items);
  };

  useEffect(() => {
    getUserCartItem();
  }, []);

  var total_price = 0;
  var fee = 0;

  console.log(userCartItems);
  const paymentdata = userCartItems.map((item) => {
    const quantity = item.quantity;
    const { _id, priceid } = item.product[0];
    return { _id, priceid, quantity };
  });

  console.log(paymentdata);

  const handleCheckOut = async () => {
    const token = localStorage.getItem("hacktechtoken");
    const metaData = {
      price_id: "price_1NneMwEg2I5qxKjJLfEZlcSi",
      product_id: "64f9959a42d30c77db795d43",
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/stripe/stripecheckout`,
      // metaData,
      { paymentdata },
      {
        headers: {
          token: `${token}`,
        },
      }
    );
    if (res.status === 200) {
      window.location.href = res.data;
    } else {
      alert("something went wrong");
    }
    console.log;
  };

  console.log(userCartItems);
  return (
    <div>
      <div className="w-4/5 m-auto">
        <div>
          <h1 className="text-4xl font-semibold py-7">Your Cart</h1>
        </div>
        <div className="border border-[#737373] ">
          {userCartItems.map((item) => {
            var { title, price, images } = item.product[0];
            total_price = total_price + price;
            const image = images[0];
            const _id = item._id;
            return (
              <CartCard
                title={title}
                price={price}
                quantity={item.quantity}
                image={image}
                id={_id}
              />
            );
          })}
          <div className="flex align-middle justify-between">
            <div className="flex flex-col align-middle justify-center bg-white p-3 px-5">
              <span className="text-center font-normal text-sm">Subtotal</span>
              <span className="text-center font-normal text-sm">fee</span>
              <span className="text-center font-normal text-sm">total</span>
            </div>
            <div className="flex flex-col align-middle justify-cente p-3 px-5">
              <span className="text-center font-normal text-sm">
                ${total_price}.00
              </span>
              <span className="text-center font-normal text-sm">${fee}.00</span>
              <span className="text-center font-normal text-sm">
                ${total_price + fee}.00
              </span>
            </div>
          </div>
        </div>
        <button
          className="bg-[#EA1E1B]  border-2 cursor-pointer text-white w-60 mt-8  h-10 rounded-md float-right"
          onClick={() => handleCheckOut()}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
