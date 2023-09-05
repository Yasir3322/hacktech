import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import CartCard from "../../Components/UI/CartCard";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";

const Cart = () => {
  const [userCartItems, setUserCartItems] = useState([]);

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
  }, [userCartItems]);

  return (
    <div>
      <div className="w-4/5 m-auto">
        <div>
          <h1 className="text-4xl font-semibold py-7">Your Cart</h1>
        </div>
        <div>
          {userCartItems.map((item) => {
            const { title, price, images } = item.product[0];
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
        </div>
        <button className="bg-[#EA1E1B] text-white w-60 mt-8  h-10 rounded-md float-right">
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
