import { SetStateAction, useState } from "react";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { useSwipeable } from "react-swipeable";

interface Props {
  images: any[] | undefined;
  openImage: number | null;
  setOpenImage: React.Dispatch<SetStateAction<number | null>>;
}

export function ImageDialog({
  images,
  openImage,
  setOpenImage,
}: Props): JSX.Element | null {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    delta: 5,
  });
  const [animationStage, setAnimationStage] = useState<number>(0);
  const [swipingRight, setSwipingRight] = useState<boolean | null>(null);
  const [animStart, setAnimStart] = useState<number | null>(null);
  const [prevOpenImage, setPrevOpenImage] = useState<number | null>(null);

  function nextImage() {
    if (animationStage != 0 || (openImage == (images?.length ?? 0) - 1)) {
      return;
    }
    setAnimationStage(1);
    setSwipingRight(false);
    setAnimStart(Date.now());
    setTimeout(() => {
      setOpenImage(Math.min(openImage!! + 1, images!!.length - 1));
    }, 150);
  }

  function prevImage() {
    if (animationStage != 0 || openImage == 0) {
      return;
    }
    setAnimationStage(1);
    setSwipingRight(true);
    setAnimStart(Date.now());
    setTimeout(() => {
      setOpenImage(Math.max(openImage!! - 1, 0));
    }, 150);
  }

  if (openImage == null) {
    return null;
  }

  return (
    <div
      className="fixed z-50 flex h-full w-full animate-fadein-fast flex-col items-center justify-around bg-[#000000aa]"
      onClick={(_) => setOpenImage(null)}
      {...swipeHandlers}
    >
      <div className="h-16 grow-0" />
      <div className="relative w-full grow">
        <div
          className={`absolute top-0 -left-[100vw] grid w-full h-full items-center justify-center ${animClassPrev(
            animationStage,
            swipingRight
          )}`}
        >
          <img
            src={images?.at((prevOpenImage ?? 1) - 1)?.urlLg ?? ""}
            className={`z-50 max-h-[80vh] max-w-[90vw] select-none xl:max-w-screen-xl`}
          />
        </div>
        <div
          className={`absolute top-0 left-0 grid w-full h-full items-center justify-center ${animClass(
            animationStage,
            swipingRight
          )}`}
        >
          <img
            src={images?.at(openImage)?.urlLg ?? ""}
            className={`z-50 max-h-[80vh] max-w-[90vw] select-none xl:max-w-screen-xl`}
            onLoad={() => {
              if (animStart != null) {
                setTimeout(() => {
                  setAnimationStage(2);
                  setTimeout(() => {
                    setAnimationStage(0);
                    setAnimStart(null);
                    setSwipingRight(null);
                    setPrevOpenImage(openImage);
                  }, 150);
                }, Math.max(150 - (Date.now() - animStart), 0));
              } else {
                setPrevOpenImage(openImage);
              }
            }}
          />
        </div>
        <div
          className={`absolute top-0 left-[100vw] grid w-full h-full items-center justify-center ${animClassNext(
            animationStage,
            swipingRight
          )}`}
        >
          <img
            src={images?.at((prevOpenImage ?? 0) + 1)?.urlLg ?? ""}
            className={`z-50 max-h-[80vh] max-w-[90vw] select-none xl:max-w-screen-xl`}
          />
        </div>
      </div>
      <div className="pointer-events-none grid w-full grow-0 lg:basis-32 grid-cols-2 opacity-0 lg:pointer-events-auto lg:opacity-100">
        <div
          className="flex cursor-pointer flex-row items-center justify-end opacity-0 transition-opacity hover:opacity-100"
          onClick={(e) => {
            if (openImage != 0) {
              setOpenImage(openImage - 1);
              e.stopPropagation();
            }
          }}
          style={{ visibility: openImage != 0 ? "visible" : "hidden" }}
        >
          <IoChevronBackSharp className="h-16 w-16 text-mint/50" />
        </div>
        <div
          className="flex cursor-pointer flex-row items-center opacity-0 transition-opacity hover:opacity-100"
          onClick={(e) => {
            if (openImage != images!!.length - 1) {
              setOpenImage(openImage + 1);
              e.stopPropagation();
            }
          }}
          style={{
            visibility: openImage != images!!.length - 1 ? "visible" : "hidden",
          }}
        >
          <IoChevronForwardSharp className="h-16 w-16 text-mint/50" />
        </div>
      </div>
    </div>
  );
}

function animClass(stage: number | null, swipingRight: boolean | null): string {
  if (stage == 1) {
    if (swipingRight == true) {
      return "translate-x-[100vw] transition-transform";
    } else {
      return "-translate-x-[100vw] transition-transform";
    }
  } else if (stage == 2) {
    if (swipingRight == true) {
      return "translate-x-[100vw]";
    } else {
      return "-translate-x-[100vw]";
    }
  } else if (stage == 3) {
    return "translate-x-0";
  }

  return "";
}

function animClassNext(stage: number | null, swipingRight: boolean | null): string {
  if (stage == 1) {
    return "translate-x-0";
  } else if (stage == 2) {
    if (swipingRight == true) {
      return "translate-x-0";
    } else {
      return "-translate-x-[100vw] transition-transform";
    }
  }

  return "translate-x-0";
}

function animClassPrev(stage: number | null, swipingRight: boolean | null): string {
  console.log(stage, swipingRight);
  if (stage == 1) {
    return "translate-x-0";
  } else if (stage == 2) {
    if (swipingRight == true) {
      return "translate-x-[100vw] transition-transform";
    } else {
      return "translate-x-0";
    }
  }

  return "translate-x-0";
}
