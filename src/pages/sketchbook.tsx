import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Carousel from "../components/Carousel";
import { trpc } from "../utils/trpc";
import { ImageRow, tileImages, GalleryRow } from "./gallery";

//import "@splidejs/react-splide/css";

const Sketchbook = () => {
  const categoryNames = ["WARM-UPS", "ILLUSTRATION SKETCHES", "STUDIES"];

  const [imageTiling, setImageTiling] = useState<ImageRow[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [openImage, setOpenImage] = useState<number | null>(null);
  const { data: images, refetch } = trpc.useQuery([
    "gallery.getAllS3Thumbnails",
    { categoryName: categoryNames[selectedCategory]!! },
  ]);
  const imgHolderRef = useRef<HTMLDivElement | null>(null);
  const gap = 8;

  const router = useRouter();

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

  function onResize() {
    if (images != null) {
      setImageTiling(tileImages(images, imgHolderRef, gap));
    }
  }

  useEffect(() => {
    let doit: NodeJS.Timeout | undefined;
    function handleResize() {
      clearTimeout(doit);
      doit = setTimeout(() => {
        onResize();
      }, 100);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [images]);

  useEffect(() => {
    if (router.query.tab != null) {
      setSelectedCategory(parseInt(router.query.tab!! as string));
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>FRAZZOT ⋄ SKETCHBOOK</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1090px_220px] bg-[center_top_4rem] bg-repeat-x md:bg-[length:1920px_330px]">
        <div className="h-48 md:h-64" />
        <h1 className="page-header text-yellowpeach">SKETCHBOOK</h1>
        <div className="mt-2 mb-8 bg-holo bg-cover py-2 md:mt-8 md:mb-16">
          <h2 className="page-sub-header no-ligature hidden md:block">
            A COLLECTION OF SKETCHES_
          </h2>
          <h2 className="page-sub-header no-ligature md:hidden">
            MY SKETCHES_
          </h2>
        </div>
      </div>
      <div className="mx-4 xl:mx-auto xl:max-w-[calc(1280px-4rem)]">
        <div className="inline-block w-full bg-holo p-[2px]">
          <div className="bg-greyblack p-4 md:p-6">
            <p className="font-gothic text-sm font-bold text-yellowpeach md:text-lg">
              WELCOME TO MY SKETCHBOOK ARCHIVE.
            </p>
            <div className="h-4 md:h-8"></div>
            <p className="font-gothic text-sm text-yellowpeach md:text-lg">
              I CREATED A COLLECTION OF SKETCHES THAT WAS EITHER SCRAPPED,
              STUDIES OR JUST FOR FUN/WARM-UPS.
            </p>
            <div className="h-4 md:h-8"></div>
            <p className="font-gothic text-sm text-yellowpeach md:text-lg">
              YOU CAN FILTER THE SKETCHES BY CATEGORY WITH THE BUTTONS BELOW AND
              THE GALLERY CAN BE FOUND FURTHER DOWN ON THIS PAGE!
            </p>
          </div>
        </div>
        <div className="h-8"></div>
        <div className="flex w-full flex-col items-stretch justify-between gap-4 lg:flex-row">
          <div
            className={`flex w-full cursor-pointer flex-col justify-around border-2 border-yellowpeach transition-colors ${
              selectedCategory === 0 ? "bg-greyblack" : "bg-yellowpeach"
            }`}
            onClick={(e) => setSelectedCategory(0)}
          >
            <h2
              className={`my-auto py-4 text-center font-stretch text-lg transition-transform hover:scale-110 md:text-2xl lg:py-8 ${
                selectedCategory === 0 ? "text-yellowpeach" : "text-greyblack"
              }`}
            >
              WARM-UPS
            </h2>
          </div>
          <div
            className={`flex w-full cursor-pointer flex-col justify-around border-2 border-yellowpeach transition-colors ${
              selectedCategory === 1 ? "bg-greyblack" : "bg-yellowpeach"
            }`}
            onClick={(e) => setSelectedCategory(1)}
          >
            <h2
              className={`no-ligature my-auto py-4 text-center font-stretch text-base transition-transform hover:scale-110 md:text-2xl lg:py-8 ${
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
              className={`my-auto py-4 text-center font-stretch text-lg transition-transform hover:scale-110 md:text-2xl lg:py-8 ${
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
          "/img/sketchbook_carousel/ayanami_rei.png",
          "/img/sketchbook_carousel/gyro_zeppeli_sketch2.png",
          "/img/sketchbook_carousel/IMG_0112.PNG",
          "/img/sketchbook_carousel/javier_arthur_sketch.png",
          "/img/sketchbook_carousel/naruto_sketch_.png",
        ]}
        imgDescs={[
          "Ayanami Rei: Evangelion",
          "Gyro Zeppeli: JoJo Part 7",
          "Pinterest Male // Portrait Study",
          "Javier Arthur: RDR2",
          "Uzumaki",
        ]}
      />
      <div className="h-20"></div>

      <div className="bg-yellowpeach">
        <div className="ml-8 w-fit md:mx-auto">
          <h1 className="relative grid w-auto grid-cols-1 grid-rows-2 text-left font-stretch text-2xl text-yellowpeach md:block md:bg-greyblack md:text-center md:text-3xl lg:text-4xl xl:text-6xl">
            <span className="bg-greyblack pl-4 pr-4 md:pr-0">SKETCHBOOK</span>{" "}
            <span className="no-ligature bg-greyblack px-4 md:px-0 md:pr-4">
              GALLERY
            </span>
          </h1>
          <h2 className="h-0 translate-y-2 pl-4 font-gothic text-lg text-yellowpeach lg:text-2xl xl:text-4xl">
            {selectedCategory === 0
              ? "WARM-UPS // JUST FOR FUN"
              : selectedCategory === 1
              ? "ILLUSTRATION SKETCHES"
              : "STUDIES"}
          </h2>
        </div>
      </div>
      <div className="h-16 md:h-24 xl:h-32"></div>

      <div className="flex w-full flex-col items-center">
        <div className="w-full" ref={imgHolderRef}>
          {imageTiling.map((row, r) => {
            return (
              <GalleryRow
                row={row}
                r={r}
                images={images}
                gap={gap}
                openSetter={setOpenImage}
                key={`gallery-row-${r}`}
              />
            );
          })}
        </div>
      </div>
      <div className="h-40 w-screen overflow-y-hidden bg-pattern-holo-short bg-[length:1090px_220px] bg-bottom bg-repeat-x px-[20%] pt-12 md:bg-[length:1920px_330px] lg:h-72"></div>
      {openImage == null ? (
        <></>
      ) : (
        <div
          className="fixed z-50 flex h-full w-full animate-fadein-fast items-center justify-center bg-[#000000aa]"
          onClick={(_) => setOpenImage(null)}
        >
          <img
            src={images?.at(openImage)?.urlLg ?? ""}
            className="z-50 max-h-[80vh] max-w-[90vw] xl:max-w-screen-xl"
          />
        </div>
      )}
    </>
  );
};

export default Sketchbook;
