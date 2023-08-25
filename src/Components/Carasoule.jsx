import { Carousel, Typography, Button } from "@material-tailwind/react";

export function Carasoule() {
  return (
    <Carousel className="rounded-xl  overflow-hidden" navigation={false}>
      <div className="relative h-96 w-full">
        <img
          src="/assets/shoe1.svg"
          alt="image 1"
          className="h-96 w-full object-cover"
        />
      </div>
      <div className="relative h-96 w-full">
        <img
          src="/assets/shoe2.svg"
          alt="image 2"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative h-96 w-full">
        <img
          src="/assets/shoe3.svg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative h-96 w-full">
        <img
          src="/assets/shoe4.svg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative h-96 w-full">
        <img
          src="/assets/shoe4.svg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </div>
    </Carousel>
  );
}
