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
  ];

  return (
    <div>
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
  );
};

export default ChatBar;
