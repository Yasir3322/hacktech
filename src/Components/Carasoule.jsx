import { Carousel, Typography, IconButton } from "@material-tailwind/react";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

export function Carasoule(props) {
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
          <div className="relative h-96 w-full">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/api/v1/${image}`}
              alt="image 1"
              className="h-96 w-full object-cover"
            />
          </div>
        );
      })}
    </Carousel>
  );
}
