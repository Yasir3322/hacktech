import React from "react";
import Carousel from "react-multi-carousel";
import ProductCard from "./ProductCard";
import "react-multi-carousel/lib/styles.css";
import { CustomLeftArrow, CustomRightArrow } from "./CustomArrow";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    paritialVisibilityGutter: 30,
  },
};

const MultiCarasoule = (props) => {
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
    <div className="relative mt-3">
      <Carousel
        ssr
        partialVisbile
        className=""
        // deviceType={deviceType}
        arrows={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        arr
        itemClass="image-item ml-10 mr-5"
        responsive={responsive}
        infinite
        autoPlaySpeed={2000}
        autoPlay={false}
      >
        {props.products?.map((product) => {
          const { images, createdAt, title, price, description, _id } = product;
          // console.log(product);
          const image = images[0];
          const upload_time = formatRelativeTime(createdAt);
          return (
            <ProductCard
              image={image}
              upload_time={upload_time}
              title={title}
              price={price}
              spec={description}
              id={_id}
            />
          );
        })}
      </Carousel>
    </div>
  );
};

export default MultiCarasoule;
