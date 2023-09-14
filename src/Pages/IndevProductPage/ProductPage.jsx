import React, { useState, useEffect } from "react";
import { Carasoule } from "../../Components/Carasoule";
import SellerCard from "../../Components/MeetTheSeller/SellerCard";
import SellerReview from "../../Components/SellerReview/SellerReview";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductPage = () => {
  const [wantProd, setWantProd] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [productReqStatus, setProductReqStatus] = useState(0);

  const getProduct = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/singleproduct/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      }
    );
    setProduct(res?.data?.product);
  };

  console.log(product);

  useEffect(() => {
    getProduct();
  }, []);

  function formatRelativeTime(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const timeDifferenceInSeconds = Math.floor((now - date) / 1000);

    if (timeDifferenceInSeconds < 60) {
      return timeDifferenceInSeconds === 1
        ? "1 sec ago"
        : `${timeDifferenceInSeconds} secs ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return minutes === 1 ? "1 min ago" : `${minutes} mins ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return days === 1 ? "1 day ago" : `${days} days ago`;
    }
  }

  if (Object.keys(product).length) {
    var tags = JSON.parse(product?.hashtags);
    var images = [];

    const imageslength = product?.images?.length;
    for (let a = 0; a <= 4; a++) {
      if (a < imageslength) {
        images.push(product?.images[a]);
      } else {
        images.push("/assets/no-photo.jpg");
      }
    }

    var uploadTime = formatRelativeTime(product?.createdAt);
  }

  const handleLikedButton = async (id) => {
    const token = localStorage.getItem("hacktechtoken");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/favourite/favouriteproduct`,
        { productid: id },
        {
          headers: {
            token: token,
            "ngrok-skip-browser-warning": true,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Added to Your Liked Items", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem("hacktechtoken");
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/cart/createcart`,
      { productid: id },
      {
        headers: {
          token: token,
          "ngrok-skip-browser-warning": true,
        },
      }
    );
    if (res.status === 200) {
      toast.success("Added to Cart Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSendReq = async (value, productid) => {
    const token = localStorage.getItem("hacktechtoken");
    const data = {
      buyercomment: value,
      prodid: productid,
    };
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/productrequest`,
      data,
      {
        headers: {
          token: token,
        },
      }
    );
    setProductReqStatus(res.status);
  };

  return (
    <div>
      {Object.keys(product).length ? (
        <div className="w-4/5 m-auto">
          <div className="flex gap-3">
            <div className="w-62 mt-7 flex flex-col gap-3 justify-between h-96">
              {images.map((image) => {
                return (
                  <img
                    src={image}
                    width={70}
                    height={70}
                    className="shadow-sm"
                  />
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-32 mt-7">
              <div>
                <Carasoule images={product.images} />
              </div>
              <div className="h-auto">
                <div>
                  <h2 className="font-semibold text-3xl w-80">
                    {product.title}
                  </h2>
                  <div className="mt-3">
                    <span className="font-semibold text-md text-[#DB3B39]">
                      {tags[0]}
                    </span>
                    <p className="text-lg font-semibold">${product.price}</p>
                  </div>
                  <div>
                    {productReqStatus === 200 ? (
                      <div className="py-8">
                        <div className="flex flex-col align-middle justify-center items-center">
                          <img src="/assets/tick.svg" width={50} height={50} />
                          <p className="text-base font-bold">Request Send!</p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-5">
                        {!wantProd ? (
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              className="bg-[#F2F2F2] rounded-sm p-1"
                              onClick={() => handleAddToCart(id)}
                            >
                              Add
                            </button>
                            <button
                              className="bg-[#DB3B39] rounded-sm text-white p-1"
                              onClick={() => setWantProd(!wantProd)}
                            >
                              I Want this!
                            </button>
                          </div>
                        ) : (
                          <div>
                            <textarea
                              className="border w-full h-20 bg-[#F2F2F2] px-2"
                              placeholder="make an offer!"
                              value={textareaValue}
                              style={{ resize: "none" }}
                            />
                            <div>
                              <span
                                onClick={() =>
                                  setTextareaValue(
                                    "I’m interested in this item."
                                  )
                                }
                                className={`${
                                  textareaValue ===
                                  "I’m interested in this item."
                                    ? "bg-[#DB3B39] text-white cursor-pointer text-xs font-medium mr-2 px-2.5 py-2 rounded-full"
                                    : "bg-[#F2F2F2] cursor-pointer text-gray-800 text-xs font-medium mr-2 px-2.5 py-2 rounded-full"
                                }`}
                              >
                                I’m interested in this item.
                              </span>
                              <span
                                onClick={() =>
                                  setTextareaValue(
                                    "What condition is this item in?"
                                  )
                                }
                                className={`${
                                  textareaValue ===
                                  "What condition is this item in?"
                                    ? "bg-[#DB3B39] text-white cursor-pointer text-xs font-medium mr-2 px-2.5 py-2 rounded-full"
                                    : "bg-[#F2F2F2] cursor-pointer text-gray-800 text-xs font-medium mr-2 px-2.5 py-2 rounded-full"
                                }`}
                              >
                                What condition is this item in?
                              </span>
                            </div>
                            <button
                              className="bg-[#DB3B39] text-white w-full mt-4 rounded-sm p-1"
                              onClick={() => handleSendReq(textareaValue, id)}
                            >
                              Send
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    <h5 className="font-semibold text-base py-2">Overview</h5>
                    <div className="grid grid-flow-col grid-cols-2">
                      <div className="flex  flex-col">
                        <p>Condition</p>
                        <p>Brand</p>
                        <p>Catagory</p>
                        <p>Tags</p>
                      </div>
                      <div className="flex  flex-col">
                        <p className="text-[#222222]">{product.condition}</p>
                        <p className="text-[#222222]">{tags[0]}</p>
                        <p className="text-[#222222]">{product.catagory}</p>
                        <p className="text-[#222222] flex">
                          {tags.map((tag) => {
                            return (
                              <p className="text-[#222222]">{tag} &nbsp;</p>
                            );
                          })}
                        </p>
                      </div>
                      <div className="flex w-full"></div>
                      <div className="flex w-full"></div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-base py-2 ">Details</h5>
                    <div className="flex flex-col">
                      <div>
                        <p>{product.description}</p>
                      </div>
                      <div className="grid grid-flow-col grid-cols-2">
                        <div className="flex  flex-col">
                          <p>Posted</p>
                        </div>
                        <div className="flex  flex-col">
                          <p>{uploadTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 ml-12 mt-8">
            <button>
              <img src="/assets/share-span.svg" />
            </button>
            <button onClick={() => handleLikedButton(id)}>
              <img src="/assets/like-button.svg" />
            </button>
          </div>
          <div className="mt-4">
            <SellerCard />
          </div>
          <div>
            <SellerReview />
          </div>
        </div>
      ) : (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      )}
    </div>
  );
};

export default ProductPage;
