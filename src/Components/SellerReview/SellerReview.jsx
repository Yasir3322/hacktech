import React, { useState } from "react";
import ReviewCard from "../UI/ReviewCard";

const SellerReview = (props) => {
  const totalreview = props.userReviews.length;
  const [seeAllReview, setSeeAllReview] = useState(false);

  function formatRelativeTime(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const timeDifferenceInSeconds = Math.floor((now - date) / 1000);

    if (timeDifferenceInSeconds < 60) {
      return timeDifferenceInSeconds === 1
        ? "1 sec ago"
        : `${timeDifferenceInSeconds} secs ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return minutes === 1 ? "1 min ago" : `${minutes} mins ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return days === 1 ? "1 day ago" : `${days} days ago`;
    }
  }

  return (
    <div className="mt-10">
      <div className="flex gap-4">
        <h2 className="font-semibold text-md">
          Seller reviews ({totalreview})
        </h2>
        <button
          className="text-[#DB3B39] font-normal text-sm"
          onClick={() => setSeeAllReview(!seeAllReview)}
        >
          See all
        </button>
      </div>
      <div>
        {!seeAllReview ? (
          <div className="mt-8 grid grid-cols-3 gap-8">
            {props.userReviews.slice(0, 3).map((review) => {
              const { reviewerComment, rating, createdAt } = review;
              const { fullName, image } = review?.reviewerdetail[0];
              const createdat = formatRelativeTime(createdAt);
              return (
                <ReviewCard
                  text={reviewerComment}
                  name={fullName}
                  rating={rating}
                  image={image}
                  createdat={createdat}
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-3 gap-8">
            {props.userReviews.map((review) => {
              const { reviewerComment, rating, createdAt } = review;
              const { fullName, image } = review.reviewerdetail[0];
              const createdat = formatRelativeTime(createdAt);
              return (
                <ReviewCard
                  text={reviewerComment}
                  name={fullName}
                  rating={rating}
                  image={image}
                  createdat={createdat}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerReview;
