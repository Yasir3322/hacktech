import React from "react";
import ProductCard from "../UI/ProductCard";
import MultiCarasoule from "../UI/MultiCarasoule";

const ProductCatagories = (props) => {
  return (
    <div>
      <h4 className="text-2xl font-semibold text-black">
        {props.prod_catag_title}
      </h4>
      <MultiCarasoule products={props.trendingProducts} />
    </div>
  );
};

export default ProductCatagories;
