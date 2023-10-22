import { Carousel, Typography, IconButton } from "@material-tailwind/react";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

export function NoCarasoule(props) {
  return (
    <Carousel
      className="rounded-xl  overflow-hidden"
      navigation={false}
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="red"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4 rounded-full text-xl bg-white w-8 h-8"
        >
          <MdArrowBackIosNew />
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="red"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-white rounded-full text-xl w-8 h-8"
        >
          <MdArrowForwardIos />
        </IconButton>
      )}
    >
      {props?.images?.map((image) => {
        return (
          <div className="relative h-96 w-auto">
            <div className="absolute right-3 bg-white top-2  flex shadow-md border px-2 rounded-full">
              {props.totalProductLiked}
              <img src="/assets/totalliked.svg" alt="" />
            </div>
            <img
              src={image}
              alt="image 1"
              className="h-96 w-auto object-cover"
            />
          </div>
        );
      })}
    </Carousel>
  );
}
