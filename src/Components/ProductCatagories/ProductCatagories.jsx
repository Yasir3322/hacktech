import React from "react";
import ProductCard from "../UI/ProductCard";

const ProductCatagories = (props) => {
  return (
    <div>
      <h4 className="text-2xl font-semibold text-black">
        {props.prod_catag_title}
      </h4>
      <div className="md:flex md:flex-nowrap flex flex-wrap gap-7 align-middle justify-between mt-4">
        {props.trendingProducts.map((product) => {
          const { image, upload_time, title, price, spec } = product;
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
  );
};

export default ProductCatagories;
