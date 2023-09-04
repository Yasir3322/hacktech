import React from "react";

const ChatBar = () => {
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
    // {
    //   name: "Monica Randawa",
    //   bio: "Hi David Hope youre doing...",
    //   image: "/assets/Avatar.svg",
    // },
    // {
    //   name: "Monica Randawa",
    //   bio: "Hi David Hope youre doing...",
    //   image: "/assets/Avatar.svg",
    // },
    // {
    //   name: "Monica Randawa",
    //   bio: "Hi David Hope youre doing...",
    //   image: "/assets/Avatar.svg",
    // },
    // {
    //   name: "Monica Randawa",
    //   bio: "Hi David Hope youre doing...",
    //   image: "/assets/Avatar.svg",
    // },
  ];

  return (
    <div className="border-r-2 w-96 p-8 h-[28rem] overflow-y-scroll custom-scrollbar">
      <h4 className="text-lg">Chat</h4>
      <div className="flex flex-col gap-3 mt-4">
        {peoples.map((people) => {
          const { image, bio, name } = people;
          return (
            <div className="flex gap-3">
              <img src={image} alt="image" />
              <div>
                <h4>{name}</h4>
                <span className="text-[#9C9797] text-xs">{bio}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatBar;
