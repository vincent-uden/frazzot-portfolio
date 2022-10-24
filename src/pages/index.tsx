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
      <div className="grid w-screen grid-cols-11 grid-rows-7 gap-14 overflow-y-hidden bg-pattern-holo-short bg-[length:1920px_320px] bg-bottom bg-repeat-x px-16 pb-64">
        <div className="col-span-2 row-span-4 bg-holo">
          <p className="p-6 text-center font-cocogoose text-2xl font-thin">
            JOIN MY <span className="font-cocogoose">DISCORD SERVER</span> AND
            PARTICIPATE IN STREAMS. DISCUSS ART AND CONNECT WITH OTHER ARTIST.
          </p>
          <FontAwesomeIcon
            className="relative left-1/2 mb-6 w-4/5 -translate-x-1/2 cursor-pointer text-greyblack"
            icon={faDiscord}
          />
        </div>
        <div className="col-span-5 row-span-2 border-2 p-4">
          <h1 className="inline bg-holo bg-clip-text font-stretch text-4xl text-transparent">
            COM{" "}
          </h1>{" "}
          <h1 className="relative -left-5 inline bg-holo bg-clip-text font-stretch text-4xl text-transparent">
            {" "}
            MISSIONS &gt;
          </h1>
          <p className="font-cocogoose text-xl font-thin text-violet-100">
            ARE YOU INTERESTED IN COMMISSIONING ME?
          </p>
          <p className="font-cocogoose text-xl font-thin text-violet-100">
            CHECK OUT THE DETAILS AND FILL OUT THE FORM HERE.
          </p>
        </div>
        <div className="col-start-8 col-end-12 row-span-7 border-2 p-4">
          <h1 className="inline bg-holo bg-clip-text font-stretch text-4xl text-transparent">
            GAL{" "}
          </h1>{" "}
          <h1 className="relative -left-5 inline bg-holo bg-clip-text font-stretch text-4xl text-transparent">
            {" "}
            LERY &gt;
          </h1>
        </div>
        <div className="col-span-5 row-span-2 border-2 p-4">
          <h1 className="inline bg-holo bg-clip-text font-stretch text-4xl text-transparent">
            PROJECTS &gt;{" "}
          </h1>
          <p className="font-cocogoose text-xl font-thin text-violet-100">
            MY OTHER PROJECTS LIKE COMICS, PAINTED CLOTHING, MODS AND MORE
          </p>
        </div>
        <div className="relative top-[40%] col-span-7 row-span-1 h-1/5 bg-mint"></div>
        <div className="col-span-5 row-span-2 border-2 p-4">
          <h1 className="bg-holo bg-clip-text font-stretch text-4xl text-transparent">
            SKETCHBOOK &gt;{" "}
          </h1>
          <p className="mt-4 font-cocogoose text-xl font-thin text-violet-100">
            FLIP THROUGH MY PHYSICAL AND DIGITAL SKETCHBOOKS HERE
          </p>
        </div>
        <div className="col-span-2 row-span-2">
          <img src="/email.svg" alt="" className="w-full" />
          <h1 className="inline bg-holo bg-clip-text font-stretch text-4xl text-transparent">
            EMAIL &gt;{" "}
          </h1>
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
