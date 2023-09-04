import React from "react";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import ProductCatagories from "../../Components/ProductCatagories/ProductCatagories";
import Footer from "../../Components/Footer/Footer";

const HomePage = () => {
  const trendingProducts = [
    {
      image: "/assets/ipad.svg",
      upload_time: "1 day ago",
      title: "2022 Apple ipad Air",
      price: "$300",
      spec: "64gb",
    },
    {
      image: "/assets/cycle.svg",
      upload_time: "1 day ago",
      title: "2022 Apple ipad Air",
      price: "$300",
      spec: "64gb",
    },
    {
      image: "/assets/shoe1.svg",
      upload_time: "1 day ago",
      title: "2022 Apple ipad Air",
      price: "$300",
      spec: "64gb",
    },
    {
      image: "/assets/shoe2.svg",
      upload_time: "1 day ago",
      title: "2022 Apple ipad Air",
      price: "$300",
      spec: "64gb",
    },
  ];

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
      title: "Nike Dunks",
      price: "$65",
      spec: "Size 9",
    },
    {
      image: "/assets/shoe6.svg",
      upload_time: "1 day ago",
      title: "Nike Dunks",
      price: "$65",
      spec: "Size 9",
    },
    {
      image: "/assets/shoe4.svg",
      upload_time: "1 day ago",
      title: "Nike Dunks",
      price: "$65",
      spec: "Size 9",
    },
  ];

  const technologies = [
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
      title: "ipad Air",
      price: "$600",
      spec: "128gb",
    },
    {
      image: "/assets/headphone.svg",
      upload_time: "1 day ago",
      title: "ipad Air",
      price: "$600",
      spec: "128gb",
    },
    {
      image: "/assets/charger.svg",
      upload_time: "1 day ago",
      title: "ipad Air",
      price: "$600",
      spec: "128gb",
    },
  ];

  return (
    <div>
      <div>
        <div className="w-11/12 m-auto mt-8">
          <h1 className="font-semibold text-4xl">Welcome, Kevin!</h1>
        </div>
        <div className="py-10 m-auto w-11/12">
          <img src="/assets/Line 18.svg" />
        </div>
        <div className=" flex flex-col gap-10 w-11/12 m-auto">
          <ProductCatagories
            prod_catag_title="Trending @USC"
            trendingProducts={trendingProducts}
          />
          <ProductCatagories
            prod_catag_title="Mens Shoes"
            trendingProducts={mensShoes}
          />
          <ProductCatagories
            prod_catag_title="Technology"
            trendingProducts={technologies}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
