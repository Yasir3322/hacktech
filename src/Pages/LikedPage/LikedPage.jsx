import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import ProductCard from "../../Components/UI/ProductCard";
import Footer from "../../Components/Footer/Footer";

export const LikedPage = () => {
  const likedItems = [
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
  ];

  return (
    <div>
      <div>
        <h1 className="md:ml-40 ml-12 md:text-4xl text-xl font-semibold mt-5">
          your liked items
        </h1>
        <div className="py-10 m-auto w-3/4">
          <img src="/assets/Line 18.svg" />
        </div>
        <div className="w-3/4 m-auto   md:grid md:grid-cols-4 flex flex-wrap gap-7 align-middle justify-between mt-4">
          {likedItems.map((item) => {
            const { image, upload_time, title, price, spec } = item;
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
      <Footer />
    </div>
  );
};
