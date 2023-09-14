import React from "react";

const DeletePopup = () => {
  return (
    <div>
      <p className="text-2xl font-medium">
        Are you sure you would like to delete yout listing
      </p>
      <p>you can’t undo this</p>
      <div>
        <button>YES</button>
        <button>NO</button>
      </div>
    </div>
  );
};

export default DeletePopup;
