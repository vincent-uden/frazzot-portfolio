import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Carousel from "../components/Carousel";
import { trpc } from "../utils/trpc";
import { ImageRow, tileImages } from "./gallery";

//import "@splidejs/react-splide/css";

const Sketchbook = () => {
  const categoryNames = ["WARM-UPS", "ILLUSTRATION SKETCHES", "STUDIES"];

  const [imageTiling, setImageTiling] = useState<ImageRow[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const { data: images, refetch } = trpc.useQuery([
    "gallery.getImages",
    { categoryName: categoryNames[selectedCategory]!! },
  ]);
  const imgHolderRef = useRef<HTMLDivElement | null>(null);
  const gap = 8;

  useEffect(() => {
    if (images != null) {
      setImageTiling(tileImages(images, imgHolderRef, gap));
    }
  }, [images]);

  useEffect(() => {
    if (imgHolderRef.current != null) {
      for (let i = 0; i < imgHolderRef.current?.children.length; i++) {
        if (imageTiling != null && imageTiling[i] != null) {
          if (
            imgHolderRef.current.children[i]?.classList.contains("gallery-row")
          ) {
            (
              imgHolderRef.current.children[i] as HTMLDivElement
            ).style.height = `${
              (images?.at(imageTiling[i]?.indices[0] ?? 0)?.thmb_h ?? 0) *
                (imageTiling[i]?.scale ?? 0) +
              gap
            }px`;
            (
              imgHolderRef.current.children[i] as HTMLDivElement
            ).style.width = `${imgHolderRef.current.offsetWidth + 5}px`;
          }
        }
      }
    }
  }, [images, imageTiling, imgHolderRef]);

  useEffect(() => {
    let doit: NodeJS.Timeout | undefined;
    function handleResize() {
      clearTimeout(doit);
      doit = setTimeout(() => {
        if (images != null) {
          setImageTiling(tileImages(images, imgHolderRef, gap));
        }
      }, 100);
    }

    window.addEventListener("resize", handleResize);
  });

  return (
    <>
      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x">
        <div className="h-64"></div>
        <h1 className="pl-4 text-center font-stretch text-6xl text-yellowpeach">
          SKETCHBOOK
        </h1>
        <div className="mt-8 mb-16 bg-holo bg-cover py-2">
          <h2 className="no-ligature text-center font-stretch text-3xl text-greyblack">
            A COLLECTION OF SKETCHES_
          </h2>
        </div>
      </div>
      <div className="h-4"></div>
      <div className="mx-auto max-w-screen-lg">
        <div className="inline-block w-full bg-holo p-[2px]">
          <div className="bg-greyblack p-6">
            <p className="font-cocogoose text-lg font-light text-yellowpeach">
              WELCOME TO MY SKETCHBOOK ARCHIVE.
            </p>
            <div className="h-6"></div>
            <p className="font-cocogoose text-lg font-thin text-yellowpeach">
              I CREATED A COLLECTION OF SKETCHE STHAT WAS EITHER SCRAPPED,
              STUDIES OR JUST FOR FUN/WARM-UPS.
            </p>
            <div className="h-6"></div>
            <p className="font-cocogoose text-lg font-thin text-yellowpeach">
              YOU CAN SORT THEM BY CATEGORY AND FLIP THROUGH SOME HIGHLIGHTS
              BELOW. IF YOU WISH TO SEE THEM ALL AT ONCE, KEEP SCROLLING!
            </p>
          </div>
        </div>
        <div className="h-8"></div>
        <div className="flex w-full flex-row items-stretch justify-between">
          <div
            className={`flex w-full cursor-pointer flex-col justify-around border-2 border-yellowpeach transition-colors ${
              selectedCategory === 0 ? "bg-greyblack" : "bg-yellowpeach"
            }`}
            onClick={(e) => setSelectedCategory(0)}
          >
            <h2
              className={`my-auto py-8 text-center font-stretch text-2xl ${
                selectedCategory === 0 ? "text-yellowpeach" : "text-greyblack"
              }`}
            >
              WARM-UPS
            </h2>
          </div>
          <div
            className={`mx-4 flex w-full cursor-pointer flex-col justify-around border-2 border-yellowpeach transition-colors ${
              selectedCategory === 1 ? "bg-greyblack" : "bg-yellowpeach"
            }`}
            onClick={(e) => setSelectedCategory(1)}
          >
            <h2
              className={`no-ligature my-auto py-8 text-center font-stretch text-2xl ${
                selectedCategory === 1 ? "text-yellowpeach" : "text-greyblack"
              }`}
            >
              ILLUSTRATION SKETCHES
            </h2>
          </div>
          <div
            className={`flex w-full cursor-pointer flex-col justify-around border-2 border-yellowpeach transition-colors ${
              selectedCategory === 2 ? "bg-greyblack" : "bg-yellowpeach"
            }`}
            onClick={(e) => setSelectedCategory(2)}
          >
            <h2
              className={`my-auto py-8 text-center font-stretch text-2xl ${
                selectedCategory === 2 ? "text-yellowpeach" : "text-greyblack"
              }`}
            >
              STUDIES
            </h2>
          </div>
        </div>
        <div className="h-8"></div>
      </div>
      <Carousel
        imgPaths={[
          "/thumbnail/hange_zoeclip.png",
          "/thumbnail_lg/team7.png",
          "/thumbnail/TK_red_spider_lily.png",
          "/thumbnail/gyro_zeppeli_finished.png",
          "/thumbnail/Dabi_final.png",
        ]}
        imgDescs={["HANGE ZOE", "Team 7", "TK", "GYRO ZEPPELI", "DABI"]}
      />
      <div className="h-20"></div>

      <div className="h-[2.65rem] bg-yellowpeach">
        <div className="mx-auto w-fit bg-greyblack px-8">
          <h1 className="relative -top-[.65rem] text-center font-stretch text-6xl text-yellowpeach">
            SKETCHBOOK <span className="no-ligature">GALLERY</span>
          </h1>
          <h2 className="font-cocogoose text-4xl font-thin text-yellowpeach">
            {selectedCategory === 0
              ? "WARM-UPS // JUST FOR FUN"
              : selectedCategory === 1
              ? "ILLUSTRAION SKETCHES"
              : "STUDIES"}
          </h2>
        </div>
      </div>
      <div className="h-32"></div>

      <div className="flex w-full flex-col items-center">
        <div className="w-[80%] overflow-clip" ref={imgHolderRef}>
          {imageTiling.map((row, r) => {
            return (
              <div className="gallery-row" key={`row-${r}`}>
                {row.indices.map((i, n) => {
                  return (
                    <div className="inline-block h-full" key={`space-${n}`}>
                      <div
                        className={`inline-block`}
                        style={{
                          width: `${n == 0 ? 0 : gap}px`,
                          height: "100%",
                        }}
                      ></div>
                      <div
                        className="relative top-0 m-0 inline-block h-full p-0"
                        key={n}
                      >
                        <Image
                          src={`/thumbnail/${images?.at(i)?.path}`}
                          width={(images?.at(i)?.thmb_w ?? 0) * row.scale}
                          height={(images?.at(i)?.thmb_h ?? 0) * row.scale}
                        />
                        <div
                          className="gallery-overlay absolute left-0 top-0 h-full w-full bg-gradient-to-t from-neutral-900 to-transparent opacity-0 transition-opacity hover:opacity-80"
                          style={{ transform: `translateY(-${gap}px)` }}
                        >
                          <p className="absolute bottom-4 left-4 text-lg text-white">
                            {images?.at(i)?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-16"></div>
    </>
  );
};

export default Sketchbook;
