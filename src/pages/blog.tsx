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
  const [accHeights, setAccHeights] = useState<number[]>([]);
  const [categoryWidth, setCategoryWidth] = useState<number>(100);

  const [autoScrolling, setAutoScrolling] = useState<boolean>(false);
  const [openAcc, setOpenAcc] = useState<boolean[]>([]);

  const previewRef = useRef<HTMLDivElement>(null);

  const timelineContainer = useRef<HTMLDivElement>(null);

  const accordionRef = useRef<HTMLDivElement>(null);
  const accHeightRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  const handleScroll = async () => {
    setScrollPosition(window.scrollY);
  };

  const handleResize = async () => {
    setCategoryWidth(categoryRef.current?.scrollWidth ?? 0);
  };

  useEffect(() => {
    importPosts();
    getHeights();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

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

  const changeActiveMonth = (i: number) => {
    if (i < 0 || i > 11) {
      return;
    }
    setAutoScrolling(true);

    const m = months[i]!!;

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

      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[center_top_4rem] bg-[length:1090px_220px] md:bg-[length:1920px_330px] bg-repeat-x">
        <div className="h-64"></div>
        <h1 className="pl-4 text-center font-stretch text-6xl text-sky">
          BLOG
        </h1>
        <div className="mt-8 mb-16 bg-holo bg-cover py-2">
          <h2 className="text-center font-stretch text-3xl text-greyblack">
            PROJECT ARCHIVE AND POSTS_
          </h2>
        </div>
      </div>

      <div className={"grid grid-cols-[1fr_auto_1fr]"}>
        <div className="flex flex-row justify-end">
          <div className="col-span-1 w-72" />
          <div
            className={
              "timeline fixed col-span-1 mt-4 h-[75vh] w-72 overflow-y-scroll pt-0 transition-transform"
            }
            style={{
              top: scrollPosition > 336 ? 100 : 336 + 100 - scrollPosition,
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
              return (
                <BlogPreview
                  path={`/blog_posts/${posts[i]?.fileName.split(".")[0] ?? ""}`}
                  key={`blog-post-${i}`}
                  date={posts[i]?.date ?? "2000-01-01"}
                  index={i}
                >
                  {comp}
                </BlogPreview>
              );
            })}
          </ScrollContext.Provider>
        </div>
        <div className="col-span-1" ref={categoryRef} />
        <div
          className="fixed right-0 pt-24"
          style={{
            top: scrollPosition > 336 ? 100 : 336 + 100 - scrollPosition,
            width: categoryWidth,
          }}
        >
          <div className="absolute left-0">
            <h3 className="no-ligatures text-center font-stretch text-3xl text-sky">
              CATEGORIES &gt;
            </h3>
            <div className="mt-8 flex flex-col items-center" ref={accordionRef}>
              {CATEGORIES.map(({ header, body, color }, i) => {
                return (
                  <div
                    className={`mb-4 border-2 border-${color} cursor-pointer bg-${
                      openAcc[i] ? "greyblack" : color
                    } w-96 py-6 px-6`}
                    key={`acc-main-${i}`}
                    onMouseEnter={(e) => {
                      const openSections = [...openAcc];
                      for (let j = 0; j < openSections.length; j++) {
                        openSections[j] = i === j;
                      }
                      setOpenAcc(openSections);
                    }}
                    onMouseLeave={(e) => {
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
                        } pt-4 text-center font-gothic text-sm`}
                      >
                        {body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pointer-events-none opacity-0" ref={accHeightRef}>
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
                        } pointer-events-none pt-4 text-center font-gothic text-sm`}
                      >
                        {body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
      <div className={"blog-link cursor-pointer pt-16"} ref={anchorRef}>
        <div className="scroll-anchor pointer-events-none translate-y-[-100px]" />
        {children}
      </div>
    </Link>
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
