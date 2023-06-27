import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>FRAZZOT - About</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1090px_220px] bg-[center_top_4rem] bg-repeat-x md:bg-[length:1920px_330px]">
        <div className="h-48 md:h-64"></div>
        <h1 className="page-header text-lilac">ABOUT</h1>
        <div className="mt-2 mb-8 bg-holo bg-cover py-2 md:mt-8 md:mb-16">
          <h2 className="page-sub-header hidden lg:block">
            A SHORT INTRODUCTION TO THE ARTIST_
          </h2>
          <h2 className="page-sub-header lg:hidden">INTRO TO THE ARTIST_</h2>
        </div>
      </div>

      <div className="bg-pattern-holo-short bg-[length:1090px_220px] bg-bottom bg-repeat-x md:bg-[length:1920px_330px]">
        <div className="relative mx-auto grid max-w-screen-xl grid-cols-7 gap-x-2 px-8 md:px-16">
          <div className="absolute top-32 left-16 mr-0 h-min translate-y-20 bg-holo md:static md:col-span-3 md:mr-16 md:h-full md:translate-y-0">
            <div className="w-[30vw] scale-125 md:h-[300px] md:w-[300px]">
              <Image
                src="/img/moi2.png"
                width="1246px"
                height="2000px"
                layout="responsive"
              />
            </div>
          </div>
          <div className="col-span-7 bg-holo p-[2px] md:col-span-4">
            <div className="h-full w-full bg-greyblack p-8 pb-16 md:p-12 md:pb-12">
              <h2 className="font-stretch text-base text-lilac md:text-3xl">
                HEY THERE!
              </h2>
              <div className="h-4 md:h-8"></div>
              <p className="font-gothic text-sm text-lilac md:text-lg">
                WELCOME TO MY WEBSITE! I'M FRAZZOT A{" "}
                <span className="font-neou-bold">22</span>-YEAR-OLD ARTIST AND
                STUDENT BASED IN GOTHENBURG, SWEDEN. I LIKE TO PLAY VIDEO GAMES,
                WORKOUT AND CREATE STUFF.
              </p>
              <div className="h-4"></div>
              <p className="pl-[calc(40%+48px)] font-gothic text-sm text-lilac md:pl-0 md:text-lg">
                ON THIS SITE YOU CAN FIND SOME OF MY WORKS, WAYS TO SUPPORT AND
                HOW TO GET IN TOUCH WITH ME.
              </p>
              <div className="h-4"></div>
              <p className="pl-[calc(40%+48px)] font-gothic text-sm text-lilac md:pl-0 md:text-lg">
                THANK YOU FOR STOPPING BY!
              </p>
              <div className="hidden h-32 md:block"></div>
            </div>
          </div>
          <div className="col-span-7 h-[calc(100vw-300px)] md:h-16"></div>
          <div className="col-span-2 hidden md:block"></div>
          <div className="relative -left-8 col-span-7 mx-0 h-1/2 w-screen bg-holo md:-left-16 md:h-[70%] lg:left-0 lg:col-span-5 lg:w-full">
            <div className="relative top-1/2 block -translate-y-[50%] scale-100 md:hidden">
              <Image
                src="/img/items_mobile.png"
                width="1677px"
                height="1264px"
                layout="responsive"
              />
            </div>
            <div className="relative top-1/2 hidden -translate-y-[50%] scale-100 md:block">
              <Image
                src="/img/items.png"
                width="3908px"
                height="1400px"
                layout="responsive"
              />
            </div>
          </div>
        </div>
        <div className="h-16 md:h-64"></div>
      </div>
    </>
  );
};

export default About;
