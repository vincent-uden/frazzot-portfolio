import type { NextPage } from "next";
import Image from "next/image";

const About: NextPage = () => {
  return (
    <>
      <div className="hidden stroke-mint text-mint hover:text-mint"></div>
      <div className="h-64"></div>
      <h1 className="font-stretch text-center text-periwinkle text-6xl pl-4">
        ABOUT
      </h1>
      <div className="bg-holo bg-cover mt-8 py-2">
        <h2 className="font-stretch text-center text-greyblack text-3xl">
          A SHORT INTRODUCTION TO THE ARTIST_
        </h2>
      </div>

      <div className="h-24"></div>
      <div className="bg-pattern-holo-short bg-[length:1920px_330px] bg-repeat-x bg-bottom">
        <div className="px-[10%] grid grid-cols-7">
          <div className="bg-holo mr-16 col-span-3">
            <div className="h-[300px] w-[300px] scale-125">
              <Image
                src="/img/moi2.png"
                width="1246px"
                height="2000px"
                layout="responsive"
              />
            </div>
          </div>
          <div className="bg-holo p-[2px] col-span-4">
            <div className="bg-greyblack p-12 w-full h-full">
              <h2 className="font-stretch text-lilac text-3xl">HEY THERE!</h2>
              <div className="h-8"></div>
              <p className="text-lilac font-cocogoose font-thin text-lg">
                WELCOME TO MY WEBSITE! I'M FRAZZOT A 21-YEAR-OLD ARTIST AND
                STUDENT BASED IN GOTHENBURG, SWEDEN. I LIKE TO PLAY VIDEO GAMES,
                WORKOUT AND CREATE STUFF.
              </p>
              <div className="h-4"></div>
              <p className="text-lilac font-cocogoose font-thin text-lg">
                ON THIS SITE YOU CAN FIND SOME OF MY WORKS, WAYS TO SUPPORT AND
                HOW TO GET IN TOUCH WITH ME.
              </p>
              <div className="h-4"></div>
              <p className="text-lilac font-cocogoose font-thin text-lg">
                THANK YOU FOR STOPPING BY!
              </p>
              <div className="h-32"></div>
            </div>
          </div>
          <div className="h-16 col-span-7"></div>
          <div className="col-span-2"></div>
          <div className="w-full h-[70%] bg-holo col-span-5">
            <div className="relative scale-100 -translate-y-[50%] top-1/2">
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
