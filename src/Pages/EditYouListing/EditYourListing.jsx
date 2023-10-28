import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Footer from "../../Components/Footer/Footer";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useGlobalCotext } from "../../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditYourListing = () => {
  const navigate = useNavigate();

  const { allCatagories } = useGlobalCotext();
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState({});

  const { id } = useParams();

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

    Object.keys(formData).forEach((key) => {
      console.log(key);
      if (key === "images") {
        formData[key] = fileList;
      }
    });

    console.log(formData);
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
    var previousImages = [];
    e.preventDefault();
    const submitiondata = new FormData();
    submitiondata.append("title", formData.title);
    submitiondata.append("description", formData.description);
    submitiondata.append("price", formData.price);
    submitiondata.append("quantity", formData.quantity);
    submitiondata.append("hashtags", formData.hashtags);
    submitiondata.append("catagory", formData.catagory);
    submitiondata.append("isOnline", formData.isOnline);
    submitiondata.append("condition", formData.condition);
    submitiondata.append("instock", formData.instock);
    submitiondata.append("istranding", formData.istranding);
    submitiondata.append("sellerid", formData.sellerid);
    submitiondata.append("priceid", formData.priceid);
    submitiondata.append("sold", formData.sold);
    submitiondata.append("totalliked", formData.totalliked);
    submitiondata.append("quantity", formData.quantity);
    submitiondata.append("createdAt", formData.createdAt);
    submitiondata.append("updatedAt", formData.updatedAt);
    submitiondata.append("favourite", JSON.stringify(formData.favourite));

    fileList.forEach((image) => {
      if (image.url) {
        const img = image.url;
        const pathname = new URL(img).pathname;
        const parts = pathname.split("/");
        const filename = parts[parts.length - 1];
        previousImages.push(filename);
      } else {
        submitiondata.append("images", image.originFileObj);
      }
    });

    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/editlisting/${id}`,
      submitiondata,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
          "Content-Type": "multipart/form-data",
          previousImages: JSON.stringify(previousImages),
        },
      }
    );

    if (response.status === 200) {
      toast.success("Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(`/myprofile/${JSON.parse(localStorage.getItem("user"))._id}`);
    }
  };

  const getProduct = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/singleproduct/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      }
    );
    console.log(res);
    const { product } = res.data;
    console.log(product);
    setFormData(product[0]);

    // setFormData({
    //   title: res?.data?.product.title,
    //   description: res?.data?.product.description,
    //   price: res?.data?.product.price,
    //   hashtags: res?.data?.product.hashtags,
    //   catagory: res?.data?.product.catagory,
    //   isOnline: res?.data?.product.isOnline,
    //   condition: res?.data?.product.condition,
    //   images: res?.data?.product?.images,
    // });
    product[0].images.map((image) => {
      fileList.push({
        uid: Math.floor(Math.random()),
        name: "image.png",
        status: "done",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/${image}`,
      });
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  console.log(formData);

  const handleDeleteProduct = async (id) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/deleteproduct/${id}`
    );

    if (res.status === 200) {
      toast.success("Deleted Successfully", {
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

    navigate(`/myprofile/${JSON.parse(localStorage.getItem("user"))._id}`);
  };

  return (
    <div className="w-full md:mb-0 pb-40">
      <div className="w-11/12 m-auto pt-12">
        <div>
          <h1 className="font-semibold md:text-5xl text-4xl">
            edit your listing
          </h1>
          <p className="font-simibold md:text-2xl text-base">
            Edit the details of the listing
          </p>
        </div>
        <div className="mt-16">
          <form onSubmit={handleFormSubmit}>
            <div className="md:flex md:flex-row flex flex-col md:gap-36 align-middle justify-between">
              <div className="flex flex-col flex-grow">
                <label className="text-base font-bold">Listing title?</label>
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
                  <option selected>Catagories</option>
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
                    <option disabled>Category</option>
                    <option value="Brand New">Brand New</option>
                    <option value="Old">Old</option>
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
                    name=""
                    id=""
                    checked={formData.isOnline}
                    onChange={handleChange2}
                  />
                  <label>Is this an online product ?</label>
                </div>
              </div>
              <div class="flex flex-col">
                <div className="clearfix">
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={() => false}
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
            <div className="w-full flex align-middle justify-between">
              <button
                className="bg-[#DB3B39] text-white w-28 h-12 rounded-md mt-5"
                type="submit"
              >
                update it!
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProduct(id)}
                className="bg-[#DB3B39] text-white w-28 h-12 rounded-md mt-5"
              >
                Delete it!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditYourListing;
