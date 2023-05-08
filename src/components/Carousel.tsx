import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";

interface Props {
  imgPaths: string[];
  imgDescs: string[];
}

function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
  }

  return {width:  0, height: 0};
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const Carousel = ({ imgPaths, imgDescs }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const activeRef = useRef<HTMLImageElement>(null);

  const [xRotation, setXRotation] = useState<number>(0);
  const [yRotation, setYRotation] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<[number, number] | null>(null);
  const [touchEnd, setTouchEnd] = useState<[number, number] | null>(null);
  const [transitionActive, setTransitionActive] = useState<boolean>(false);

  const { width, height } = useWindowDimensions();

  const rotateActive = (event: React.MouseEvent<Element, MouseEvent>) => {
    const img = activeRef.current!;
    const imgRect = (event.target as HTMLElement).getBoundingClientRect();

    const normalizedX = (event.clientX - imgRect.x) / imgRect.width - 0.5;
    const normalizedY = (event.clientY - imgRect.y) / imgRect.height - 0.5;
    setXRotation(normalizedY * -7);
    setYRotation(normalizedX * 7);
  };

  const minSwipeDistance = 20;

  const onTouchStart = (e: any) => {
    setTouchEnd(null);
    const target = e.targetTouches[0];
    if (target) {
      setTouchStart([target.clientX, target.clientY]);
    }
  };

  const onTouchMove = (e: any) => {
    const target = e.targetTouches[0];
    if (target) {
      setTouchEnd([target.clientX, target.clientY]);
    }
  };

  const onTouchEnd = (e: any) => {
    if (touchStart != null && touchEnd != null) {
      const distX = touchEnd[0] - touchStart[0];
      const distY = touchEnd[1] - touchStart[1];

      if (
        Math.abs(distX) > Math.abs(distY) &&
        Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2)) > minSwipeDistance
      ) {
        if (distX < 0) {
          setActiveIndex((activeIndex + 1) % imgPaths.length);
        } else {
          setActiveIndex(
            (((activeIndex - 1) % imgPaths.length) + imgPaths.length) %
              imgPaths.length
          );
        }
      }
    }
  };

  return (
    <>
      <div className="h-28 md:h-44"></div>
      <div className="relative h-[15rem] w-full md:h-[25rem] lg:h-[30rem]" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} >
        <div className="holo-panel absolute top-6 hidden h-48 w-full md:top-[6.5rem] md:block lg:top-36"></div>
        <div className="absolute top-20 left-0 right-0 hidden md:top-44 xl:block">
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
                className="inline h-[15rem] md:h-[25rem] lg:h-[30rem]"
                ref={activeRef}
                style={{
                  transform: `${
                    i === activeIndex ? "scale(125%)" : ""
                  } rotateX(${
                    (i === activeIndex && width > 768) ? xRotation : 0
                  }deg) rotateY(${(i === activeIndex && width > 768) ? yRotation : 0}deg)`,
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
                onMouseLeave={(_) => {
                  setTransitionActive(true);
                  setXRotation(0);
                  setYRotation(0);
                }}
                onClick={() => {
                  if (
                    ((activeIndex - 1) % imgPaths.length) + imgPaths.length ||
                    i % imgPaths.length ===
                      (activeIndex + 1) % imgPaths.length ||
                    i === activeIndex
                  ) {
                    setActiveIndex(i % imgPaths.length);
                  }
                }}
              />
              <p className="mt-14 text-center font-gothic text-xl text-yellowpeach opacity-0 transition-opacity md:mt-28">
                {imgDescs[i]}
              </p>
            </div>
          );
        })}
      </div>
      <div className="h-36 md:h-44"></div>
    </>
  );
};

export default Carousel;
