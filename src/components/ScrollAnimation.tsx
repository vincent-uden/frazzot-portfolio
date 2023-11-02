import { ReactNode, useEffect, useRef, useState } from "react";

type AnimationType =
  | "fadein"
  | "slideTopToBottom"
  | "slideBottomToTop"
  | "slideLeftToRight"
  | "slideRightToLeft"
  | "slideLeftToRightFast"
  | "slideRightToLeftFast"
  | "pulse"
  | "debug";

interface Props {
  children: ReactNode;
  type: AnimationType;
  scrollOffset?: number;
  repeat?: boolean;
  animLength?: string;
  className?: string;
}

export const ScrollAnimation = ({
  children,
  type,
  scrollOffset,
  repeat,
  animLength,
  className,
}: Props) => {
  const [onScreen, setOnScreen] = useState(false);

  const [topOnScreen, setTopOnScreen] = useState(false);
  const [botOnScreen, setBotOnScreen] = useState(false);
  const topOffsetRef = useRef<HTMLDivElement>(null);
  const botOffsetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (repeat == true) {
      setOnScreen(topOnScreen || botOnScreen);
    } else {
      setOnScreen(botOnScreen);
    }
  }, [topOnScreen, botOnScreen]);

  useEffect(() => {
    const intersectObs = new IntersectionObserver((entries) => {
      if ((entries[0]?.intersectionRatio ?? 0.0) > 0.0) {
        setTopOnScreen(true);
      } else {
        if (repeat === true) {
          setTopOnScreen(false);
        }
      }
    });

    intersectObs.observe(topOffsetRef.current!!);

    const intersectObs2 = new IntersectionObserver((entries) => {
      if ((entries[0]?.intersectionRatio ?? 0.0) > 0.0) {
        setBotOnScreen(true);
      } else {
        if (repeat === true) {
          setBotOnScreen(false);
        }
      }
    });

    intersectObs2.observe(botOffsetRef.current!!);
  }, []);

  return (
    <div
      className={`relative ${type == "debug" ? "transition-colors" : ""} ${
        onScreen ? "animate-" + type : ""
      } ${type == "debug" && onScreen ? "bg-green-500" : ""} ${
        type != "pulse" && type != "debug" && !onScreen
          ? "invisible"
          : "visible"
      } `  + (className ?? "")}
      style={{ animationDuration: animLength ?? "1s" }}
    >
      {/* Upper and lower offset intersection detection divs */}
      <div
        className={`absolute h-4 w-screen ${
          type == "debug" ? "bg-red-500 opacity-50" : "opacity-0"
        } pointer-events-none`}
        style={{ bottom: -(scrollOffset ?? 0) }}
        ref={botOffsetRef}
      ></div>
      <div
        className={`absolute h-4 w-screen ${
          type == "debug" ? "bg-red-500 opacity-50" : "opacity-0"
        } pointer-events-none opacity-50`}
        style={{ top: -(scrollOffset ?? 0) }}
        ref={topOffsetRef}
      ></div>
      {/* -------------------------------------------------- */}
      {children}
    </div>
  );
};
