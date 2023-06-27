import Head from "next/head";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps } from "next";
import Link from "next/link";

type Post = {
  title: string;
  author: string;
  date: string;
  time: string;
  fileName: string;
};

type Props = {
  posts: Post[];
};

type BlogPreviewProps = {
  path: string;
  index: number;
  date: string;
  children: React.ReactNode;
};

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const CATEGORIES = [
  {
    header: "THE SIMS 4 MODS",
    body: "A COLLECTION OF MODS AND CUSTOM CONTENT CREATED FOR THE SIMS 4.",
    color: "sky",
  },
  {
    header: "GRAPHIC DESIGN",
    body: "STYLE GUIDES AND DESIGN SHEETS FOR SOME OF MY DESIGN PROJECTS.",
    color: "sky",
  },
  {
    header: "EGROUKORA",
    body: "A WORLDBUILDING PROJECT WITH THE AMBITION OF BECOMING A COMIC, YOU CAN READ MORE ABOUT THE CHARACTERS, WORLD AND STORY HERE.",
    color: "sky",
  },
  {
    header: "PAINTED FABRICS",
    body: "PAINTED BAGS, JEANS, AND JACKETS FOR FUN OR BY COMMISSION. HAVE A LOOK AT SOME EXAMPLES HERE.",
    color: "sky",
  },
];

function useOnScreen(
  ref: React.RefObject<HTMLDivElement>,
  callback: (ref: React.RefObject<HTMLDivElement> | null) => void
) {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        if (entry) {
          setIntersecting(entry.isIntersecting);
          if (entry.isIntersecting) {
            callback(ref);
          }
        }
      },
      {
        threshold: 0.9,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}

function scrollTo(el: HTMLDivElement) {
  const elLeft = el.offsetLeft + el.offsetWidth / 2;
  // @ts-ignore: next-line
  el.parentNode.scroll({
    left: elLeft - el.parentNode.offsetWidth / 2 - el.parentNode.offsetLeft,
    behavior: "smooth",
  });
}

function bottomPadding(bottomEl: HTMLDivElement) {
  let topOfBottom = bottomEl.getBoundingClientRect().bottom - 100;
  if (topOfBottom > window.innerHeight) {
    return 100;
  } else {
    return 100 + (topOfBottom - window.innerHeight);
  }
}

const ScrollContext = createContext({
  intoViewCallback: (i: Date) => {},
});

