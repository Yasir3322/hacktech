import React, { useState } from "react";
import { Carasoule } from "../../Components/Carasoule";
import SellerCard from "../../Components/MeetTheSeller/SellerCard";
import SellerReview from "../../Components/SellerReview/SellerReview";
import Footer from "../../Components/Footer/Footer";

const ProductPage = () => {
  const [wantProd, setWantProd] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  return (
    <>
      <div className="flex gap-3">
        <div className="w-62 mt-7 flex flex-col gap-3 justify-between h-96">
          <img src="/assets/shoe1.svg" />
          <img src="/assets/shoe2.svg" />
          <img src="/assets/shoe3.svg" />
          <img src="/assets/shoe4.svg" />
          <img src="/assets/shoe5.svg" />
        </div>
        <div className="grid grid-cols-2 gap-8 mt-7">
          <div>
            <Carasoule />
          </div>
          <div className="h-auto">
            <div>
              <h2 className="font-semibold text-3xl w-80">
                Nike Air Max Pinny Size 9.5
              </h2>
              <span className="font-semibold text-md text-[#DB3B39]">Nike</span>
              <p className="text-lg font-semibold">$125</p>
              <div>
                {!wantProd ? (
                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-[#F2F2F2] rounded-sm p-1">Add</button>
                    <button
                      className="bg-[#DB3B39] rounded-sm text-white p-1"
                      onClick={() => setWantProd(!wantProd)}
                    >
                      I Want this!
                    </button>
                  </div>
                ) : (
                  <div>
                    <textarea
                      className="border w-full h-20 bg-[#F2F2F2] px-2"
                      placeholder="make an offer!"
                      value={textareaValue}
                      style={{ resize: "none" }}
                    />
                    <div>
                      <span
                        onClick={() =>
                          setTextareaValue("I’m interested in this item.")
                        }
                        className={`${
                          textareaValue === "I’m interested in this item."
                            ? "bg-[#DB3B39] text-white cursor-pointer text-xs font-medium mr-2 px-2.5 py-2 rounded-full"
                            : "bg-[#F2F2F2] cursor-pointer text-gray-800 text-xs font-medium mr-2 px-2.5 py-2 rounded-full"
                        }`}
                      >
                        I’m interested in this item.
                      </span>
                      <span
                        onClick={() =>
                          setTextareaValue("What condition is this item in?")
                        }
                        className={`${
                          textareaValue === "What condition is this item in?"
                            ? "bg-[#DB3B39] text-white cursor-pointer text-xs font-medium mr-2 px-2.5 py-2 rounded-full"
                            : "bg-[#F2F2F2] cursor-pointer text-gray-800 text-xs font-medium mr-2 px-2.5 py-2 rounded-full"
                        }`}
                      >
                        What condition is this item in?
                      </span>
                    </div>
                    <button className="bg-[#DB3B39] text-white w-full mt-4 rounded-sm p-1">
                      Send
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div>
                <h5 className="font-semibold text-base">Overview</h5>
                <table>
                  <tr>
                    <td>Condition</td>
                    <td className="text-[#222222]">New</td>
                  </tr>
                  <tr>
                    <td>Brand</td>
                    <td className="text-[#222222]">Nike</td>
                  </tr>
                  <tr>
                    <td>Catagory</td>
                    <td className="text-[#222222]">
                      Men Shoes Athletic Shoes for Men
                    </td>
                  </tr>
                  <tr>
                    <td>Tags</td>
                    <td className="text-[#222222]">#nike</td>
                    <td className="text-[#222222]">#airmax</td>
                    <td className="text-[#222222]">#penny</td>
                  </tr>
                </table>
              </div>
              <div>
                <h5 className="font-semibold text-base">Details</h5>
                <table>
                  <tr>
                    <td>Size</td>
                    <td>9.5 (42.5)</td>
                  </tr>
                  <tr>
                    <td>Posted</td>
                    <td>03/05/23</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 ml-12 mt-2">
        <button>
          <img src="/assets/share-span.svg" />
        </button>
        <button>
          <img src="/assets/like-button.svg" />
        </button>
      </div>
      <div className="mt-4">
        <SellerCard />
      </div>
      <div>
        <SellerReview />
      </div>
    </>
  );
};

export default ProductPage;
