import React from "react";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import ProductCatagories from "../../Components/ProductCatagories/ProductCatagories";
import Footer from "../../Components/Footer/Footer";

const LandingPage = () => {
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
      <section className="shadow-md pb-4">
        <Header />
        <Navbar />
      </section>
      <div className="relative">
        <div className="absolute md:left-44 md:top-8 left-5 top-3">
          <h1 className="md:text-2xl text-xs font-bold text-white">
            Sign up with your college campus!
          </h1>
        </div>
        <button className="absolute md:w-28 text-sm md:h-12 w-8 h-4 rounded-full md:right-36 right-10 md:mr-16 bg-white text-[#B77EFF] bottom-5">
          Sign up
        </button>
        <div className="md:mt-10 flex align-middle justify-center">
          <img src="/assets/MASK.svg" alt="mask" className="md:w-4/5" />
        </div>
      </div>
      <div className="px-7 mt-6 flex flex-col gap-10 w-4/5 m-auto">
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
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
