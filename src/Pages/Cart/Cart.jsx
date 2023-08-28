import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import CartCard from "../../Components/UI/CartCard";
import Footer from "../../Components/Footer/Footer";

const Cart = () => {
  return (
    <div>
      <div className="w-4/5 m-auto">
        <div>
          <h1 className="text-4xl font-semibold py-7">Your Cart</h1>
        </div>
        <div>
          <CartCard />
        </div>
      </div>
    </div>
  );
};

export default Cart;
