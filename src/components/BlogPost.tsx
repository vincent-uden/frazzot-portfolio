import Link from "next/link";
import { useRouter } from "next/router";
import { useAnalytics } from "../utils/useAnalytics";
import { useEffect, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { trpc } from "../utils/trpc";

const UAParser = require("ua-parser-js");

function generateFingerprint() {
  if (typeof navigator === "undefined") {
    return "";
  }
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

  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [likesFetched, setLikesFetched] = useState<boolean>(false);
  const [likedFetched, setLikedFetched] = useState<boolean>(false);

  const { data: likesServer, refetch: refetchLikes } = trpc.useQuery(
    ["admin.getLikes", { blogPost: router.pathname }],
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !likesFetched && router.pathname != "/blog",
      onSuccess: (data) => {
        if (!likesFetched) {
          setLikes(parseInt((data[0]?.count ?? 0) as any));
          setLikesFetched(true);
        }
      },
    }
  );

  const { data: likedServer, refetch: refetchLiked } = trpc.useQuery(
    [
      "admin.hasLiked",
      { blogPost: router.pathname, fingerprint: generateFingerprint() },
    ],
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !likedFetched && router.pathname != "/blog",
      onSuccess: (data) => {
        if (!likedFetched) {
          setLiked(data);
          setLikedFetched(true);
        }
      },
    }
  );

  const likeMut = trpc.useMutation(["admin.like"]);

  const likeClick = () => {
    if (!liked) {
      setLikes(likes + 1);

      likeMut.mutate({
        blogPost: router.pathname,
        fingerprint: generateFingerprint(),
      });
    } else {
      setLikes(likes - 1);
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
      <div className="blog-end mx-auto grid max-w-[920px] justify-center gap-8 px-32 md:flex md:px-8 lg:px-0">
        <div className="flex grow flex-row items-center justify-center gap-4 md:justify-end md:pl-0 lg:-translate-y-2 lg:justify-start lg:pl-8">
          <div
            className="relative h-12 w-12 text-pastelpink transition-transform hover:scale-125"
            onClick={() => {
              likeClick();
            }}
          >
            <div
              className={`absolute ${
                liked ? "opacity-0" : "opacity-100"
              } transition-opacity`}
            >
              <HiOutlineHeart size={48} />
            </div>
            <div
              className={`absolute ${
                liked ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              <HiHeart size={48} />
            </div>
          </div>
          <p className="select-none font-gothic text-3xl text-pastelpink">
            {likes}
          </p>
        </div>
        <Link href="/blog">
          <a className="inline-block w-full select-none bg-holo bg-[length:800px_600px] py-6 px-28 text-center font-stretch text-xl text-greyblack md:w-fit md:text-2xl">
            BACK
          </a>
        </Link>
      </div>
      <div className="h-[200px] w-screen overflow-y-hidden bg-pattern-holo-short bg-[length:1920px_330px] bg-[center_top_-4rem] bg-repeat-x md:h-[330px] md:bg-top" />
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