const Blog = ({ posts }: Props) => {
  const [postComponents, setPostComponents] = useState<React.ReactElement[]>(
    []
  );
  const [months, setMonths] = useState<Date[]>([]);

  const [activeMonth, setActiveMonth] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [timelineHeight, setTimelineHeight] = useState<number>(0);
  const [categoryWidth, setCategoryWidth] = useState<number>(100);
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  const [autoScrolling, setAutoScrolling] = useState<boolean>(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const timelineContainer = useRef<HTMLDivElement>(null);
  const mobileTimelineContainer = useRef<HTMLDivElement>(null);

  const categoryRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleScroll = async () => {
    setScrollPosition(window.scrollY);
  };

  const handleResize = async () => {
    setCategoryWidth(categoryRef.current?.scrollWidth ?? 0);
    setTimelineHeight(timelineContainer.current?.scrollHeight ?? 0);
    setViewportWidth(window.innerWidth);
  };

  useEffect(() => {
    importPosts();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setTimelineHeight(timelineContainer.current?.scrollHeight ?? 0);
  }, [months]);

  useEffect(() => {
    if (!autoScrolling) {
      const timelineElem =
        timelineContainer.current?.children[activeMonth + 1]?.children[0];
      timelineElem?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeMonth, autoScrolling]);

  useEffect(() => {
    handleResize();
  }, [postComponents]);

  const changeActiveMonth = (i: number, onMobile = false) => {
    if (i < 0 || i > 11) {
      return;
    }
    const m = months[i]!!;

    if (!onMobile) {
      setAutoScrolling(true);

      const timelineElem =
        timelineContainer.current?.children[i + 1]?.children[0];
      timelineElem?.scrollIntoView({ behavior: "smooth", block: "start" });

      let j = 0;
      for (const p of posts) {
        if (new Date(p.date).getTime() <= m.getTime()) {
          const anchor = previewRef.current?.children[j]?.children[0];
          anchor?.scrollIntoView({ behavior: "smooth", block: "start" });

          break;
        }
        j++;
      }

      setActiveMonth(i);
      setTimeout(() => {
        setAutoScrolling(false);
      }, 400);
    } else {
      const timelineElem: any =
        mobileTimelineContainer.current?.children[i + 1];
      scrollTo(timelineElem);

      setActiveMonth(i);
    }
  };

  const intoViewCallback = (i: Date) => {
    let j = 0;
    for (const m of months) {
      if (i.getFullYear() == m.getFullYear() && i.getMonth() == m.getMonth()) {
        setActiveMonth(j);
        return;
      }
      j++;
    }
  };

  const importPosts = async () => {
    const output: any[] = [];
    const dates: Date[] = [];
    const outMonths: Date[] = [];
    for (const p of posts) {
      output.push((await import(`./blog_posts/${p.fileName}`)).default());
      dates.push(new Date(p.date));

      const newDate = new Date(p.date);
      let dup = false;
      for (const m of outMonths) {
        if (newDate.getMonth() == m.getMonth()) {
          dup = true;
        }
      }
      if (!dup) {
        outMonths.push(newDate);
      }
    }

    outMonths.sort((a, b) => {
      return b.getTime() - a.getTime();
    });
    output.sort((a, b) => {
      return (
        dates[output.indexOf(b)]!!.getTime() -
        dates[output.indexOf(a)]!!.getTime()
      );
    });

    setPostComponents(output);
    setMonths(outMonths);
  };

  return (
    <>
      <Head>
        <title>FRAZZOT - Blog</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1090px_220px] bg-[center_top_4rem] bg-repeat-x md:bg-[length:1920px_330px]">
        <div className="h-48 md:h-64"></div>
        <h1 className="page-header text-sky">BLOG</h1>
        <div className="mt-2 mb-8 bg-holo bg-cover py-2 md:mt-8 md:mb-16">
          <h2 className="page-sub-header hidden text-greyblack lg:block">
            PROJECT ARCHIVE AND POSTS_
          </h2>
          <h2 className="page-sub-header text-greyblack lg:hidden">
            ARCHIVE AND POSTS_
          </h2>
        </div>
      </div>

      <div className="bg-pattern-holo-short bg-[length:1090px_220px] bg-bottom bg-repeat-x md:bg-[length:1920px_330px]">
        {/* Mobile */}
        <div className="2xl:hidden">
          <div className="mx-auto max-w-screen-md border-4 border-sky  p-4 pb-0">
            <h3 className="no-ligatures text-center font-stretch text-2xl text-sky lg:text-3xl">
              CATEGORIES &gt;
            </h3>
            <CategoriesFilter />
          </div>

          <div className="timeline-mobile mx-auto max-w-screen-md px-4 my-8">
            <div className="pointer-events-none relative top-[2.25rem] h-2 w-full bg-sky" />
            <div
              className="no-scrollbar my-4 flex select-none flex-row gap-8 overflow-y-hidden overflow-x-scroll"
              ref={mobileTimelineContainer}
            >
              {[new Date()].concat(months, [new Date()]).map((m, i) => {
                return (
                  <div
                    className={`flex cursor-pointer select-none flex-col items-center gap-2 ${
                      i == 0 || i == months.length + 1
                        ? "pointer-events-none opacity-0"
                        : ""
                    }`}
                    key={`timeline-${i}`}
                    onClick={() => changeActiveMonth(i - 1, true)}
                  >
                    <div
                      className={`h-8 w-8 select-none transition-transform ${
                        i == activeMonth + 1 && !autoScrolling
                          ? "scale-100 bg-sky"
                          : "scale-75 bg-[#6c8da0]"
                      }`}
                    />
                    <p
                      className={`no-ligatures grow select-none text-right font-stretch text-base transition-all ${
                        i == activeMonth + 1 && !autoScrolling
                          ? "scale-110 text-sky"
                          : "text-[#6c8da0]"
                      }`}
                    >{`${MONTHS[m.getMonth()]}\u00A0${m
                      .getFullYear()
                      .toString()
                      .slice(2)}`}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="blog-previews-mobile lg:hidden">
            <ScrollContext.Provider value={{ intoViewCallback }}>
              {postComponents.map((comp, i) => {
                const postDate = new Date(posts[i]?.date ?? "2000-01-01");
                const activeDate = months[activeMonth];

                if (
                  postDate.getUTCFullYear() == activeDate?.getUTCFullYear() &&
                  postDate.getMonth() == activeDate.getMonth()
                ) {
                  return (
                    <BlogPreview
                      path={`/blog_posts/${
                        posts[i]?.fileName.split(".")[0] ?? ""
                      }`}
                      key={`blog-post-${i}`}
                      date={posts[i]?.date ?? "2000-01-01"}
                      index={i}
                    >
                      {comp}
                    </BlogPreview>
                  );
                }
              })}
            </ScrollContext.Provider>
          </div>
        </div>

        {/* Desktop */}
        <div className={"hidden grid-cols-[1fr_auto_1fr] lg:grid"}>
          <div className="flex flex-row justify-end">
            <div className="col-span-1 hidden w-72 2xl:block" />
            <div
              className={
                "timeline fixed col-span-1 mt-4 hidden h-[75vh] w-72 overflow-y-scroll pt-0 transition-transform 2xl:block"
              }
              style={{
                top:
                  scrollPosition > 336
                    ? bottomPadding(bottomRef.current!!)
                    : 336 + 100 - scrollPosition,
              }}
              ref={timelineContainer}
            >
              <div
                className="absolute top-0 right-[5.8rem] w-[0.4rem] bg-sky transition-transform"
                style={{ height: timelineHeight }}
              />
              {[new Date()].concat(months, [new Date()]).map((m, i) => {
                return (
                  <div
                    className={`mt-[calc(18.75vh-1.5rem)] mb-[calc(18.75vh-1.5rem)] flex h-8 cursor-pointer items-center pr-20 ${
                      i == 0 || i == months.length + 1
                        ? "pointer-events-none opacity-0"
                        : ""
                    }`}
                    key={`timeline-${i}`}
                    onClick={() => changeActiveMonth(i - 1)}
                  >
                    <div className="scroll-anchor pointer-events-none translate-y-[-17vh]" />
                    <p
                      className={`no-ligatures grow text-right font-stretch text-xl transition-all ${
                        i == activeMonth + 1 && !autoScrolling
                          ? "scale-110 text-sky"
                          : "text-[#6c8da0]"
                      }`}
                    >{`${MONTHS[m.getMonth()]}\u00A0${m
                      .getFullYear()
                      .toString()
                      .slice(2)}`}</p>
                    <div
                      className={`ml-8 h-8 w-8 transition-transform ${
                        i == activeMonth + 1 && !autoScrolling
                          ? "scale-100 bg-sky"
                          : "scale-75 bg-[#6c8da0]"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="blog-previews col-span-1" ref={previewRef}>
            <ScrollContext.Provider value={{ intoViewCallback }}>
              {postComponents.map((comp, i) => {
                if (viewportWidth < 1536) {
                  const postDate = new Date(posts[i]?.date ?? "2000-01-01");
                  const activeDate = months[activeMonth];
                  if (
                    postDate.getUTCFullYear() == activeDate?.getUTCFullYear() &&
                    postDate.getMonth() == activeDate.getMonth()
                  ) {
                    return (
                      <BlogPreview
                        path={`/blog_posts/${
                          posts[i]?.fileName.split(".")[0] ?? ""
                        }`}
                        key={`blog-post-${i}`}
                        date={posts[i]?.date ?? "2000-01-01"}
                        index={i}
                      >
                        {comp}
                      </BlogPreview>
                    );
                  }
                } else {
                  return (
                    <BlogPreview
                      path={`/blog_posts/${
                        posts[i]?.fileName.split(".")[0] ?? ""
                      }`}
                      key={`blog-post-${i}`}
                      date={posts[i]?.date ?? "2000-01-01"}
                      index={i}
                    >
                      {comp}
                    </BlogPreview>
                  );
                }
              })}
            </ScrollContext.Provider>
          </div>
          <div className="col-span-1 w-96" ref={categoryRef} />
          <div
            className="fixed pt-24"
            style={{
              top:
                scrollPosition > 336
                  ? bottomPadding(bottomRef.current!!)
                  : 336 + 100 - scrollPosition,
              width: categoryWidth,
              left: categoryRef.current?.getBoundingClientRect().x,
            }}
          >
            <div className="absolute left-0 hidden w-full 2xl:block">
              <h3 className="no-ligatures text-center font-stretch text-3xl text-sky">
                CATEGORIES &gt;
              </h3>
            </div>
            <div className="hidden 2xl:block">
              <CategoriesFilter />
            </div>
          </div>
        </div>
        <div className="h-40 lg:h-72" ref={bottomRef} />
      </div>
    </>
  );
};

const BlogPreview: React.FC<BlogPreviewProps> = ({
  path,
  index,
  date,
  children,
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const { intoViewCallback } = useContext(ScrollContext);

  const onScreen = useOnScreen(anchorRef, () => {
    intoViewCallback(new Date(date));
  });

  return (
    <Link href={path}>
      <div className={"blog-link cursor-pointer pt-0"} ref={anchorRef}>
        <div className="scroll-anchor pointer-events-none translate-y-[-100px]" />
        {children}
      </div>
    </Link>
  );
};

const CategoriesFilter = () => {
  const accHeightRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const [accHeights, setAccHeights] = useState<number[]>([]);
  const [openAcc, setOpenAcc] = useState<boolean[]>([]);

  const getHeights = async () => {
    const container = accHeightRef.current;
    if (container != null) {
      const heights = [];
      const opens = [];

      for (let i = 0; i < container.childElementCount; i++) {
        heights.push(container.children[i]!!.children[0]!!.clientHeight);
        opens.push(false);
      }
      setAccHeights(heights);
      setOpenAcc(opens);
    }
  };

  useEffect(() => {
    getHeights();

    window.addEventListener("resize", getHeights);
  }, []);

  return (
    <>
      <div
        className="mt-8 flex flex-col items-center 2xl:mx-8 2xl:mt-12"
        ref={accordionRef}
      >
        {CATEGORIES.map(({ header, body, color }, i) => {
          return (
            <div
              className={`mb-4 border-2 border-${color} cursor-pointer bg-${
                openAcc[i] ? "greyblack" : color
              } w-full py-4 px-4 2xl:py-4`}
              key={`acc-main-${i}`}
              onMouseEnter={(_) => {
                const openSections = [...openAcc];
                for (let j = 0; j < openSections.length; j++) {
                  openSections[j] = i === j;
                }
                setOpenAcc(openSections);
              }}
              onMouseLeave={(_) => {
                const openSections = [...openAcc];
                openSections[i] = false;
                setOpenAcc(openSections);
              }}
              style={{
                transition:
                  "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), opacity 1s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <h3
                className={`no-ligatures whitespace-nowrap text-center font-stretch text-lg transition-colors text-${
                  openAcc[i] ? color : "greyblack"
                }`}
              >
                {header}
              </h3>
              <div
                className={"overflow-hidden transition-all"}
                style={{
                  maxHeight: `${openAcc[i] ? accHeights[i] : 0}px`,
                  opacity: openAcc[i] ? 100 : 0,
                }}
              >
                <p
                  className={`text-${
                    openAcc[i] ? color : "greyblack"
                  } pt-4 text-center font-gothic text-sm md:text-lg lg:text-sm`}
                >
                  {body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pointer-events-none fixed opacity-0" ref={accHeightRef}>
        {CATEGORIES.map(({ header, body, color }, i) => {
          return (
            <div
              className={`mb-4 border-2 border-${color} cursor-pointer bg-${
                true ? "greyblack" : color
              } py-0 px-20`}
              key={`acc-hidden-${i}`}
            >
              <div className={"overflow-hidden transition-all"}>
                <p
                  className={`text-${
                    true ? color : "greyblack"
                  } pointer-events-none pt-4 text-center font-gothic text-sm md:text-lg`}
                >
                  {body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const postsDir = path.join(process.cwd(), "src/pages/blog_posts");
  const filenames = await fs.readdir(postsDir);

  const posts: Post[] = [];

  for (const f of filenames) {
    const mod = await import("./blog_posts/" + f);
    posts.push({ ...mod.data, fileName: f });
  }

  posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
