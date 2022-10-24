import type { NextPage } from "next";

import Image from "next/image";
import { trpc } from "../utils/trpc";

import {
  MutableRefObject,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { GalleryImage } from "@prisma/client";

type ImageRow = {
  indices: number[];
  scale: number;
};

function tileImages(
  imgs: GalleryImage[],
  cont: MutableRefObject<HTMLDivElement | null>,
  gap: number
): ImageRow[] {
  let rows = [];
  let i = 0;
  let maxHeight = 200;
  while (i < imgs.length) {
    // Build first row
    let w = 0;
    let maxW = cont.current?.offsetWidth ?? -1;

    let row: ImageRow = {
      indices: [],
      scale: 1,
    };

    while (w < maxW && i < imgs.length) {
      row.indices.push(i);
      w += imgs[i]?.thmb_w ?? 0;
      i++;
    }

    row.scale = Math.min((maxW - (row.indices.length - 1) * gap) / w, 1);
    rows.push(row);

    console.log(w, maxW, row.scale, w * row.scale, gap);
  }

  return rows;
}

const Gallery = () => {
  const { data: images, refetch } = trpc.useQuery(["gallery.getAll"]);
  const imgHolderRef = useRef<HTMLDivElement | null>(null);
  const [imageTiling, setImageTiling] = useState<ImageRow[]>([]);
  const gap = 8;

  useEffect(() => {
    console.log("Hello", images);
    if (images != null && imageTiling.length > 0) {
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
        <h1 className="pl-4 text-center font-stretch text-6xl text-periwinkle">
          <span>GAL</span> <span className="relative -left-8">LERY</span>
        </h1>
        <div className="mt-8 mb-16 bg-holo bg-cover py-2">
          <h2 className="text-center font-stretch text-3xl text-greyblack">
            A SELECTION OF MY DIGITAL ARTWORKS_
          </h2>
        </div>
      </div>
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
      <div className="h-40"></div>
    </>
  );
};

export default Gallery;
