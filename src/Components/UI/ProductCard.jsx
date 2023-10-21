import React, { useState } from "react";
import { useGlobalCotext } from "../../Context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

const ProductCard = (props) => {
  const {
    isLogin,
    trandingProd,
    allProducts,
    setAllProducts,
    setTrandingProd,
    likedProducts,
    setLikedProducts,
    showLoginPopup,
  } = useGlobalCotext();
  const [likeFlag, setLikeFlag] = useState(0);
  // const id = JSON.parse(localStorage.getItem("user"))._id;
  const navigate = useNavigate();

  const handleLikedButton = async (id) => {
    if (likeFlag === 0) {
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
        const favProd = res.data.favourite;
        const likedprodid = res.data?.favourite?.productid;

        if (props.catagory === "Trending @USC") {
          const updateprod = trandingProd.map((prod) => {
            if (prod._id === likedprodid) {
              prod.favourite.push(favProd);
            }
            return prod;
          });
          setTrandingProd(updateprod);
        } else {
          let updateProducts = JSON.parse(JSON.stringify(allProducts));
          updateProducts = updateProducts.map((cat) => {
            if (cat.title === props.catagory) {
              cat?.products?.map((prod) => {
                if (prod._id === likedprodid) {
                  prod.favourite.push(favProd);
                }
                return prod;
              });
            }
            return cat;
          });

          setAllProducts(updateProducts);
        }

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
        await axios.patch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/product/updatelikedvalue/${id}`
        );
      } catch (error) {
        console.error("Error:", error);
      }
      setLikeFlag(1);
    } else {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/favourite/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        }
      );
      if (res.status === 200) {
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
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/product/decreaselikedvalue/${id}`
      );
      setLikeFlag(0);
    }
  };

  const handleRemoveLiked = async (id) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/favourite/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      }
    );
    const likedprodid = res.data?.deleteFavProd?.productid;
    if (props.catagory === "Trending @USC") {
      const updateprod = trandingProd.map((prod) => {
        if (prod._id === likedprodid) {
          prod.favourite.splice(0);
        }
        return prod;
      });
      setTrandingProd(updateprod);
    } else {
      let updateProducts = JSON.parse(JSON.stringify(allProducts));
      updateProducts = updateProducts.map((cat) => {
        if (cat.title === props.catagory) {
          cat?.products?.map((prod) => {
            if (prod._id === likedprodid) {
              prod.favourite.splice(0);
            }
            return prod;
          });
        }
        return cat;
      });

      setAllProducts(updateProducts);
    }

    const likedProdArr = likedProducts.filter(
      (prod) => prod.productid !== likedprodid
    );
    setLikedProducts(likedProdArr);
    if (res.status === 200) {
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

  const handleProductClick = (id) => {
    navigate(`/productpage/${id}`);
  };

  return (
    <article style={{ width: "fit-content ", marginBottom: "10px" }}>
      <div className="relative">
        {isLogin && props?.favourite[0]?.isliked ? (
          <button
            className="absolute top-0 right-1 p-1 rounded-full"
            onClick={() => handleRemoveLiked(props.id)}
          >
            <AiFillHeart fill="red" className="mt-1" size={25} />
          </button>
        ) : (
          <div>
            {isLogin ? (
              <button
                className="absolute md:top-0 top-0 right-1  p-1 rounded-full"
                onClick={() => handleLikedButton(props.id)}
              >
                <AiFillHeart fill="#d0d0d0" className="mt-1" size={25} />
              </button>
            ) : (
              <button
                className="absolute top-0 right-1 p-1 rounded-full"
                onClick={() => showLoginPopup()}
              >
                <AiFillHeart fill="#d0d0d0" className="mt-1" size={25} />
              </button>
            )}
          </div>
        )}
        <div
          className="cursor-pointer"
          onClick={() => handleProductClick(props.id)}
        >
          <img
            src={
              props.image
                ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/${props.image}`
                : "/assets/no-photo2.jpg"
            }
            alt="no-image"
            className="md:w-52  w-full md:h-52 rounded-2xl md:object-cover"
          />
          <div>
            <span className="text-xs text-[#737373] font-normal">
              {props.upload_time}
            </span>
            <div className="flex align-middle justify-between">
              <p className="md:text-base text-xs font-semibold text-black">
                {props.title}
              </p>
              <p className="md:text-base text-xs font-semibold text-black">
                ${props.price}
              </p>
            </div>
            <span className="md:text-base text-xs text-[#C0C0C0] font-normal">
              {props.spec}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
