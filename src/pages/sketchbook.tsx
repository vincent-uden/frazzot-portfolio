import Image from "next/image";
import Carousel from "../components/Carousel";

//import "@splidejs/react-splide/css";

const Sketchbook = () => {
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
          <div className="flex w-full flex-col justify-around border-2 border-yellowpeach bg-yellowpeach">
            <h2 className="my-auto py-8 text-center font-stretch text-2xl text-greyblack">
              WARM-UPS
            </h2>
          </div>
          <div className="mx-4 flex w-full flex-col justify-around border-2 border-yellowpeach bg-yellowpeach">
            <h2 className="no-ligature py-8 text-center font-stretch text-2xl text-greyblack">
              ILLUSTRATION SKETCHES
            </h2>
          </div>
          <div className="flex w-full flex-col justify-around border-2 border-yellowpeach bg-yellowpeach">
            <h2 className="py-8 text-center font-stretch text-2xl text-greyblack">
              STUDIES
            </h2>
          </div>
        </div>
        <div className="h-8"></div>
      </div>
      <Carousel
        imgPaths={[
          "/thumbnail/hange_zoeclip.png",
          "/thumbnail/TK_red_spider_lily.png",
          "/thumbnail/gyro_zeppeli_finished.png",
          "/thumbnail/Dabi_final.png",
        ]}
        imgDescs={["HANGE ZOE", "TK", "GYRO ZEPPELI", "DABI"]}
      />

      <div className="h-[2.65rem] bg-yellowpeach">
        <div className="mx-auto w-fit bg-greyblack px-8">
          <h1 className="relative -top-[.65rem] text-center font-stretch text-6xl text-yellowpeach">
            SKETCHBOOK <span className="no-ligature">GALLERY</span>
          </h1>
          <h2 className="font-cocogoose text-4xl font-thin text-yellowpeach">
            WARM-UPS // JUST FOR FUN
          </h2>
        </div>
      </div>
      <div className="h-16"></div>
    </>
  );
};

export default Sketchbook;
