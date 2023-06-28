import { trpc } from "../utils/trpc";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { GalleryImage } from "@prisma/client";
import Carousel from "../components/Carousel";
import Head from "next/head";

export type ImageRow = {
  indices: number[];
  scale: number;
};

export function tileImages(
  imgs: GalleryImage[],
  cont: MutableRefObject<HTMLDivElement | null>,
  gap: number
): ImageRow[] {
  let rows = [];
  let i = 0;
  let marginMod = 0.9;
  let imgMod = 1.0;
  if (window.innerWidth >= 768) {
    marginMod = 0.8;
  }

  while (i < imgs.length) {
    // Build first row
    let w = 0;
    let maxW = marginMod * (cont.current?.offsetWidth ?? -1);

    let row: ImageRow = {
      indices: [],
      scale: 1,
    };

    while (w < maxW && i < imgs.length) {
      row.indices.push(i);
      w += (imgs[i]?.thmb_w ?? 0) * imgMod;
      i++;
    }

    row.scale =
      Math.min((maxW - (row.indices.length - 1) * gap) / w, 1) * imgMod;
    rows.push(row);
  }

  return rows;
}

const Gallery = () => {
  const { data: images, refetch } = trpc.useQuery([
    "gallery.getAllS3Thumbnails",
    { categoryName: "Gallery" },
  ]);
  const imgHolderRef = useRef<HTMLDivElement | null>(null);
  const [imageTiling, setImageTiling] = useState<ImageRow[]>([]);
  const [openImage, setOpenImage] = useState<number | null>(null);
  const gap = 8;

  useEffect(() => {
    if (images != null) {
      console.log(images)
      setImageTiling(tileImages(images, imgHolderRef, gap));
    }
  }, [images]);

  useEffect(() => {
    if (imgHolderRef.current != null) {
      let j = 0;
      for (let i = 0; i < imgHolderRef.current?.children.length; i++) {
        if (imageTiling != null && imageTiling[j] != null) {
          if (
            imgHolderRef.current.children[i]?.classList.contains("gallery-row")
          ) {
            (
              imgHolderRef.current.children[i] as HTMLDivElement
            ).style.height = `${
              (images?.at(imageTiling[j]?.indices[0] ?? 0)?.thmb_h ?? 0) *
                (imageTiling[j]?.scale ?? 0) +
              gap
            }px`;
            (
              imgHolderRef.current.children[i] as HTMLDivElement
            ).style.width = `${imgHolderRef.current.offsetWidth + 5}px`;

            j++;
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
      <Head>
        <title>FRAZZOT - Gallery</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1090px_220px] bg-[center_top_4rem] bg-repeat-x md:bg-[length:1920px_330px]">
        <div className="h-48 md:h-64"></div>
        <h1 className="page-header no-ligature text-mint">GALLERY</h1>
        <div className="mt-2 mb-8 bg-holo bg-cover py-2 md:mt-8 md:mb-16">
          <h2 className="page-sub-header hidden lg:block">
            A SELECTION OF MY DIGITAL ARTWORKS_
          </h2>
          <h2 className="page-sub-header lg:hidden">MY DIGITAL ARTWORKS_</h2>
        </div>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="w-full" ref={imgHolderRef}>
          {imageTiling.map((row, r) => {
            return (
              <>
                <div
                  className="gallery-row w-[90%] overflow-x-clip pl-[5%] md:w-[80%] md:pl-[10%]"
                  key={`row-${r}`}
                >
                  {row.indices.map((i, n) => {
                    return (
                      <div
                        className="inline-block h-full"
                        key={`space-${r}-${n}`}
                      >
                        <div
                          className={`inline-block`}
                          style={{
                            width: `${n == 0 ? 0 : gap}px`,
                            height: "100%",
                          }}
                        ></div>
                        <div
                          className="relative top-0 m-0 inline-block h-full cursor-pointer p-0"
                          key={`image-${n}`}
                        >
                          <img
                            src={images?.at(i)?.url ?? ""}
                            width={(images?.at(i)?.thmb_w ?? 0) * row.scale}
                            height={(images?.at(i)?.thmb_h ?? 0) * row.scale}
                            key={`img-${r}-${n}`}
                            alt={images?.at(i)?.name ?? "Thumbnail"}
                            className="shadow-xl"
                          />
                          <div
                            className="gallery-overlay absolute left-0 top-0 h-full w-full bg-gradient-to-t from-neutral-900 to-transparent opacity-0 transition-opacity hover:opacity-80"
                            style={{ transform: `translateY(-${gap}px)` }}
                            onClick={(_) => setOpenImage(i)}
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
                {r == 1 ? (
                  <div key={`carousel-${r}`}>
                    <Carousel
                      imgPaths={[
                        "/thumbnail/hange_zoeclip.png",
                        "/thumbnail_lg/team7.png",
                        "/thumbnail/TK_red_spider_lily.png",
                        "/thumbnail/gyro_zeppeli_finished.png",
                        "/thumbnail/Dabi_final.png",
                      ]}
                      imgDescs={[
                        "HANGE ZOE",
                        "Team 7",
                        "TK",
                        "GYRO ZEPPELI",
                        "DABI",
                      ]}
                      key={`carousel-comp-${r}`}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </>
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
          onClick={(e) => setOpenImage(null)}
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

export default Gallery;
