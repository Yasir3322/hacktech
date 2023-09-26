import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import Rating from "./Rating";

const RatingSold = () => {
  return (
    <div>
      <div className="mb-4">
        {/* <img src="/assets/star.svg" /> */}
        <ThemeProvider>
          <CSSReset />
          <Rating
            size={20}
            icon="star"
            scale={5}
            fillColor="gold"
            strokeColor="grey"
          />
        </ThemeProvider>
      </div>
      <div>
        <h2 className="font-bold text-sm">
          How did you feel about your buyer?
        </h2>
        <textarea className="border w-full rounded-md" draggable={false} />
      </div>
    </div>
  );
};

export default RatingSold;
