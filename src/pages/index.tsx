import type { NextPageWithLayout } from "./_app";
import Head from "next/head";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
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

function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const {
      scrollX: scrollX,
      scrollY : scrollY,
      innerHeight: height,
      innerWidth: width,
    } = window;
    return {
      scrollX,
      scrollY,
      height,
      width,
    };
  }

  return { scrollX: 0, scrollY: 0, width: 0, height: 0 };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const Home: NextPageWithLayout = () => {
  const [discordOffset, setDiscordOffset] = useState<number>(0);
  const dims = useWindowDimensions();

  const measuredRef = useCallback((node: any) => {
    if (node != null) {
      const rect = node.getBoundingClientRect()
      setDiscordOffset(rect.top + rect.height / 2 + window.scrollY);
    }
  }, [dims]);

  return (
    <>
      <Head>
        <title>FRAZZOT</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative h-[150vw] w-screen overflow-x-hidden overflow-y-hidden bg-pattern-holo-inv bg-[length:768px_300px] bg-repeat-x md:h-[80vh] md:bg-[length:1920px_640px] lg:h-[50vw]">
        <FadeIn>
          <div className="absolute left-[10vw] bottom-0 z-0 h-[80vw] w-[80vw] md:h-[60vh] md:w-[60vh] lg:left-32 lg:h-[40vw] lg:w-[40vw]">
            <Image src={"/img/moi3.png"} layout="fill" alt="Self portrait" />
          </div>
          <aside className="absolute right-0 top-1/2 hidden -translate-y-1/2 xl:block">
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

        <div></div>
      </div>

      <div className="holo-panel z-10 shadow-panel">
        <div className="h-8"></div>
        <h2 className="text-center font-stretch text-4xl text-greyblack md:text-6xl">
          WELCOME
        </h2>
        <div className="h-8"></div>
        <p className="relative left-1/2 -translate-x-1/2 px-[15vw] text-center font-gothic text-lg text-greyblack md:max-w-[60vw] md:px-0 md:text-2xl">
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

      <div className="h-8 md:h-24" />
      <div className="w-full overflow-y-hidden bg-pattern-holo-short bg-[length:768px_150px] bg-bottom bg-repeat-x pb-44 md:bg-[length:1920px_320px] md:pb-64">
        <div className="index-grid mx-[5vw] w-[90vw] overflow-x-hidden md:mx-[10vw] md:w-[80vw]">
          <div className="invisible lg:visible col-start-1 col-end-3 row-span-1 my-4 w-full overflow-x-hidden bg-holo p-4 shadow-panel md:my-12 lg:col-end-2 lg:row-span-2 lg:my-0 lg:p-8" ref={measuredRef}>
            <div className="">
              <Link href={"https://discord.gg/MAQm86a3Xw"}>
                <a
                  className="flex flex-row-reverse content-center lg:flex-col"
                  aria-label="Join discord"
                >
                  <p className="py-2 pl-4 text-right font-gothic text-sm text-greyblack lg:mb-4 lg:py-0 lg:pl-0 lg:text-center lg:text-lg">
                    JOIN MY <span className="font-normal">DISCORD SERVER</span>{" "}
                    AND PARTICIPATE IN STREAMS. DISCUSS ART AND CONNECT WITH
                    OTHER ARTISTS
                  </p>
                  <FontAwesomeIcon
                    icon={faDiscord}
                    className="h-auto max-h-20 w-full self-center text-greyblack transition-transform hover:scale-110 lg:max-h-max"
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="col-start-1 col-end-3 row-start-1 row-end-2 bg-holo p-[2px] lg:col-start-2">
            <div className="h-full bg-greyblack p-4 md:p-8">
              <Link href="/commissions">
                <a aria-label="Commissions page">
                  <h3 className="text-holo mb-2 origin-left bg-cover font-stretch text-xl transition-transform hover:scale-105 md:mb-6 md:text-4xl">
                    <span className="no-ligature">COMM</span>ISSIONS &gt;
                  </h3>
                </a>
              </Link>
              <div className="">
                <p className="font-gothic text-sm text-white md:text-lg">
                  ARE YOU INTERESTED IN COMMISSIONING ME?
                </p>
                <p className="font-gothic text-sm text-white md:text-lg">
                  CHECK OUT THE DETAILS AND{" "}
                  <Link href={"/commissions"}>
                    <a aria-label="Commissions page">
                      <span className="font-normal">FILL OUT THE FORM</span>
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-start-1 col-end-3 row-start-2 row-end-3 bg-holo p-[2px] lg:col-start-2">
            <div className="h-full bg-greyblack p-4 md:p-8">
              <Link href="/projects">
                <a aria-label="Projects page">
                  <h3 className="text-holo mb-2 origin-left bg-cover font-stretch text-xl transition-transform hover:scale-105 md:mb-6 md:text-4xl">
                    PROJECTS &gt;
                  </h3>
                </a>
              </Link>
              <p className="font-gothic text-sm text-white md:text-lg">
                MY OTHER PROJECTS LIKE COMICS, PAINTED CLOTHING, MODS AND MORE.
              </p>
            </div>
          </div>
          <div className="col-start-1 col-end-3 row-start-3 row-end-4 my-auto h-2 w-full bg-mint md:h-8"></div>
          <div className="col-start-1 col-end-3 row-start-4 row-end-5 bg-holo p-[2px] md:col-start-1">
            <div className="grid h-full bg-greyblack p-4 md:p-8">
              <Link href={"/sketchbook"}>
                <a className="row-span-1" aria-label="Sketchbook page">
                  <h3 className="text-holo mb-2 origin-left bg-cover font-stretch text-xl transition-transform hover:scale-105 md:mb-6 md:text-4xl">
                    SKETCHBOOK &gt;
                  </h3>
                </a>
              </Link>
              <div className="row-start-3 row-end-4 grid grid-rows-3 items-stretch gap-2 md:row-start-2 md:row-end-3 md:grid-cols-3 md:grid-rows-1 lg:gap-4">
                <Link href="/sketchbook?tab=0">
                  <a aria-label="Warm-up sketches">
                    <p className="no-ligature cursor-pointer border-2 border-periwinkle bg-periwinkle py-4 text-center font-stretch text-base text-greyblack transition-colors hover:bg-greyblack hover:text-periwinkle lg:text-xl">
                      WARM-UPS
                    </p>
                  </a>
                </Link>
                <Link href="/sketchbook?tab=1">
                  <a aria-label="Illustration sketches">
                    <p className="no-ligature cursor-pointer border-2 border-pastelpink bg-pastelpink py-4 text-center font-stretch text-base text-greyblack transition-colors hover:bg-greyblack hover:text-pastelpink lg:text-xl">
                      ILLUSTRATION
                    </p>
                  </a>
                </Link>
                <Link href="/sketchbook?tab=2">
                  <a aria-label="Studies">
                    <p className="no-ligature cursor-pointer border-2 border-yellowpeach bg-yellowpeach py-4 text-center font-stretch text-base text-greyblack transition-colors hover:bg-greyblack hover:text-yellowpeach lg:text-xl">
                      STUDIES
                    </p>
                  </a>
                </Link>
              </div>
              <p className="row-start-2 row-end-3 mb-4 font-gothic text-sm text-white md:row-start-3 md:row-end-4 md:mt-8 md:text-lg">
                FLIP THROUGH ALL OF MY DIGITAL SKETCHBOOKS BY CHOOSING A
                CATEGORY.
              </p>
            </div>
          </div>
          <div className="col-start-1 col-end-3 row-start-5 row-end-6 my-auto hidden h-2 w-full bg-mint lg:block lg:h-8 xl:hidden"></div>
          <Link href={"/gallery"}>
            <a
              className="col-start-1 col-end-3 row-start-6 row-end-7 flex xl:col-start-3 xl:col-end-3 xl:row-start-1 xl:row-end-5"
              aria-label="Gallery"
            >
              <div className="h-[80vh] w-full bg-holo p-[2px] xl:h-auto">
                <div className="flex h-full w-full flex-col bg-greyblack p-4 md:p-8">
                  <div className="relative top-0 left-0 grow overflow-x-hidden">
                    {[
                      "gwen_final.png",
                      "team7.png",
                      "TK_red_spider_lily.png",
                      "Dabi_final.png",
                      "aizawa.png",
                    ].map((path, i) => {
                      return (
                        <Image
                          src={`/thumbnail_lg/${path}`}
                          alt={path}
                          key={`gallery-show-${i}`}
                          className="gallery-show-img grow"
                          layout="fill"
                        />
                      );
                    })}
                  </div>
                  <h3 className="text-holo no-ligature mt-4 origin-left bg-cover font-stretch text-xl transition-transform hover:scale-105 md:text-4xl">
                    GALLERY &gt;
                  </h3>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>

      <Link href={"https://discord.gg/MAQm86a3Xw"}>
        <div className="absolute mb-24 flex w-screen cursor-pointer flex-row lg:hidden -translate-y-1/2" style={{ top: discordOffset }}>
          <aside className="bg-pastelpink px-6 py-4">
            <FontAwesomeIcon
              icon={faDiscord}
              className="h-20 w-20 text-greyblack md:hidden"
            />
                  <img
                    className="hidden md:block transition-transform hover:scale-110 py-4 px-12"
                    src="/DiscordBrand.svg"
                    alt=""
                  />
          </aside>
          <aside className="relative flex-grow bg-holo bg-cover shadow-left">
            <h2 className="no-ligature absolute top-1/2 w-full -translate-y-1/2 cursor-pointer py-4 text-center font-stretch text-xl text-greyblack transition-transform hover:scale-110">
              <span className="block">JOIN MY</span>
              <span className="block">COMMUNITY</span>
              <span className="block">HERE &gt;</span>
            </h2>
          </aside>
        </div>
      </Link>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
