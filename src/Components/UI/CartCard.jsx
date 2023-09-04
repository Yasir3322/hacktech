import React from "react";

const CartCard = () => {
  return (
    <div>
      <div className="flex flex-col gap-6 border border-[#737373] p-6">
        <div className="md:flex md:flex-row flex flex-col align-middle justify-between">
          <div className="flex align-middle justify-center gap-5">
            <img
              src="/assets/cartshoepic.svg"
              alt="cart"
              width={80}
              height={80}
            />
            <div className="flex flex-col mt-4">
              <h4 className="font-medium text-2xl">Nike Air Max Penny</h4>
              <p className="font-medium text-xl">$50.00</p>
            </div>
          </div>
          <div className="flex gap-7  w-96 align-middle justify-between mr-4">
            <div className="flex align-middle justify-center gap-16 mt-6">
              <button className="w-7 h-7 rounded-full items-center bg-white">
                +
              </button>
              <p>qty:1</p>
              <button className="w-7 h-7 rounded-full bg-white">-</button>
            </div>
            <button className="font-semibold text-base">Remove</button>
          </div>
        </div>
        <div className="flex align-middle justify-between">
          <div className="flex flex-col align-middle justify-center bg-white p-3 px-5">
            <span className="text-center font-normal text-sm">Subtotal</span>
            <span className="text-center font-normal text-sm">fee</span>
            <span className="text-center font-normal text-sm">total</span>
          </div>
          <div className="flex flex-col align-middle justify-cente p-3 px-5">
            <span className="text-center font-normal text-sm">$35.96</span>
            <span className="text-center font-normal text-sm">$1.00</span>
            <span className="text-center font-normal text-sm">$36.96</span>
          </div>
        </div>
      </div>
      <button className="bg-[#EA1E1B] text-white w-60 mt-8  h-10 rounded-md float-right">
        Proceed To Checkout
      </button>
    </div>
  );
};

export default CartCard;
