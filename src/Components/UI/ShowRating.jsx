import React from "react";

const ShowRating = ({ rating }) => {
  // Create an array of stars based on the rating value.
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const starClassName = i <= rating ? "star-filled" : "star-empty";
    stars.push(
      <span key={i} className={`star ${starClassName}`}>
        &#9733;
      </span>
    );
  }

  return <div className="rating">{stars}</div>;
};

export default ShowRating;
