import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

interface Props {
  imgPaths: string[];
  imgDescs: string[];
}

const Carousel = ({ imgPaths, imgDescs }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);

  return (
    <>
      <div className="h-32"></div>
      <div className="relative h-[30rem] w-full">
        <div className="holo-panel absolute top-36 h-48 w-full"></div>
        <div className="absolute top-44 left-0 right-0">
          <FontAwesomeIcon
            className="absolute right-1/2 h-32 w-32 -translate-x-[32rem] text-greyblack"
            icon={faAngleLeft}
            onClick={() => {
              setActiveIndex(activeIndex - 1);
            }}
          />
          <FontAwesomeIcon
            className="absolute left-1/2 h-32 w-32 translate-x-[32rem] text-greyblack"
            icon={faAngleRight}
            onClick={() => {
              setActiveIndex(activeIndex + 1);
            }}
          />
        </div>
        {imgPaths.map((path, i) => {
          return (
            <div
              className={`carousel-item absolute ${
                i === activeIndex ? "is-active" : ""
              } ${i === activeIndex - 1 ? "is-prev" : ""} ${
                i === activeIndex + 1 ? "is-next" : ""
              }`}
              key={i}
            >
              <img src={path} alt="" className="inline h-[30rem]" />
              <p className="mt-28 text-center font-cocogoose text-xl font-thin text-yellowpeach opacity-0 transition-opacity">
                {imgDescs[i]}
              </p>
            </div>
          );
        })}
      </div>
      <div className="h-64"></div>
    </>
  );
};

export default Carousel;
