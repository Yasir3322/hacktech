import React from "react";
import { useGlobalCotext } from "../../Context/Context";

const SoldtowhoPopup = () => {
  const { isSoldPopupOpen } = useGlobalCotext();

  const peoples = [
    {
      name: "Smit Mathew",
      bio: "Hi David Hope youre doing...",
      image: "/assets/Avatar.svg",
    },
    {
      name: "Merry an",
      bio: "Hi David Hope youre doing...",
      image: "/assets/Avatar.svg",
    },
    {
      name: "Jhon walton",
      bio: "Hi David Hope youre doing...",
      image: "/assets/Avatar.svg",
    },
    {
      name: "Monica Randawa",
      bio: "Hi David Hope youre doing...",
      image: "/assets/Avatar.svg",
    },
  ];

  return (
    <div
      className={`${
        isSoldPopupOpen ? "w-full h-screen fixed bg-black/50  z-20 " : ""
      }`}
    >
      <div
        className={`${
          isSoldPopupOpen
            ? "show absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 p-5   bg-white rounded-2xl"
            : "hidden"
        }`}
      >
        <h2 className="font-medium text-2xl">Sold to who?</h2>
        <div className="flex gap-10">
          <div className="border-r-2 p-2">
            <p className="mt-8">your recent chats</p>
            <div className="flex flex-col gap-4 mt-4">
              {peoples.map((people) => {
                const { image, bio, name } = people;
                return (
                  <div className="flex gap-3">
                    <img src={image} alt="image" />
                    <div>
                      <h4>{name}</h4>
                      <span>{bio}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div>
              <img src="/assets/star.svg" />
            </div>
            <div>
              <h2 className="font-bold text-sm">
                How did you feel about your buyer?
              </h2>
              <textarea
                className="border w-full rounded-md"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoldtowhoPopup;
