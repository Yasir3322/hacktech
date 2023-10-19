import React, { useEffect, useState } from "react";
import ProductCard from "../UI/ProductCard";
import MultiCarasoule from "../UI/MultiCarasoule";
import { useGlobalCotext } from "../../Context/Context";

const ProductCatagories = (props) => {
  const { allProducts, trandingProd, setTrandingProd } = useGlobalCotext();

  useEffect(() => {
    const temptrendProd = [];
    allProducts?.map((products) => {
      products.products.map((product) => {
        if (product.istranding) {
          temptrendProd.push(product);
        }
      });
    });
    setTrandingProd(temptrendProd);
  }, [allProducts]);

  console.log(trandingProd);
  return (
    <div>
      {trandingProd.length > 0 ? (
        <div>
          <h4 className="text-2xl font-semibold text-black capitalize">
            Trending @USC
          </h4>
          <MultiCarasoule
            products={trandingProd}
            catagorytitle="Trending @USC"
          />
        </div>
      ) : (
        ""
      )}
      {allProducts.map((categories) => {
        if (categories.products.length > 0) {
          return (
            <div>
              <h4 className="text-2xl font-semibold text-black capitalize">
                {categories.title}
              </h4>
              <MultiCarasoule
                products={categories.products}
                catagorytitle={categories.title}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default ProductCatagories;
