import type { NextPageWithLayout } from "./_app";
import Head from "next/head";
import type { ReactElement } from "react";
import Image from "next/image";

import Layout from "../components/Layout";
import FadeIn from "../components/FadeIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArtstation, faDeviantart, faFacebook, faInstagram, faPatreon, faYoutube, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { InstagramIcon, YoutubeIcon, PatreonIcon, ArtstationIcon, FacebookIcon, DeviantartIcon } from "../components/SocialIcons";

const Home: NextPageWithLayout = () => {

  return (
    <>
      <Head>
        <title>FRAZZOT</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen h-screen bg-pattern-holo-inv bg-[length:1920px_640px] bg-repeat-x overflow-y-hidden">
          <div className="absolute h-[80vh] w-[80vh] bottom-0 left-32">
            <Image src={"/img/moi.png"} layout="intrinsic" width="2000px" height="2000px" />
          </div>
        <FadeIn>
          <aside className="absolute right-0 top-1/2 -translate-y-1/2">
            <h1 className="font-stretch text-7xl text-mint my-4 mr-48">FRAZZOT</h1>
            <div className="w-full h-8 bg-holo">
              <h2 className="relative font-stretch text-xl text-greyblack top-1/2 -translate-y-1/2 ml-4">DIGITAL ARTIST_</h2>
            </div>
          </aside>
        </FadeIn>
      </div>

      <div className="holo-panel">
        <div className="h-8"></div>
        <h1 className="font-stretch text-6xl text-greyblack text-center">WELCOME</h1>
        <div className="h-8"></div>
        <p className="relative left-1/2 font-cocogoose font-thin text-center text-2xl max-w-[60vw] -translate-x-1/2">THIS IS MY PERSONAL CREATIVE CORNER. HERE <br /> YOU CAN FIND EVERYTHING FROM GALLERY TO COMMISSION DETAILS.</p>
        <div className="h-8"></div>
        <div className="flex flex-row menu-socials justify-center">
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
      <div className="grid grid-cols-11 grid-rows-7 gap-14 w-screen bg-pattern-holo bg-[length:1920px_640px] bg-repeat-x bg-bottom overflow-y-hidden px-16 pb-64">
        <div className="bg-holo col-span-2 row-span-4">
          <p className="font-cocogoose font-thin text-2xl p-6 text-center">JOIN MY <span className="font-cocogoose">DISCORD SERVER</span> AND PARTICIPATE IN STREAMS. DISCUSS ART AND CONNECT WITH OTHER ARTIST.</p>
          <FontAwesomeIcon className="text-greyblack w-4/5 cursor-pointer relative left-1/2 -translate-x-1/2 mb-6" icon={faDiscord} />
        </div>
        <div className="col-span-5 row-span-2 border-2 p-4">
          <h1 className="inline font-stretch text-transparent text-4xl bg-holo bg-clip-text">COM </h1> <h1 className="inline relative font-stretch text-transparent text-4xl bg-holo bg-clip-text -left-5"> MISSIONS &gt;</h1>
          <p className="font-cocogoose font-thin text-xl text-violet-100">ARE YOU INTERESTED IN COMMISSIONING ME?</p>
          <p className="font-cocogoose font-thin text-xl text-violet-100">CHECK OUT THE DETAILS AND FILL OUT THE FORM HERE.</p>
        </div>
        <div className="col-start-8 col-end-12 row-span-7 border-2 p-4">
          <h1 className="inline font-stretch text-transparent text-4xl bg-holo bg-clip-text">GAL </h1> <h1 className="inline relative font-stretch text-transparent text-4xl bg-holo bg-clip-text -left-5"> LERY &gt;</h1>
        </div>
        <div className="col-span-5 row-span-2 border-2 p-4">
          <h1 className="inline font-stretch text-transparent text-4xl bg-holo bg-clip-text">PROJECTS &gt; </h1>
          <p className="font-cocogoose font-thin text-xl text-violet-100">MY OTHER PROJECTS LIKE COMICS, PAINTED CLOTHING, MODS AND MORE</p>
        </div>
        <div className="relative col-span-7 row-span-1 bg-mint h-1/5 top-[40%]"></div>
        <div className="col-span-5 row-span-2 border-2 p-4">
          <h1 className="font-stretch text-transparent text-4xl bg-holo bg-clip-text">SKETCHBOOK &gt; </h1>
          <div className="flex flex-row justify-between mt-4">
            <h2 className="bg-pastelpink flex-grow text-center font-stretch py-2 text-2xl text-greyblack border-2 border-pastelpink hover:bg-greyblack hover:text-pastelpink transition-colors">DIGITAL</h2>
            <div className="w-6"></div>
            <h2 className="bg-yellowpeach flex-grow text-center font-stretch py-2 text-2xl text-greyblack border-2 border-yellowpeach hover:bg-greyblack hover:text-yellowpeach transition-colors">PHYSICAL</h2>
          </div>
          <p className="font-cocogoose font-thin text-xl text-violet-100 mt-4">FLIP THROUGH MY PHYSICAL AND DIGITAL SKETCHBOOKS HERE</p>
        </div>
        <div className="col-span-2 row-span-2">
          <img src="/email.svg" alt="" className="w-full" />
          <h1 className="inline font-stretch text-transparent text-4xl bg-holo bg-clip-text">EMAIL &gt; </h1>
        </div>
      </div>

    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home;
