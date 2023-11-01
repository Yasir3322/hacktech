import React, { useEffect, useState } from "react";
import ProductCard from "../UI/ProductCard";
import MultiCarasoule from "../UI/MultiCarasoule";
import { useGlobalCotext } from "../../Context/Context";

const ProductCatagories = (props) => {
  const { allProducts, trandingProd, setTrandingProd, selectedCatagory } =
    useGlobalCotext();

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

  return (
    <div className="pb-28">
      {trandingProd.length > 0 && selectedCatagory === "all" ? (
        <div>
          <h4 className="md:text-2xl text-lg font-semibold text-black capitalize">
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
            <div key={categories._id}>
              <h4 className="md:text-2xl text-lg font-semibold text-black capitalize">
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
      <div>
        {trandingProd?.length === 0 &&
        allProducts[0]?.products?.length === 0 ? (
          <div>No product to show</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductCatagories;
