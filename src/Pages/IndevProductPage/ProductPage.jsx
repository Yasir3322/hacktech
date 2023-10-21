import React, { useState, useEffect } from "react";
import { Carasoule } from "../../Components/Carasoule";
import SellerCard from "../../Components/MeetTheSeller/SellerCard";
import SellerReview from "../../Components/SellerReview/SellerReview";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useGlobalCotext } from "../../Context/Context";
import { AiFillHeart } from "react-icons/ai";

const ProductPage = ({ socket }) => {
  const [wantProd, setWantProd] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [product, setProduct] = useState({});
  const [productReqStatus, setProductReqStatus] = useState(0);
  const [userDetail, setUserDetail] = useState([
    {
      _id: "",
      fullName: "",
      email: "",
      type: "",
      password: "",
      image: "",
    },
  ]);

  const [userReviews, setUserReviews] = useState([]);
  const [userAvgRating, setUserAvgRating] = useState();
  const [totalReviews, setTotalReview] = useState();
  const [userListingLength, setUserListingLength] = useState(0);
  const [totalUserSale, setTotalUserSale] = useState(0);
  const [productInStock, setProductInStock] = useState();
  const [totalProductLiked, setTotalProductLiked] = useState();

  const { isLogin, showLoginPopup } = useGlobalCotext();

  const { id } = useParams();
  const getProduct = async () => {
    let res;
    if (isLogin) {
      res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/singleproduct/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            userid: JSON.parse(localStorage.getItem("user"))._id,
          },
        }
      );
    } else {
      res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/singleproduct/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        }
      );
    }
    console.log(res);
    setTotalProductLiked(res?.data?.product[0].totalliked);
    const instock = res?.data?.product[0].instock;
    // console.log(instock);
    setProductInStock(instock);
    setProduct(res?.data?.product[0]);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const getUserDetail = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/getuserdetail/${id}`
    );
    setUserDetail(res.data.userProductDetail[0].seller);
    setUserReviews(res.data.userProductDetail[0].reviews);
    const totalrating = res.data.userProductDetail[0].reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    // console.log(totalrating);
    const totallength = res.data.userProductDetail[0].reviews.length;
    // console.log(totallength);
    const avgrating = totalrating / totallength;
    setUserAvgRating(avgrating);
    setTotalReview(totallength);
  };

  console.log(userDetail);

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserListing = async () => {
    // const id = JSON.parse(localStorage.getItem("user"))._id;
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`
    );
    const totalsold = res.data.products.reduce(
      (total, product) => total + product.sold,
      0
    );
    setTotalUserSale(totalsold);
    setUserListingLength(res.data.totalProductCount);
  };

  useEffect(() => {
    getUserListing();
  }, []);

  // console.log(product);

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
        images.push(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/${product?.images[a]}`
        );
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
      console.log(res);
      if (res.status === 200) {
        setProduct((prev) => {
          return { ...prev, favourite: [res.data.favourite] };
        });
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
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/updatelikedvalue/${id}`
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUnLikedButton = async (id) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/favourite/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      }
    );
    if (res.status === 200) {
      setProduct((prev) => {
        return { ...prev, favourite: [] };
      });
      toast.success("Removed successfully", {
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
    await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/decreaselikedvalue/${id}`
    );
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

  const handleSendReq = async (value, productid, to, name, socketid) => {
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

    const messagto = {
      id: JSON.parse(localStorage.getItem("user"))._id,
      to: userDetail[0]._id,
      name: JSON.parse(localStorage.getItem("user")).fullName,
      socketID: socket.id,
      text: value,
      status: "delivered",
    };

    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/message/newmessage`,
      messagto
    );

    setProductReqStatus(res.status);
  };

  const handleShareClick = () => {
    console.log("called");
    const url = window.location.href;
    window.navigator.clipboard.writeText(url);
    if (url) {
      toast.info("Sharpie link has been copied", {
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

  const handleTextAreaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  console.log(userReviews);

  return (
    <div>
      {Object.keys(product).length ? (
        <div className="w-4/5 m-auto">
          <div className="md:flex md:flex-row flex flex-col gap-3">
            <div className="md:w-20 w-12 ml-3 mt-7 md:flex md:flex-col flex flex-row gap-3 justify-between md:h-96">
              {images.map((image) => {
                return (
                  <img
                    src={image}
                    width={70}
                    height={70}
                    className="shadow-sm cursor-pointer"
                  />
                );
              })}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-32 mt-7 flex flex-col">
              <div>
                <Carasoule
                  images={product.images}
                  totalProductLiked={totalProductLiked}
                />
              </div>
              <div className=" gap-4 ml-12 mt-8 md:hidden flex">
                <button onClick={handleShareClick}>
                  <img src="/assets/share-span.svg" />
                </button>
                <div>
                  {product.favourite[0]?.isliked ? (
                    <button
                      className="border-2 border-black rounded-md py-2 px-4 flex gap-3"
                      onClick={() => handleUnLikedButton(id)}
                    >
                      <AiFillHeart fill="red" className="mt-1" size={25} />
                      <span className="font-semibold md:text-lg text-sm text-[#DB3B39]">
                        Unlike this item
                      </span>
                    </button>
                  ) : (
                    <button
                      className="border-2 border-[#B77EFF] rounded-md md:py-2 py-1 px-1 md:px-4 flex gap-3"
                      onClick={() => handleLikedButton(id)}
                    >
                      <img
                        src="/assets/not-like.svg"
                        alt=""
                        className="mt-0.9"
                      />
                      <span className="font-semibold md:text-lg text-sm text-[#B77EFF]">
                        Like this item
                      </span>
                    </button>
                  )}
                </div>
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
                            {isLogin ? (
                              <button
                                className="bg-[#F2F2F2] rounded-sm p-1"
                                onClick={() => handleAddToCart(id)}
                                disabled={!productInStock}
                              >
                                Add
                              </button>
                            ) : (
                              <button
                                className="bg-[#F2F2F2] rounded-sm p-1"
                                onClick={
                                  isLogin
                                    ? () => handleAddToCart(id)
                                    : () => showLoginPopup()
                                }
                              >
                                Add To Cart
                              </button>
                            )}
                            <button
                              className="bg-[#DB3B39] rounded-sm text-white p-1"
                              onClick={
                                isLogin
                                  ? () => setWantProd(!wantProd)
                                  : () => showLoginPopup()
                              }
                            >
                              I Want this!
                            </button>
                          </div>
                        ) : (
                          <div>
                            <textarea
                              className="border w-full h-20 bg-[#F2F2F2] px-2"
                              placeholder="make an offer!"
                              onChange={handleTextAreaChange}
                              value={textareaValue}
                              style={{ resize: "none" }}
                            />
                            <div className="md:flex md:flex-row flex flex-col gap-2">
                              <span
                                onClick={() =>
                                  setTextareaValue(
                                    "I’m interested in this item."
                                  )
                                }
                                className={`${
                                  textareaValue ===
                                  "I’m interested in this item."
                                    ? "bg-[#DB3B39] text-white  md:ml-0 ml-2 cursor-pointer text-xs font-medium mr-2 px-2.5 py-2 rounded-full"
                                    : "bg-[#F2F2F2] cursor-pointer md:ml-0 ml-2 text-gray-800 text-xs font-medium mr-2 px-2.5 py-2 rounded-full"
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
                                    ? "bg-[#DB3B39] md:ml-0 ml-2 text-white cursor-pointer text-xs font-medium mr-2 px-2.5 py-2 rounded-full"
                                    : "bg-[#F2F2F2] md:ml-0 ml-2 cursor-pointer text-gray-800 text-xs font-medium mr-2 px-2.5 py-2 rounded-full"
                                }`}
                              >
                                What condition is this item in?
                              </span>
                            </div>
                            <button
                              className="bg-[#DB3B39] text-white w-full mt-4 rounded-sm p-1"
                              onClick={() => handleSendReq(textareaValue, id)}
                            >
                              Chat now
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
          <div className="md:flex gap-4 ml-12 mt-8 hidden">
            <button onClick={handleShareClick}>
              <img src="/assets/share-span.svg" />
            </button>
            <div>
              {product.favourite[0]?.isliked ? (
                <button
                  className="border-2 border-black rounded-md py-2 px-4 flex gap-3"
                  onClick={() => handleUnLikedButton(id)}
                >
                  <AiFillHeart fill="red" className="mt-1" size={25} />
                  <span className="font-semibold md:text-lg text-sm text-[#DB3B39]">
                    Unlike this item
                  </span>
                </button>
              ) : (
                <button
                  className="border-2 border-[#B77EFF] rounded-md md:py-2 py-1 px-1 md:px-4 flex gap-3"
                  onClick={
                    isLogin
                      ? () => handleLikedButton(id)
                      : () => showLoginPopup()
                  }
                >
                  <img src="/assets/not-like.svg" alt="" className="mt-0.9" />
                  <span className="font-semibold md:text-lg text-sm text-[#B77EFF]">
                    Like this item
                  </span>
                </button>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <SellerCard
              userAvgRating={userAvgRating}
              totalReviews={totalReviews}
              userDetail={userDetail}
              userListingLength={userListingLength}
              totalUserSale={totalUserSale}
            />
          </div>
          {/* <div><SellerReview userReviews={userReviews} /></div> */}
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
