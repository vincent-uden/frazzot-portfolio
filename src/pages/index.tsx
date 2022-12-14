import type { NextPageWithLayout } from "./_app";
import Head from "next/head";
import type { ReactElement } from "react";
import Image from "next/image";

import Layout from "../components/Layout";
import FadeIn from "../components/FadeIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  InstagramIcon,
  YoutubeIcon,
  PatreonIcon,
  ArtstationIcon,
  FacebookIcon,
  DeviantartIcon,
} from "../components/SocialIcons";
import Link from "next/link";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>FRAZZOT</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen w-screen overflow-y-hidden bg-pattern-holo-inv bg-[length:768px_300px] bg-repeat-x md:bg-[length:1920px_640px]">
        <div className="absolute bottom-0 md:left-32 lg:h-[80vh] lg:w-[80vh] translate-y-8 z-0">
          <Image
            src={"/img/moi.png"}
            layout="intrinsic"
            width="2000px"
            height="2000px"
          />
        </div>
        <FadeIn>
          <aside className="absolute right-0 top-1/2 hidden -translate-y-1/2 md:block">
            <h1 className="md:mr-30 my-4 font-stretch text-7xl text-mint lg:mr-48">
              FRAZZOT
            </h1>
            <div className="h-8 w-full bg-holo">
              <h2 className="relative top-1/2 ml-4 -translate-y-1/2 font-stretch text-xl text-greyblack">
                DIGITAL ARTIST_
              </h2>
            </div>
          </aside>
        </FadeIn>
      </div>

      <div className="holo-panel z-10 shadow-panel">
        <div className="h-8"></div>
        <h1 className="text-center font-stretch text-4xl text-greyblack md:text-6xl">
          WELCOME
        </h1>
        <div className="h-8"></div>
        <p className="relative left-1/2 -translate-x-1/2 text-center font-cocogoose text-lg font-thin md:max-w-[60vw] md:text-2xl">
          THIS IS MY PERSONAL CREATIVE CORNER. HERE YOU CAN FIND EVERYTHING FROM
          GALLERY TO COMMISSION DETAILS.
        </p>
        <div className="h-8"></div>
        <div className="menu-socials hidden flex-row justify-center md:flex">
          <InstagramIcon color="greyblack" size="10" />
          <YoutubeIcon color="greyblack" size="10" />
          <PatreonIcon color="greyblack" size="10" />
          <ArtstationIcon color="greyblack" size="10" />
          <FacebookIcon color="greyblack" size="10" />
          <DeviantartIcon color="greyblack" size="10" />
        </div>
        <div className="menu-socials flex flex-row justify-center md:hidden">
          <InstagramIcon color="greyblack" size="8" />
          <YoutubeIcon color="greyblack" size="8" />
          <PatreonIcon color="greyblack" size="8" />
          <ArtstationIcon color="greyblack" size="8" />
          <FacebookIcon color="greyblack" size="8" />
          <DeviantartIcon color="greyblack" size="8" />
        </div>
        <div className="h-8"></div>
      </div>

      <div className="h-8 md:h-24"></div>
      <div className="w-full overflow-y-hidden bg-pattern-holo-short bg-[length:1920px_320px] bg-bottom bg-repeat-x pb-64">
        <div className="index-grid mx-auto w-[90vw] md:w-[80vw]">
          <div className="col-start-1 col-end-3 row-span-1 bg-holo p-4 md:p-8 md:row-span-2 shadow-panel w-full overflow-x-visible scale-x-125">
            <div className="scale-x-[80%]">
            <Link href={"https://discord.gg/MAQm86a3Xw"}>
              <a className="flex flex-row-reverse content-center">
                <p className="md:mb-4 pl-4 py-2 md:pl-0 md:py-0 text-right md:text-center font-cocogoose text-sm md:text-lg font-extralight text-greyblack">
                  JOIN MY <span className="font-normal">DISCORD SERVER</span>{" "}
                  AND PARTICIPATE IN STREAMS. DISCUSS ART AND CONNECT WITH OTHER
                  ARTISTS
                </p>
                <FontAwesomeIcon
                  icon={faDiscord}
                  className="w-full text-greyblack"
                />
              </a>
            </Link>
            </div>
          </div>
          <div className="col-start-1 col-end-3 row-start-1 row-end-2 bg-holo p-[2px] md:col-start-2">
            <div className="h-full bg-greyblack p-4 md:p-8">
              <Link href="/commissions">
                <a>
                  <h3 className="text-holo mb-2 md:mb-6 bg-cover font-stretch text-xl md:text-4xl">
                    <span className="no-ligature">COMM</span>ISSIONS &gt;
                  </h3>
                </a>
              </Link>
              <div className="">
                <p className="font-cocogoose text-xs font-extralight text-white">
                  ARE YOU INTERESTED IN COMMISSIONING ME?
                </p>
                <p className="font-cocogoose text-xs font-extralight text-white">
                  CHECK OUT THE DETAILS AND FILL OUT THE FORM{" "}
                  <Link href={"/commissions"}>
                    <a>
                      <span className="font-normal">HERE</span>
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-start-1 md:col-start-2 col-end-3 row-start-2 row-end-3 bg-holo p-[2px]">
            <div className="h-full bg-greyblack p-4 md:p-8">
              <Link href="/projects">
                <a>
                  <h3 className="text-holo mb-2 md:mb-6 bg-cover font-stretch text-xl md:text-4xl">
                    PROJECTS &gt;
                  </h3>
                </a>
              </Link>
              <p className="font-cocogoose text-xs font-extralight text-white">
                MY OTHER PROJECTS LIKE COMICS, PAINTED CLOTHING, MODS AND MORE.
              </p>
            </div>
          </div>
          <div className="col-start-1 col-end-3 row-start-3 row-end-4 my-auto h-2 md:h-8 w-full bg-mint"></div>
          <div className="col-start-1 md:col-start-1 col-end-3 row-start-4 row-end-5 bg-holo p-[2px]">
            <div className="h-full bg-greyblack p-4 md:p-8 grid">
              <Link href={"/sketchbook"}>
                <a className="row-span-1">
                  <h3 className="text-holo mb-2 md:mb-6 bg-cover font-stretch text-xl md:text-4xl">
                    SKETCHBOOK &gt;
                  </h3>
                </a>
              </Link>
              <div className="grid md:grid-cols-3 grid-rows-3 items-stretch gap-4 row-start-3 row-end-4">
                <Link href="/sketchbook?tab=0">
                  <a>
                    <p className="no-ligature cursor-pointer border-2 border-periwinkle bg-periwinkle py-4 text-center font-stretch text-base md:text-xl text-greyblack transition-colors hover:bg-greyblack hover:text-periwinkle">
                      WARM-UPS
                    </p>
                  </a>
                </Link>
                <Link href="/sketchbook?tab=1">
                  <a>
                    <p className="no-ligature cursor-pointer border-2 border-pastelpink bg-pastelpink py-4 text-center font-stretch text-base md:text-xl text-greyblack transition-colors hover:bg-greyblack hover:text-pastelpink">
                      ILLUSTRATION
                    </p>
                  </a>
                </Link>
                <Link href="/sketchbook?tab=2">
                  <a>
                    <p className="no-ligature cursor-pointer border-2 border-yellowpeach bg-yellowpeach py-4 text-center font-stretch text-base md:text-xl text-greyblack transition-colors hover:bg-greyblack hover:text-yellowpeach">
                      STUDIES
                    </p>
                  </a>
                </Link>
              </div>
              <p className="md:mt-8 mb-4 font-cocogoose text-xs md:text-lg font-extralight text-white row-start-2 row-end-3">
                FLIP THROUGH ALL OF MY DIGITAL SKETCHBOOKS BY CHOOSING A
                CATEGORY.
              </p>
            </div>
          </div>
          <div className="col-start-1 col-end-3 row-start-6 row-end-7 md:hidden my-auto h-2 md:h-8 w-full bg-mint"></div>
          <div className="md:col-start-3 md:col-end-3 md:row-start-1 md:row-end-5 row-start-7 row-end-8 col-start-1 col-end-3 w-full h-[80vh] md:h-auto bg-holo p-[2px]">
            <div className="flex h-full w-full flex-col bg-greyblack p-8">
              <div className="relative top-0 left-0 grow overflow-x-hidden">
                {[
                  "gwen_final.png",
                  "team7.png",
                  "TK_red_spider_lily.png",
                  "Dabi_final.png",
                  "aizawa.png",
                ].map((path, i) => {
                  return (
                    <img
                      src={`/thumbnail_lg/${path}`}
                      alt={path}
                      key={`gallery-show-${i}`}
                      className="gallery-show-img grow"
                    />
                  );
                })}
              </div>
              <Link href={"/gallery"}>
                <a className="flex-grow-0">
                  <h3 className="text-holo no-ligature mt-4 bg-cover font-stretch text-xl md:text-4xl">
                    GALLERY &gt;
                  </h3>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
