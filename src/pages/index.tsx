import type { NextPageWithLayout } from "./_app";
import Head from "next/head";
import type { ReactElement } from "react";
import Image from "next/image";

import Layout from "../components/Layout";
import FadeIn from "../components/FadeIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArtstation,
  faDeviantart,
  faFacebook,
  faInstagram,
  faPatreon,
  faYoutube,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import {
  InstagramIcon,
  YoutubeIcon,
  PatreonIcon,
  ArtstationIcon,
  FacebookIcon,
  DeviantartIcon,
} from "../components/SocialIcons";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>FRAZZOT</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen w-screen overflow-y-hidden bg-pattern-holo-inv bg-[length:1920px_640px] bg-repeat-x">
        <div className="absolute bottom-0 left-32 h-[80vh] w-[80vh]">
          <Image
            src={"/img/moi.png"}
            layout="intrinsic"
            width="2000px"
            height="2000px"
          />
        </div>
        <FadeIn>
          <aside className="absolute right-0 top-1/2 -translate-y-1/2">
            <h1 className="my-4 mr-48 font-stretch text-7xl text-mint">
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

      <div className="h-16"></div>
      <div className="w-screen overflow-y-hidden bg-pattern-holo-short bg-[length:1920px_320px] bg-bottom bg-repeat-x px-16 pb-64">
        <div className="index-grid">
          <div className="col-start-1 col-end-2 row-span-2 bg-holo">
            <p className="font-cocogoose text-lg font-extralight text-greyblack">
              JOIN MY DISCORD SERVER AND PARTICIPATE IN STREAMS. DISCUSS ART AND
              CONNECT WITH OTHER ARTISTS
            </p>
          </div>
          <div className="col-start-2 col-end-3 bg-holo p-[2px]">
            <div className="h-full bg-greyblack p-8">
              <h3 className="text-holo mb-4 bg-cover font-stretch text-4xl">
                <span className="no-ligature">COMM</span>ISSIONS &gt;
              </h3>
              <p className="font-cocogoose text-lg font-extralight text-white">
                ARE YOU INTERESTED IN COMMISSIONING ME?
              </p>
              <p className="font-cocogoose text-lg font-extralight text-white">
                CHECK OUT THE DETAILS AND FILL OUT THE FORM HERE
              </p>
            </div>
          </div>
          <div className="col-start-2 col-end-3 bg-holo p-[2px]">
            <div className="h-full bg-greyblack p-8">
              <h3 className="text-holo mb-4 bg-cover font-stretch text-4xl">
                PROJECTS &gt;
              </h3>
              <p className="font-cocogoose text-lg font-extralight text-white">
                MY OTHER PROJECTS LIKE COMICS, PAINTED CLOTHING, MODS AND MORE.
              </p>
            </div>
          </div>
          <div className="col-start-1 col-end-3 my-auto h-8 w-full bg-mint"></div>
          <div className="col-start-1 col-end-3 bg-holo p-[2px]">
            <div className="h-full bg-greyblack p-8">
              <h3 className="text-holo mb-8 bg-cover font-stretch text-4xl">
                SKETCHBOOK &gt;
              </h3>
              <div className="flex flex-row items-stretch">
                <p className="no-ligature grow cursor-pointer border-2 border-periwinkle bg-periwinkle py-2 text-center font-stretch text-xl text-greyblack transition-colors hover:bg-greyblack hover:text-periwinkle">
                  WARM-UPS
                </p>
                <p className="no-ligature mx-8 grow cursor-pointer border-2 border-pastelpink bg-pastelpink py-2 text-center font-stretch text-xl text-greyblack transition-colors hover:bg-greyblack hover:text-pastelpink">
                  ILLUSTRATION
                </p>
                <p className="no-ligature grow cursor-pointer border-2 border-yellowpeach bg-yellowpeach py-2 text-center font-stretch text-xl text-greyblack transition-colors hover:bg-greyblack hover:text-yellowpeach">
                  STUDIES
                </p>
              </div>
              <p className="mt-8 font-cocogoose text-lg font-extralight text-white">
                FLIP THROUGH ALL OF MY DIGITAL SKETCHBOOKS BY CHOOSING A
                CATEGORY.
              </p>
            </div>
          </div>
          <div className="col-start-3 col-end-3 row-start-1 row-end-5 bg-holo p-[2px]">
            <div className="h-full bg-greyblack p-8">
              <img src="/thumbnail_lg/gwen_final.png" alt="" />
              <h3 className="text-holo no-ligature bg-cover font-stretch text-4xl">
                GALLERY &gt;
              </h3>
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
