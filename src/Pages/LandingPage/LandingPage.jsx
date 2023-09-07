import React, { useEffect, useState } from "react";
import ProductCatagories from "../../Components/ProductCatagories/ProductCatagories";
import Footer from "../../Components/Footer/Footer";
import { useGlobalCotext } from "../../Context/Context";
import axios from "axios";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const LandingPage = () => {
  const { isLogin } = useGlobalCotext();
  const [technologyProd, setTechnologyProd] = useState([]);
  const [mensShoesProd, setMensShoesProd] = useState([]);
  const [trandingProd, setTrandingProd] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const getAllProducts = async () => {
    setLoading(!loading);
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/allproducts`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      }
    );
    res.data.allProducts?.map((products) => {
      if (products._id === "Technology") {
        setTechnologyProd(products.products);
      } else if (products._id === "Mens Shoes") {
        setMensShoesProd(products.products);
      }

      products.products.map((product) => {
        if (product.istranding) {
          setTrandingProd((prev) => {
            return [...prev, product];
          });
        }
      });
    });
    setLoading(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
        {!isLogin ? (
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
              <img src="/assets/MASK.svg" alt="mask" className="md:w-5/6" />
            </div>
          </div>
        ) : (
          <div>
            {loading ? (
              <Box padding="6" boxShadow="lg" bg="white">
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
            ) : (
              <div>
                <div className="w-11/12 m-auto mt-8">
                  <h1 className="font-semibold text-4xl capitalize">{`Welcome, ${fullName.fullName}!`}</h1>
                </div>
                <div className="py-10 m-auto w-11/12">
                  <img src="/assets/Line 18.svg" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        ) : (
          <div className="px-7 mt-6 mr-8 flex flex-col gap-10 w-11/12 m-auto">
            <ProductCatagories
              prod_catag_title="Trending @USC"
              trendingProducts={trandingProd}
            />
            <ProductCatagories
              prod_catag_title="Mens Shoes"
              trendingProducts={mensShoesProd}
            />
            <ProductCatagories
              prod_catag_title="Technology"
              trendingProducts={technologyProd}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
