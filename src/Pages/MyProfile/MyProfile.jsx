import React, { useEffect, useState } from "react";
import UserDetail from "../../Components/UserDetail";
import axios from "axios";
import UserListing from "../../Components/UI/UserListing";

const MyProfile = () => {
  const [userListing, setUserListing] = useState([]);

  const getUserListing = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/product/64f0baedc6d368f282262e29"
    );
    setUserListing(res.data.products);
  };

  useEffect(() => {
    getUserListing();
  }, []);

  // const mensShoes = [
  //   {
  //     image: "/assets/shoe5.svg",
  //     upload_time: "1 day ago",
  //     title: "Nike Dunks",
  //     price: "$65",
  //     spec: "Size 9",
  //   },
  //   {
  //     image: "/assets/shoe3.svg",
  //     upload_time: "1 day ago",
  //     title: "Nike Jordans",
  //     price: "$68",
  //     spec: "Size 12",
  //   },
  //   {
  //     image: "/assets/shoe6.svg",
  //     upload_time: "1 day ago",
  //     title: "New Balance 550's",
  //     price: "$155",
  //     spec: "Size 9.5",
  //   },
  //   {
  //     image: "/assets/shoe4.svg",
  //     upload_time: "1 day ago",
  //     title: "New Balance 2002R",
  //     price: "$105",
  //     spec: "Size 13",
  //   },
  //   {
  //     image: "/assets/iphone.svg",
  //     upload_time: "1 day ago",
  //     title: "ipad Air",
  //     price: "$600",
  //     spec: "128gb",
  //   },
  //   {
  //     image: "/assets/clock.svg",
  //     upload_time: "1 day ago",
  //     title: "Samsung Galaxy Watch",
  //     price: "$155",
  //     spec: "2022",
  //   },
  //   {
  //     image: "/assets/headphone.svg",
  //     upload_time: "1 day ago",
  //     title: "Sony Headphones",
  //     price: "$210",
  //     spec: "WH-10000XM4",
  //   },
  //   {
  //     image: "/assets/charger.svg",
  //     upload_time: "1 day ago",
  //     title: "Wireless Charger",
  //     price: "$10",
  //     spec: "Anker",
  //   },
  // ];

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
