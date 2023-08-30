import { MutableRefObject, useEffect, useRef, useState } from "react";
import Head from "next/head";

import { trpc } from "../utils/trpc";
import Carousel from "../components/Carousel";
import { GalleryImage } from "../db/schema";
import { useAnalytics } from "../utils/useAnalytics";

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

// Polyfill for Ipad Air 4
function at(n: any) {
  // ToInteger() abstract op
  n = Math.trunc(n) || 0;
  // Allow negative indexing from the end
  //@ts-ignore
  if (n < 0) n += this.length;
  // OOB access is guaranteed to return undefined
  //@ts-ignore
  if (n < 0 || n >= this.length) return undefined;
  // Otherwise, this is just normal property access
  //@ts-ignore
  return this[n];
}

const TypedArray = Reflect.getPrototypeOf(Int8Array);
for (const C of [Array, String, TypedArray]) {
  //@ts-ignore
  Object.defineProperty(C.prototype, "at", {
    value: at,
    writable: true,
    enumerable: false,
    configurable: true,
  });
}
// End of polyfill

function randomInt(low: number, high: number): number {
  return Math.floor(Math.random() * (high - low)) + low;
}

function randomFakeImages(amount: number): GalleryImage[] {
  let output = [];

  for (let i = 0; i < amount; i++) {
    let w = randomInt(200, 300);
    let h = 240;
    let img: GalleryImage = {
      path: "/img/asd",
      name: "",
      id: "",
      w: w,
      h: h,
      thmb_w: w,
      thmb_h: h,
      createdAt: new Date(),
      categoryId: null,
      url: null,
      urlExpires: new Date(),
      urlLg: null,
      urlLgExpires: new Date(),
      displayIndex: 0,
    };
    output.push(img);
  }

  return output;
}

const Gallery = () => {
  const { data: fastImages } = trpc.useQuery(
    ["gallery.getAllS3ThumbnailsFast", { categoryName: "Gallery" }],
    { context: { skipBatch: true } }
  );
  const { data: slowImages, refetch } = trpc.useQuery(
    ["gallery.getAllS3Thumbnails", { categoryName: "Gallery" }],
    { context: { skipBatch: true } }
  );
  const imgHolderRef = useRef<HTMLDivElement | null>(null);
  const [images, setImages] = useState<any[] | undefined>(undefined);
  const [imageTiling, setImageTiling] = useState<ImageRow[]>([]);
  const [openImage, setOpenImage] = useState<number | null>(null);
  const gap = 8;

  useEffect(() => {
    if (slowImages !== undefined) {
      setImages(slowImages);
      const x = tileImages(slowImages, imgHolderRef, gap);
      setImageTiling(x);
    } else if (fastImages !== undefined) {
      setImages(fastImages);
      const x = tileImages(fastImages, imgHolderRef, gap);
      setImageTiling(x);
    }
  }, [slowImages, fastImages]);

  useEffect(() => {
    let imgs = randomFakeImages(20);
    setImages(imgs);
    const x = tileImages(imgs, imgHolderRef, gap);
    setImageTiling(x);
    console.log("HELLO");
  }, []);

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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [images]);

  useAnalytics("/gallery");

  return (
    <>
      <Head>
        <title>FRAZZOT ⋄ GALLERY</title>
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
          {imageTiling.slice(0, 2).map((row, r) => {
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
          <div className="mb-8">
            <Carousel
              imgPaths={[
                "/img/gallery_carousel/de_nile_sisters_by_frazzot.png",
                "/img/gallery_carousel/diluc_genshin_impact_blur.png",
                "/img/gallery_carousel/gwen_final.png",
                "/img/gallery_carousel/part7_trio_signed_blur_by_frazzot_v2.png",
                "/img/gallery_carousel/stone_ocean_poster_final_070622.png",
                "/img/gallery_carousel/yuji_itadori_final.png",
              ]}
              imgDescs={[
                "De Nile Sisters: Monster High",
                "Diluc: Genshin Impact",
                "Gwen: LoL",
                "Steel Ball Tri: JoJo Part 7",
                "Stone Ocean: JoJo Part 6",
                "Itadori Yuji: JK",
              ]}
            />
          </div>
          {imageTiling.slice(2).map((row, r) => {
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
          onClick={(e) => setOpenImage(null)}
          key={`image-hover`}
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

export const GalleryRow = ({
  row,
  r,
  images,
  gap,
  openSetter: setOpenImage,
}: {
  row: ImageRow;
  r: number;
  images: any;
  gap: number;
  openSetter: any;
}) => {
  return (
    <div
      className="gallery-row w-[90%] overflow-x-clip pl-[5%] md:w-[80%] md:pl-[10%]"
      key={`row-${r}`}
    >
      {row.indices.map((i, n) => {
        return (
          <div className="inline-block h-full" key={`space-${r}-${n}`}>
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
                style={{
                  height: (images?.at(i)?.thmb_h ?? 0) * row.scale,
                  width: (images?.at(i)?.thmb_w ?? 0) * row.scale,
                }}
                key={`img-${r}-${n}`}
                alt={images?.at(i)?.name ?? "Thumbnail"}
                className="shadow-xl"
                onError={(e) => {
                  e.currentTarget.src = "/img/blank.png";
                  e.currentTarget.classList.add("animate-pulse");
                }}
                onLoad={(e) => {
                  if (!e?.currentTarget?.src.endsWith("/img/blank.png")) {
                    e.currentTarget.classList.remove("animate-pulse");
                  }
                }}
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
  );
};

export default Gallery;
