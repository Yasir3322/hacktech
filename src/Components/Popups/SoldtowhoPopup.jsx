import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import Rating from "../UI/Rating";
import { useGlobalCotext } from "../../Context/Context";

const SoldtowhoPopup = (props) => {
  const { isSoldPopupOpen, showSoldPopup, rating, prodIdForSoldTo } =
    useGlobalCotext();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");

  const getPeople = async () => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/getchatusers/${userid}`
    );
    console.log(res.data);
    res.data.chatusers.map((user) => {
      setUsers((prev) => {
        return [...prev, user.chatuser[0]];
      });
    });
  };

  useEffect(() => {
    getPeople();
  }, []);

  const handleSoldToUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingSubmit = async () => {
    console.log(prodIdForSoldTo);
    const { _id } = selectedUser;
    const id = JSON.parse(localStorage.getItem("user"))._id;

    await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/updatereq`,
      {
        approvetosold: true,
      },
      {
        headers: {
          prodid: prodIdForSoldTo,
          buyerid: _id,
        },
      }
    );

    await axios.patch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/product/updatesoldvalue/${prodIdForSoldTo}`
    );

    const dataobj = {
      reviewby: id,
      reviewto: _id,
      rating,
      reviewerComment: comment,
    };
    console.log(dataobj);

    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/review/createreview`,
      dataobj
    );

    // Reset the rating and comment fields if needed
    setUserRating(0);
    setComment("");
    showSoldPopup();
  };

  const handleTextareaKeyPress = (event) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault(); // Prevent a newline character in the textarea
      handleRatingSubmit();
    }
  };

  return (
    <div
      className={`${
        isSoldPopupOpen ? "w-full h-screen fixed bg-black/50  z-20 " : ""
      }`}
    >
      <div
        className={`${
          isSoldPopupOpen
            ? "show absolute md:left-1/2 left-0 md:mx-0 mx-3 md:-translate-x-1/2 top-1/2 -translate-y-1/2 p-5   bg-white rounded-2xl"
            : "hidden"
        }`}
      >
        <h2 className="font-medium md:text-2xl text-xl">Sold to who?</h2>
        <button
          className="absolute right-1 top-1"
          onClick={() => showSoldPopup()}
        >
          <AiFillCloseCircle />
        </button>
        <div className="flex gap-10">
          <div className="border-r-2 p-2">
            <p className="mt-8">your recent chats</p>
            <div className="flex flex-col gap-4 mt-4">
              {users.map((people) => {
                const { image, fullName, _id } = people;
                const userimage = `${
                  image
                    ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/${image}`
                    : "/assets/preview.avif"
                }`;
                return (
                  <div
                    className="flex gap-3 cursor-pointer"
                    onClick={() => handleSoldToUserClick(people)}
                    key={_id}
                  >
                    <img
                      src={userimage}
                      alt="image"
                      // width={45}
                      // height={45}
                      className="rounded-full w-12 h-12"
                    />
                    <div>
                      <h4>{fullName}</h4>
                      <span className="md:block hidden text-[#9C9797] text-xs">{`Hi ${fullName} Hope youre doing...`}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {selectedUser ? (
              <form onSubmit={handleRatingSubmit}>
                <div className="mb-4">
                  <ThemeProvider>
                    <CSSReset />
                    <Rating
                      size={20}
                      icon="star"
                      scale={5}
                      fillColor="gold"
                      strokeColor="grey"
                      // onChange={handleRatingChange}
                      // value={rating}
                    />
                  </ThemeProvider>
                </div>
                <div>
                  <h2 className="font-bold text-sm">
                    How did you feel about {selectedUser.fullName}?
                  </h2>
                  <textarea
                    className="border w-full rounded-md"
                    draggable={false}
                    onChange={handleCommentChange}
                    value={comment}
                    onKeyDown={handleTextareaKeyPress}
                  />
                </div>
                <button
                  type="submit"
                  className="px-2 bg-[#DB3B39] border-none text-white py-1 rounded-md"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div>
                <img src="/assets/star.svg" />
                <h2 className="font-bold text-sm">
                  How did you feel about your buyer?
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoldtowhoPopup;
