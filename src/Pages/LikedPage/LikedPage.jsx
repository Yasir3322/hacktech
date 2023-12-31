import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import ProductCard from "../../Components/UI/ProductCard";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalCotext } from "../../Context/Context";

export const LikedPage = () => {
  const { likedProducts, setLikedProducts } = useGlobalCotext();

  const getLikedProducts = async () => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/favourite/${userid}`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      }
    );
    setLikedProducts(res.data.favouriteProducts);
    console.log(res.data.favouriteProducts);
  };

  const getInstockProducts = async () => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/favourite/${userid}`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      }
    );

    console.log(res.data.favouriteProducts);
    const { products } = res.data.favouriteProducts[0];
    console.log(products);
    products.map(async (product) => {
      if (!product.instock) {
        toast("Your favourite item has sold");
        await axios.post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/notification/createnotification`,
          {
            title: "Your favorite item has sold",
            url: "/likedproduct",
            notificationto: "64fffd805bd23133cda10641",
          }
        );
      }
    });

    // const { instock } = res.data.favouriteProducts.products[0];
    // if (!instock) {
    //   toast("Your favourite item has sold");
    //   await axios.post(
    //     `${
    //       import.meta.env.VITE_BACKEND_URL
    //     }/api/notification/createnotification`,
    //     {
    //       title: "Your favorite item has sold",
    //       url: "/likedproduct",
    //       notificationto: "64fffd805bd23133cda10641",
    //     }
    //   );
    // }
  };

  useEffect(() => {
    getLikedProducts();
  }, []);

  useEffect(() => {
    getInstockProducts();
  }, []);

  const likedItems = [
    {
      image: "/assets/shoe5.svg",
      upload_time: "1 day ago",
      title: "Nike Dunks",
      price: "$65",
      spec: "Size 9",
      isliked: true,
    },
    {
      image: "/assets/shoe3.svg",
      upload_time: "1 day ago",
      title: "Nike Jordans",
      price: "$68",
      spec: "Size 12",
      isliked: true,
    },
    {
      image: "/assets/shoe6.svg",
      upload_time: "1 day ago",
      title: "New Balance 550's",
      price: "$155",
      spec: "Size 9.5",
      isliked: true,
    },
    {
      image: "/assets/shoe4.svg",
      upload_time: "1 day ago",
      title: "New Balance 2002R",
      price: "$105",
      spec: "Size 13",
      isliked: true,
    },
  ];

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
    <div className="md:mb-44 mb-32">
      <div>
        <h1 className="md:ml-40 ml-12 md:text-4xl text-xl font-semibold mt-5">
          your liked items
        </h1>
        <div className="py-10 m-auto w-3/4">
          <img src="/assets/Line 18.svg" />
        </div>
        <div className="w-3/4 m-auto  md:grid md:grid-cols-4 flex flex-wrap gap-7 align-middle justify-between mt-4 pb-32">
          {likedProducts?.map((item) => {
            const {
              images,
              createdAt,
              title,
              price,
              description,
              _id,
              favourite,
            } = item?.products[0];
            const image = images[0];
            const { isliked } = item;
            const upload_time = formatRelativeTime(createdAt);
            return (
              <ProductCard
                image={image}
                upload_time={upload_time}
                title={title}
                price={price}
                spec={description}
                isliked={isliked}
                id={_id}
                favourite={favourite}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
