import React, { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";

interface Props {
  imgPaths: string[];
  imgDescs: string[];
}

const Carousel = ({ imgPaths, imgDescs }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const activeRef = useRef<HTMLImageElement>(null);

  const [xRotation, setXRotation] = useState<number>(0);
  const [yRotation, setYRotation] = useState<number>(0);
  const [transitionActive, setTransitionActive] = useState<boolean>(false);

  const rotateActive = (event: React.MouseEvent<Element, MouseEvent>) => {
    const img = activeRef.current!;
    const imgRect = (event.target as HTMLElement).getBoundingClientRect();

    const normalizedX = (event.clientX - imgRect.x) / imgRect.width - 0.5;
    const normalizedY = (event.clientY - imgRect.y) / imgRect.height - 0.5;
    setXRotation(normalizedY * -7);
    setYRotation(normalizedX * 7);
  };

  return (
    <>
      <div className="h-44"></div>
      <div className="relative h-[30rem] w-full">
        <div className="holo-panel absolute top-36 h-48 w-full"></div>
        <div className="absolute top-44 left-0 right-0">
          <IoChevronBackSharp
            className="absolute right-1/2 h-32 w-32 -translate-x-[32rem] cursor-pointer text-greyblack transition-transform hover:scale-110"
            onClick={() => {
              setActiveIndex(
                (((activeIndex - 1) % imgPaths.length) + imgPaths.length) %
                  imgPaths.length
              );
            }}
          />
          <IoChevronForwardSharp
            className="absolute left-1/2 h-32 w-32 translate-x-[32rem] cursor-pointer text-greyblack transition-transform hover:scale-110"
            onClick={() => {
              setActiveIndex((activeIndex + 1) % imgPaths.length);
            }}
          />
        </div>
        {imgPaths.map((path, i) => {
          return (
            <div
              className={`carousel-item absolute ${
                i === activeIndex ? "is-active" : ""
              } ${
                i % imgPaths.length ===
                (((activeIndex - 1) % imgPaths.length) + imgPaths.length) %
                  imgPaths.length
                  ? "is-prev"
                  : ""
              } ${
                i % imgPaths.length === (activeIndex + 1) % imgPaths.length
                  ? "is-next"
                  : ""
              }`}
              key={`carousel-item-${i}`}
            >
              <img
                src={path}
                alt=""
                className="inline h-[30rem]"
                ref={activeRef}
                style={{
                  transform: `${
                    i === activeIndex ? "scale(125%)" : ""
                  } rotateX(${i === activeIndex ? xRotation : 0}deg) rotateY(${
                    i === activeIndex ? yRotation : 0
                  }deg)`,
                  transition: transitionActive
                    ? "0.1s ease-in-out transform"
                    : "",
                }}
                onMouseMove={(e) => {
                  if (!transitionActive) {
                    rotateActive(e);
                  }
                }}
                onMouseEnter={(e) => {
                  rotateActive(e);
                  setTimeout(() => {
                    setTransitionActive(false);
                  }, 100);
                }}
                onMouseLeave={(e) => {
                  setTransitionActive(true);
                  setXRotation(0);
                  setYRotation(0);
                }}
              />
              <p className="mt-28 text-center font-gothic text-xl text-yellowpeach opacity-0 transition-opacity">
                {imgDescs[i]}
              </p>
            </div>
          );
        })}
      </div>
      <div className="h-44"></div>
    </>
  );
};

export default Carousel;
