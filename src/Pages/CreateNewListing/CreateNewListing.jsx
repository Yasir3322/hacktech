import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Footer from "../../Components/Footer/Footer";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useGlobalCotext } from "../../Context/Context";
import { toast } from "react-toastify";

const CreateNewListing = () => {
  const { allCatagories, progress, setProgress } = useGlobalCotext();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    hashtags: "",
    catagory: "",
    isOnline: false,
    condition: "",
    images: [],
  });

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    console.log(fileList);
    setFileList(fileList);
  };

  const handleChange2 = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    setLoading(!loading);
    setProgress(progress + 50);
    e.preventDefault();
    const hashtag = formData.hashtags.split(",");
    const imagefiles = fileList.map((file) => {
      return file.originFileObj;
    });
    setProgress(progress + 30);
    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("description", formData.description);
    formdata.append("price", formData.price);
    formdata.append("quantity", formData.quantity);
    formdata.append("hashtags", JSON.stringify(hashtag));
    formdata.append("catagory", formData.catagory);
    formdata.append("isOnline", formData.isOnline);
    formdata.append("condition", formData.condition);
    setProgress(progress + 20);
    for (const image of imagefiles) {
      formdata.append("images", image);
      setProgress(progress + 10);
    }
    const token = localStorage.getItem("hacktechtoken");
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/createproduct`,
      formdata,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
          "Content-Type": "multipart/form-data",
          token: token,
        },
      }
    );
    setProgress(progress + 100);
    setLoading(false);
  };

  return (
    <div className="w-full 2xl:mb-32">
      <div className="w-11/12 m-auto pt-12 bg-[#f7e7e7] p-9 mt-4 pb-52">
        <div>
          <h1 className="font-semibold md:text-5xl text-3xl">
            Create a new listing
          </h1>
          <p className="font-simibold md:text-2xl text-base">
            Enter the details to create the listing
          </p>
        </div>
        <div className="md:mt-16 mt-6">
          <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
            <div className="md:flex md:flex-row flex flex-col md:gap-36 align-middle justify-between">
              <div className="flex flex-col flex-grow">
                <label className="text-base font-bold">Item name</label>
                <input
                  type="text"
                  className="border bg-white border-[#D0D4D9] w-full px-2"
                  name="title"
                  value={formData.title}
                  onChange={handleChange2}
                />
                <label className="bg-[#000000s] text-base">
                  Click and start typing ↗
                </label>
              </div>
              <div class="border bg-white border-[#215AFF] h-9 mt-3 px-2 flex align-middle justify-between rounded-t-lg w-72 relative">
                <select
                  class="appearance-none bg-transparent capitalize border-none w-full py-2 pr-8 leading-tight focus:outline-none"
                  id="category"
                  name="catagory"
                  value={formData.catagory}
                  onChange={handleChange2}
                >
                  <option value="" disabled selected>
                    EX:Menswear, Vehicles, Jewelry, etc.
                  </option>
                  {allCatagories.map((catagory) => {
                    return (
                      <option value={catagory.title} className="capitalize">
                        {catagory.title}
                      </option>
                    );
                  })}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#215AFF]">
                  <IoIosArrowUp />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-base font-bold">Description</label>
              <input
                type="text"
                className="border border-[#D0D4D9] px-2"
                name="description"
                value={formData.description}
                onChange={handleChange2}
              />
            </div>
            <div className="md:grid md:grid-cols-2 flex flex-col gap-8">
              <div>
                <div className="flex flex-col">
                  <label className="text-base font-bold">Hashtags</label>
                  <input
                    type="text"
                    className="border border-[#D0D4D9] px-2"
                    name="hashtags"
                    value={formData.hashtags}
                    onChange={handleChange2}
                  />
                </div>
                <div class="border bg-white border-[#215AFF] h-9 mt-3 px-2 flex align-middle justify-between rounded-t-lg w-72 relative">
                  <select
                    class="appearance-none bg-transparent border-none w-full py-2 pr-8 leading-tight focus:outline-none"
                    id="category"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange2}
                  >
                    <option selected>Condition</option>
                    <option value="Brand New">Brand New</option>
                    <option value="Old">Used</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#215AFF]">
                    <IoIosArrowUp />
                  </div>
                </div>
                <div className="md:flex md:flex-row flex flex-col mt-3 gap-5">
                  <div className="flex flex-col">
                    <label className="text-base font-bold">Price</label>
                    <input
                      type="number"
                      className="border border-[#D0D4D9] px-2"
                      name="price"
                      value={formData.price}
                      onChange={handleChange2}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-base font-bold">Quantity</label>
                    <input
                      type="number"
                      className="border border-[#D0D4D9] px-2"
                      placeholder="Ex:1,2,3, etc"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange2}
                    />
                  </div>
                </div>
                <div className="flex gap-2 w-72 py-4 border-t border-b bg-white mt-4 border-black">
                  <input
                    type="checkbox"
                    name="isOnline"
                    checked={formData.isOnline}
                    onChange={handleChange2}
                    id="onlineprodbox"
                    className="cursor-pointer"
                  />
                  <label htmlFor="onlineprodbox" className="cursor-pointer">
                    this item can be sold online
                  </label>
                </div>
              </div>
              <div class="md:flex md:flex-row flex flex-col items-center">
                <div className="clearfix">
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 5 ? null : (
                      <div>
                        <PlusOutlined />
                        <div className="ant-upload-text">Upload</div>
                      </div>
                    )}
                  </Upload>
                  <Modal
                    // visible={previewVisible}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </div>
              </div>
            </div>
            <button
              className="bg-[#DB3B39] text-white w-28 h-12 rounded-md mt-5"
              type="submit"
            >
              {!loading ? "Sell an item" : "Loading..."}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewListing;
