import type { NextPage } from "next";
import Image from "next/image";

const About: NextPage = () => {
  return (
    <>
      <div className="h-48 md:h-64"></div>
      <h1 className="page-header text-periwinkle">
        ABOUT
      </h1>
      <div className="mt-2 md:mt-8 bg-holo bg-cover py-2">
        <h2 className="page-sub-header hidden lg:block">
          A SHORT INTRODUCTION TO THE ARTIST_
        </h2>
        <h2 className="page-sub-header lg:hidden">
          INTRO TO THE ARTIST_
        </h2>
      </div>

      <div className="h-24"></div>
      <div className="bg-pattern-holo-short bg-[length:1920px_330px] bg-bottom bg-repeat-x">
        <div className="mx-auto grid px-8 md:px-16 gap-x-2 max-w-screen-xl grid-cols-7 relative">
          <div className="absolute top-32 right-16 md:static md:col-span-3 mr-0 md:mr-16 bg-holo h-min md:h-full translate-y-20 md:translate-y-0">
            <div className="w-[30vw] md:h-[300px] md:w-[300px] scale-125">
              <Image
                src="/img/moi2.png"
                width="1246px"
                height="2000px"
                layout="responsive"
              />
            </div>
          </div>
          <div className="col-span-7 md:col-span-4 bg-holo p-[2px]">
            <div className="w-full bg-greyblack p-8 h-full md:p-12">
              <h2 className="font-stretch text-base md:text-3xl text-lilac">HEY THERE!</h2>
              <div className="h-4 md:h-8"></div>
              <p className="font-cocogoose text-xs md:text-lg font-extralight text-lilac">
                WELCOME TO MY WEBSITE! I'M FRAZZOT A <span className="font-neou-bold">21</span>-YEAR-OLD ARTIST AND
                STUDENT BASED IN GOTHENBURG, SWEDEN. I LIKE TO PLAY VIDEO GAMES,
                WORKOUT AND CREATE STUFF.
              </p>
              <div className="h-4"></div>
              <p className="font-cocogoose text-xs md:text-lg font-extralight text-lilac w-[calc(60%-48px)] md:w-full">
                ON THIS SITE YOU CAN FIND SOME OF MY WORKS, WAYS TO SUPPORT AND
                HOW TO GET IN TOUCH WITH ME.
              </p>
              <div className="h-4"></div>
              <p className="font-cocogoose text-xs md:text-lg font-extralight text-lilac w-[calc(60%-48px)] md:w-full">
                THANK YOU FOR STOPPING BY!
              </p>
              <div className="h-32 hidden md:block"></div>
            </div>
          </div>
          <div className="col-span-7 h-[calc(100vw-250px)] md:h-16"></div>
          <div className="col-span-2 hidden md:block"></div>
          <div className="col-span-7 lg:col-span-5 h-1/2 md:h-[70%] w-screen mx-0 relative -left-8 md:-left-16 lg:left-0 lg:w-full bg-holo">
            <div className="relative top-1/2 -translate-y-[50%] scale-100 block md:hidden">
              <Image
                src="/img/items_mobile.png"
                width="1677px"
                height="1264px"
                layout="responsive"
              />
            </div>
            <div className="relative top-1/2 -translate-y-[50%] scale-100 hidden md:block">
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
