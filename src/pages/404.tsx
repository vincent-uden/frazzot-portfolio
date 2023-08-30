import { NextPage } from "next";
import Head from "next/head";
import { useAnalytics } from "../utils/useAnalytics";

const Custom404: NextPage = () => {
  useAnalytics("/404");

  return (
    <>
      <Head>
        <title>FRAZZOT ⋄ ABOUT</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1090px_220px] bg-[center_top_4rem] bg-repeat-x md:bg-[length:1920px_330px]">
        <div className="h-48 md:h-64"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="page-header text-holo">404</h1>
        <h2 className="lg:text-3xl; text-center font-stretch text-base text-lilac md:text-2xl">
          PAGE NOT FOUND_
        </h2>
      </div>

      <div className="min-h-[calc(100vh-10rem)] bg-pattern-holo-short bg-[length:1090px_220px] bg-bottom bg-repeat-x md:bg-[length:1920px_330px]"></div>
    </>
  );
};

export default Custom404;
