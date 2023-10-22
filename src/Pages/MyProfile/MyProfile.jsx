import React, { useEffect, useState } from "react";
import UserDetail from "../../Components/UserDetail";
import axios from "axios";
import UserListing from "../../Components/UI/UserListing";
import { useGlobalCotext } from "../../Context/Context";
import { useParams } from "react-router-dom";

const MyProfile = () => {
  const [userListing, setUserListing] = useState([]);
  const [userListingLength, setUserListingLength] = useState(0);
  const [totalUserSale, setTotalUserSale] = useState(0);
  const [userAvgRating, setUserAvgRating] = useState();
  const [totalReviews, setTotalReview] = useState();
  const { userimage, setProfileImage, isLogin } = useGlobalCotext();
  const [userName, setUserName] = useState("");
  const { id } = useParams();

  if (isLogin) {
    var localstorageid = JSON.parse(localStorage.getItem("user"))._id;
  }

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
    setUserListing(res.data.products);
    setUserListingLength(res.data.totalProductCount);
  };

  useEffect(() => {
    getUserListing();
  }, [id]);

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

  useEffect(() => {
    setProfileImage();
  }, [id]);

  const getUserDetail = async () => {
    // const id = JSON.parse(localStorage.getItem("user"))._id;
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/review/getuserreviews/${id}`
    );
    const { allreviews } = res.data.reviews[0];
    const totalrating = allreviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const totallength = res.data.reviews[0].allreviews.length;
    const avgrating = totalrating / totallength;
    setUserAvgRating(avgrating);
    setTotalReview(totallength);
    const { fullName } = res.data.reviews[0];
    setUserName(fullName);
  };

  useEffect(() => {
    getUserDetail();
  }, [id]);

  return (
    <div>
      <UserDetail
        image={userimage}
        setProfileImage={setProfileImage}
        userListingLength={userListingLength}
        totalUserSale={totalUserSale}
        userAvgRating={userAvgRating}
        totalReviews={totalReviews}
        fullName={userName}
      />
      <div className="w-full flex align-middle justify-center">
        <button className="w-3/4 h-14 bg-[#DB3B39] text-white mt-16 rounded-3xl text-2xl font-semibold">
          {`${id === localstorageid ? "My Listing" : `${userName} Listing`}`}
        </button>
      </div>
      <div className="mt-10 m-auto w-3/4">
        <img src="/assets/Line 18.svg" />
      </div>
      <div className="w-3/4 m-auto  md:grid md:grid-cols-4 flex flex-wrap gap-7 align-middle justify-between mt-4">
        {userListing.map((listing) => {
          const { images, createdAt, title, price, description, _id } = listing;
          const image = images[0];
          const upload_time = formatRelativeTime(createdAt);
          return (
            <UserListing
              image={image}
              upload_time={upload_time}
              title={title}
              price={price}
              spec={description}
              id={_id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyProfile;
