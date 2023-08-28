import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import UserDetail from "../../Components/UserDetail";
import Footer from "../../Components/Footer/Footer";
import ProductCard from "../../Components/UI/ProductCard";

const MyProfile = () => {
  const mensShoes = [
    {
      image: "/assets/shoe5.svg",
      upload_time: "1 day ago",
      title: "Nike Dunks",
      price: "$65",
      spec: "Size 9",
    },
    {
      image: "/assets/shoe3.svg",
      upload_time: "1 day ago",
      title: "Nike Jordans",
      price: "$68",
      spec: "Size 12",
    },
    {
      image: "/assets/shoe6.svg",
      upload_time: "1 day ago",
      title: "New Balance 550's",
      price: "$155",
      spec: "Size 9.5",
    },
    {
      image: "/assets/shoe4.svg",
      upload_time: "1 day ago",
      title: "New Balance 2002R",
      price: "$105",
      spec: "Size 13",
    },
    {
      image: "/assets/iphone.svg",
      upload_time: "1 day ago",
      title: "ipad Air",
      price: "$600",
      spec: "128gb",
    },
    {
      image: "/assets/clock.svg",
      upload_time: "1 day ago",
      title: "Samsung Galaxy Watch",
      price: "$155",
      spec: "2022",
    },
    {
      image: "/assets/headphone.svg",
      upload_time: "1 day ago",
      title: "Sony Headphones",
      price: "$210",
      spec: "WH-10000XM4",
    },
    {
      image: "/assets/charger.svg",
      upload_time: "1 day ago",
      title: "Wireless Charger",
      price: "$10",
      spec: "Anker",
    },
  ];

  return (
    <div>
      <UserDetail />
      <div className="w-full flex align-middle justify-center">
        <button className="w-3/4 h-14 bg-[#DB3B39] text-white mt-16 rounded-3xl text-2xl font-semibold">
          MY Listing
        </button>
      </div>
      <div className="mt-10 m-auto w-3/4">
        <img src="/assets/Line 18.svg" />
      </div>
      <div className="w-3/4 m-auto  md:grid md:grid-cols-4 flex flex-wrap gap-7 align-middle justify-between mt-4">
        {mensShoes.map((shoe) => {
          const { image, upload_time, title, price, spec } = shoe;
          return (
            <ProductCard
              image={image}
              upload_time={upload_time}
              title={title}
              price={price}
              spec={spec}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyProfile;
