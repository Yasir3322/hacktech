import React, { useEffect, useState } from "react";
import ProductCatagories from "../../Components/ProductCatagories/ProductCatagories";
import Footer from "../../Components/Footer/Footer";
import { useGlobalCotext } from "../../Context/Context";
import axios from "axios";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import Pusher from "pusher-js";
import { toast } from "react-toastify";
import ProductCard from "../../Components/UI/ProductCard";

const LandingPage = () => {
  const {
    isLogin,
    setIsSoldPopupOpen,
    selectedCatagory,
    setSelectedCatagory,
    allSearchProducts,
    allProducts,
    setAllProducts,
    // trandingProd,
    // setTrandingProd,
    showCreateAccountPopup,
  } = useGlobalCotext();

  const [trandingProd, setTrandingProd] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState();
  const [reserveProducts, setReserveProducts] = useState([]);
  const [fullName, setFullName] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const connectWithPusher = () => {
    const pusher = new Pusher("1904b460da23661d8163", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("hacktech");
    channel.bind("update-productreq", function (data) {
      const { buyerid } = data;
      const id = JSON.parse(localStorage.getItem("user"))._id;
      if (id === buyerid) {
        setIsSoldPopupOpen(true);
      }
    });
  };

  useEffect(() => {
    connectWithPusher();
  }, []);

  const getAllProducts = async () => {
    setLoading(!loading);
    var res;
    if (isLogin) {
      const id = JSON.parse(localStorage.getItem("user"))._id;
      res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/allproducts`,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            userid: id,
          },
        }
      );
    } else {
      res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/allproducts`
      );
    }
    setAllProducts(res?.data?.allProducts);
    setReserveProducts(res?.data?.allProducts);
    setLoading(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getProducts = async () => {
    setLoading(!loading);
    var res;
    if (isLogin) {
      const id = JSON.parse(localStorage.getItem("user"))._id;
      res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/allproducts`,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            userid: id,
          },
        }
      );
    } else {
      res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/allproducts`
      );
    }
    setAllProducts(res?.data?.allProducts);
    setReserveProducts(res?.data?.allProducts);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedCatagory === "all") {
      getProducts();
    } else {
      const filterCatagory = reserveProducts.filter(
        (products) => products.title === selectedCatagory
      );
      setAllProducts(filterCatagory);
    }
  }, [selectedCatagory]);

  useEffect(() => {
    setAllProducts(allSearchProducts);
  }, [allSearchProducts]);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkScreenSize(); // Check the initial screen size
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="">
      <div>
        {!isLogin ? (
          <div className="relative">
            <div className="absolute md:left-44 md:top-8 left-5 top-3">
              <h1 className="md:text-2xl text-xl md:w-auto w-40 md:ml-0 ml-4  font-bold text-white">
                Sign up with your college campus!
              </h1>
            </div>
            <button
              onClick={() => showCreateAccountPopup()}
              className="absolute md:w-28 text-xs md:h-12 w-16 h-5  rounded-full md:right-36 right-8 md:mr-16 bg-white text-[#B77EFF] md:bottom-5 bottom-2"
            >
              Sign up
            </button>
            <div className="md:mt-10 mt-5 md:px-0 px-4 flex align-middle justify-center">
              <img
                src={isMobile ? "/assets/MASK-mobile.svg" : "/assets/MASK.svg"}
                alt="mask"
                className="md:w-5/6"
              />
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
                  <h1 className="font-semibold md:text-4xl text-2xl capitalize">{`Welcome, ${fullName.fullName}!`}</h1>
                </div>
                <div className="pt-10 md:pb-10 m-auto w-11/12">
                  <img src="/assets/Line 18.svg" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <div>
          {loading ? (
            <Box padding="6" boxShadow="lg" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
          ) : (
            <div className="pl-6 mt-6 mr-8 flex flex-col gap-10 w-11/12 m-auto mb-44">
              {/* <div>
                {selectedCatagory === null ? (
                  <ProductCatagories
                    prod_catag_title="Trending @USC"
                    trendingProducts={trandingProd}
                  />
                ) : (
                  ""
                )}
              </div>
              <div>
                {allProducts.map((products) => {
                  if (products?.products?.length > 0) {
                    return (
                      <ProductCatagories
                        prod_catag_title={products.title}
                        trendingProducts={products.products}
                      />
                    );
                  }
                })}
              </div> */}
              <div className="md:h-auto h-screen">
                <ProductCatagories />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
