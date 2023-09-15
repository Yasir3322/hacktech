import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Footer from "../../Components/Footer/Footer";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useGlobalCotext } from "../../Context/Context";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditYourListing = () => {
  const { allCatagories } = useGlobalCotext();
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    hashtags: "",
    catagory: "",
    isOnline: false,
    condition: "",
    images: [],
  });

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
    e.preventDefault();
    console.log(fileList);
    console.log(formData);

    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/editlisting/${id}`,
      formData
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
    }

    return;
    const imagefiles = fileList.map((file) => {
      return file.originFileObj;
    });
    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("description", formData.description);
    formdata.append("price", 123);
    formdata.append("hashtags", formData.hashtags);
    formdata.append("catagory", formData.catagory);
    formdata.append("isOnline", formData.isOnline);
    formdata.append("condition", formData.condition);

    imagefiles.forEach((image) => {
      formdata.append("images", image);
    });

    console.log(formdata);
    return;
    const token = localStorage.getItem("hacktechtoken");
    const res = await axios.post(
      `${import.meta.env.BACKEND_URL}/product/createproduct`,
      formdata,
      { headers: { "Content-Type": "multipart/form-data", token: token } }
    );
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
    setFormData({
      title: res?.data?.product.title,
      description: res?.data?.product.description,
      price: res?.data?.product.price,
      hashtags: res?.data?.product.hashtags,
      catagory: res?.data?.product.catagory,
      isOnline: res?.data?.product.isOnline,
      condition: res?.data?.product.condition,
      images: res?.data?.product?.images,
    });

    fileList.push({
      uid: Math.floor(Math.random()),
      name: "image.png",
      status: "done",
      url: formData?.images[0],
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  console.log(formData);

  return (
    <div className="w-full">
      <div className="w-11/12 m-auto pt-12">
        <div>
          <h1 className="font-semibold text-5xl">edit your listing</h1>
          <p className="font-simibold text-2xl">
            Edit the details of the listing
          </p>
        </div>
        <div className="mt-16">
          <form onSubmit={handleFormSubmit}>
            <div className="flex gap-36 align-middle justify-between">
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
            <div className="grid grid-cols-2 gap-8">
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
              <button className="bg-[#DB3B39] text-white w-28 h-12 rounded-md mt-5">
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
