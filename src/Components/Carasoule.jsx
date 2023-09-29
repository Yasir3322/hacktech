import { Carousel, Typography, Button } from "@material-tailwind/react";

export function Carasoule(props) {
  return (
    <Carousel className="rounded-xl  overflow-hidden" navigation={false}>
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
