import type { NextPage } from "next";
import Image from "next/image";

const About: NextPage = () => {
  return (
    <>
      <div className="hidden stroke-mint text-mint hover:text-mint"></div>
      <div className="h-64"></div>
      <h1 className="pl-4 text-center font-stretch text-6xl text-periwinkle">
        ABOUT
      </h1>
      <div className="mt-8 bg-holo bg-cover py-2">
        <h2 className="text-center font-stretch text-3xl text-greyblack">
          A SHORT INTRODUCTION TO THE ARTIST_
        </h2>
      </div>

      <div className="h-24"></div>
      <div className="bg-pattern-holo-short bg-[length:1920px_330px] bg-bottom bg-repeat-x">
        <div className="grid grid-cols-7 px-[10%]">
          <div className="col-span-3 mr-16 bg-holo">
            <div className="h-[300px] w-[300px] scale-125">
              <Image
                src="/img/moi2.png"
                width="1246px"
                height="2000px"
                layout="responsive"
              />
            </div>
          </div>
          <div className="col-span-4 bg-holo p-[2px]">
            <div className="h-full w-full bg-greyblack p-12">
              <h2 className="font-stretch text-3xl text-lilac">HEY THERE!</h2>
              <div className="h-8"></div>
              <p className="font-cocogoose text-lg font-thin text-lilac">
                WELCOME TO MY WEBSITE! I'M FRAZZOT A 21-YEAR-OLD ARTIST AND
                STUDENT BASED IN GOTHENBURG, SWEDEN. I LIKE TO PLAY VIDEO GAMES,
                WORKOUT AND CREATE STUFF.
              </p>
              <div className="h-4"></div>
              <p className="font-cocogoose text-lg font-thin text-lilac">
                ON THIS SITE YOU CAN FIND SOME OF MY WORKS, WAYS TO SUPPORT AND
                HOW TO GET IN TOUCH WITH ME.
              </p>
              <div className="h-4"></div>
              <p className="font-cocogoose text-lg font-thin text-lilac">
                THANK YOU FOR STOPPING BY!
              </p>
              <div className="h-32"></div>
            </div>
          </div>
          <div className="col-span-7 h-16"></div>
          <div className="col-span-2"></div>
          <div className="col-span-5 h-[70%] w-full bg-holo">
            <div className="relative top-1/2 -translate-y-[50%] scale-100">
              <Image
                src="/img/items.png"
                width="3908px"
                height="1400px"
                layout="responsive"
              ></Image>
            </div>
          </div>
        </div>
        <div className="h-64"></div>
      </div>
    </>
  );
};

export default About;
