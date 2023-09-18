import Link from "next/link";
import { useRouter } from "next/router";
import { useAnalytics } from "../utils/useAnalytics";
import { useEffect, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

const UAParser = require("ua-parser-js");

function generateFingerprint() {
  const hardwareThreads = navigator.hardwareConcurrency;
  const languages = navigator.languages.reduce((acc, x) => acc + x + ",", "");

  let userAgent = UAParser(navigator.userAgent);

  const idString =
    userAgent?.cpu?.architecture +
    " " +
    hardwareThreads +
    " " +
    userAgent?.browser?.name +
    " " +
    userAgent?.browser?.major +
    " " +
    userAgent?.engine?.name +
    " " +
    userAgent?.os?.name +
    " " +
    userAgent?.os?.version +
    " " +
    languages +
    " " +
    Intl.DateTimeFormat().resolvedOptions().timeZone +
    " " +
    window.screen.width +
    "x" +
    window.screen.height +
    " ";

  return idString;
}

export const BlogPost = ({ content, data }: any) => {
  const router = useRouter();
  if (router.pathname.startsWith("/blog_posts/")) {
    useAnalytics(router.pathname);
  }

  useEffect(() => {
    generateFingerprint();
  }, []);

  const [liked, setLiked] = useState<boolean>(false);

  const [likes, setLikes] = useState<number>(0);

  const likeClick = () => {
    if (!liked) {
      setLikes(likes+1);
    }
    setLiked(!liked);
  };

  return (
    <div className="blog-container min-h-screen w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1090px_220px] bg-[center_top_4rem] bg-repeat-x md:bg-[length:1920px_330px]">
      <div className="h-48 md:h-64" />
      <div className="pt-2 pb-8 shadow-blog-panel">
        <div className="mx-auto max-w-[920px] px-8">
          <div className="date-header mt-8 ">
            <div className="mx-auto flex max-w-[920px] flex-row justify-between">
              <p className="grow">{data.date}</p>
              <p className="">{data.time}</p>
            </div>
          </div>
        </div>
        <h1 className="text-holo no-ligature mx-auto mt-2 max-w-[920px] px-8 text-center font-stretch text-xl md:text-left md:text-2xl">
          {data.title.toUpperCase()}
        </h1>
      </div>
      <div className="blog-post relative mx-auto max-w-[920px]">
        <div className="blog-content p-8">{content}</div>
      </div>

      <div className="h-8" />
      <div className="blog-end mx-auto grid max-w-[920px] justify-center px-32 md:flex md:px-8 lg:px-0 gap-8">
        <div className="grow flex flex-row items-center justify-center md:justify-end lg:justify-start gap-4 md:pl-0 lg:pl-8 lg:-translate-y-2">
          <div className="relative hover:scale-125 transition-transform w-12 h-12 text-pastelpink" onClick={() => {likeClick()}}>
            <div className={`absolute ${liked ? "opacity-0" : "opacity-100"} transition-opacity`}>
              <HiOutlineHeart size={48} />
            </div>
            <div className={`absolute ${liked ? "opacity-100" : "opacity-0"} transition-opacity`}>
              <HiHeart size={48} />
            </div>
          </div>
          <p className="text-3xl font-gothic text-pastelpink select-none">{likes}</p>
        </div>
        <Link href="/blog">
          <a className="inline-block w-full bg-holo bg-[length:800px_600px] py-6 px-28 text-center font-stretch text-xl text-greyblack md:text-2xl md:w-fit select-none">
            BACK
          </a>
        </Link>
      </div>
      <div className="h-[200px] md:h-[330px] w-screen overflow-y-hidden bg-pattern-holo-short bg-[length:1920px_330px] bg-[center_top_-4rem] md:bg-top bg-repeat-x" />
    </div>
  );
};

export const RightStack = ({ children, masterWidth }: any) => {
  return (
    <div className="split-stack">
      <aside className="grow-0" style={{ flexBasis: masterWidth ?? "50%" }}>
        {children.slice(0, 1)}
      </aside>
      <aside className="grow">{children.slice(1)}</aside>
    </div>
  );
};

export const LeftStack = ({ children, masterWidth }: any) => {
  return (
    <div className="split-stack">
      <aside className="grow">{children.slice(1)}</aside>
      <aside className="grow-0" style={{ flexBasis: masterWidth ?? "50%" }}>
        {children.slice(0, 1)}
      </aside>
    </div>
  );
};

export const QuoteBlock = ({ children }: any) => {
  return (
    <div className="quote mb-5 grid grid-cols-[4px_1fr] gap-4 bg-periwinkle bg-opacity-10">
      <div className="bg-periwinkle" />
      <div className="my-2 italic">{children}</div>
    </div>
  );
};
