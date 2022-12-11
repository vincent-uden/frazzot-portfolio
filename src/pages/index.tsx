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

      <div className="h-screen w-screen overflow-y-hidden bg-pattern-holo-inv bg-[length:1920px_640px] bg-repeat-x">
        <div className="absolute bottom-0 md:left-32 lg:h-[80vh] lg:w-[80vh]">
          <Image
            src={"/img/moi.png"}
            layout="intrinsic"
            width="2000px"
            height="2000px"
          />
        </div>
        <FadeIn>
          <aside className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
            <h1 className="my-4 md:mr-30 lg:mr-48 font-stretch text-7xl text-mint">
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

      <div className="holo-panel">
        <div className="h-8"></div>
        <h1 className="text-center font-stretch text-6xl text-greyblack">
          WELCOME
        </h1>
        <div className="h-8"></div>
        <p className="relative left-1/2 max-w-[60vw] -translate-x-1/2 text-center font-cocogoose text-2xl font-thin">
          THIS IS MY PERSONAL CREATIVE CORNER. HERE <br /> YOU CAN FIND
          EVERYTHING FROM GALLERY TO COMMISSION DETAILS.
        </p>
        <div className="h-8"></div>
        <div className="menu-socials flex flex-row justify-center">
          <InstagramIcon color="greyblack" size="10" />
          <YoutubeIcon color="greyblack" size="10" />
          <PatreonIcon color="greyblack" size="10" />
          <ArtstationIcon color="greyblack" size="10" />
          <FacebookIcon color="greyblack" size="10" />
          <DeviantartIcon color="greyblack" size="10" />
        </div>
        <div className="h-8"></div>
      </div>

      <div className="h-24"></div>
      <div className="w-full overflow-y-hidden bg-pattern-holo-short bg-[length:1920px_320px] bg-bottom bg-repeat-x pb-64">
        <div className="index-grid mx-auto w-[80vw]">
          <div className="col-start-1 col-end-2 row-span-2 bg-holo p-8">
            <Link href={"https://discord.gg/MAQm86a3Xw"}>
              <a>
                <p className="mb-4 text-center font-cocogoose text-lg font-extralight text-greyblack">
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
          <div className="col-start-2 col-end-3 bg-holo p-[2px]">
            <div className="h-full bg-greyblack p-8">
              <Link href="/commissions">
                <a>
                  <h3 className="text-holo mb-6 bg-cover font-stretch text-4xl">
                    <span className="no-ligature">COMM</span>ISSIONS &gt;
                  </h3>
                </a>
              </Link>
              <div className="">
                <p className="font-cocogoose text-lg font-extralight text-white">
                  ARE YOU INTERESTED IN COMMISSIONING ME?
                </p>
                <p className="font-cocogoose text-lg font-extralight text-white">
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
          <div className="col-start-2 col-end-3 bg-holo p-[2px]">
            <div className="h-full bg-greyblack p-8">
              <Link href="/projects">
                <a>
                  <h3 className="text-holo mb-6 bg-cover font-stretch text-4xl">
                    PROJECTS &gt;
                  </h3>
                </a>
              </Link>
              <p className="font-cocogoose text-lg font-extralight text-white">
                MY OTHER PROJECTS LIKE COMICS, PAINTED CLOTHING, MODS AND MORE.
              </p>
            </div>
          </div>
          <div className="col-start-1 col-end-3 my-auto h-8 w-full bg-mint"></div>
          <div className="col-start-1 col-end-3 bg-holo p-[2px]">
            <div className="h-full bg-greyblack p-8">
              <Link href={"/sketchbook"}>
                <a>
                  <h3 className="text-holo mb-6 bg-cover font-stretch text-4xl">
                    SKETCHBOOK &gt;
                  </h3>
                </a>
              </Link>
              <div className="grid grid-cols-3 items-stretch gap-4">
                <Link href="/sketchbook?tab=0">
                  <a>
                    <p className="no-ligature cursor-pointer border-2 border-periwinkle bg-periwinkle py-2 text-center font-stretch text-xl text-greyblack transition-colors hover:bg-greyblack hover:text-periwinkle">
                      WARM-UPS
                    </p>
                  </a>
                </Link>
                <Link href="/sketchbook?tab=1">
                  <a>
                    <p className="no-ligature cursor-pointer border-2 border-pastelpink bg-pastelpink py-2 text-center font-stretch text-xl text-greyblack transition-colors hover:bg-greyblack hover:text-pastelpink">
                      ILLUSTRATION
                    </p>
                  </a>
                </Link>
                <Link href="/sketchbook?tab=2">
                  <a>
                    <p className="no-ligature cursor-pointer border-2 border-yellowpeach bg-yellowpeach py-2 text-center font-stretch text-xl text-greyblack transition-colors hover:bg-greyblack hover:text-yellowpeach">
                      STUDIES
                    </p>
                  </a>
                </Link>
              </div>
              <p className="mt-8 font-cocogoose text-lg font-extralight text-white">
                FLIP THROUGH ALL OF MY DIGITAL SKETCHBOOKS BY CHOOSING A
                CATEGORY.
              </p>
            </div>
          </div>
          <div className="col-start-3 col-end-3 row-start-1 row-end-5 bg-holo p-[2px]">
            <div className="flex h-full flex-col bg-greyblack p-8">
              <div className="grow overflow-hidden relative top-0 left-0">
                {[
                  "gwen_final.png",
                  "team7.png",
                  "TK_red_spider_lily.png",
                  "Dabi_final.png",
                  "aizawa.png",
                ].map((path, i) => {
                  return <img src={`/thumbnail_lg/${path}`} alt={path} key={`gallery-show-${i}`} className="gallery-show-img" />;
                })}
              </div>
              <Link href={"/gallery"}>
                <a>
                  <h3 className="text-holo no-ligature mt-4 bg-cover font-stretch text-4xl">
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
