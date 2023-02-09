import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps } from "next";
import Link from "next/link";

//import Content, {data} from "./blog_posts/test_blog.mdx";
//console.log(data);

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

const Blog = ({ posts }: Props) => {
  const [postComponents, setPostComponents] = useState<React.ReactElement[]>(
    []
  );
  const [months, setMonths] = useState<Date[]>([]);
  const [activeMonth, setActiveMonth] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [timelineHeight, setTimelineHeight] = useState<number>(0);

  const previewRef = useRef<HTMLDivElement>(null);

  const timelineContainer = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    importPosts();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setTimelineHeight(timelineContainer.current?.scrollHeight ?? 0);
  }, [months]);

  const changeActiveMonth = (i: number) => {
    if (i < 0 || i > 11) {
      return;
    }

    const m = months[i]!!;

    const timelineElem = timelineContainer.current?.children[i + 1]?.children[0];
    console.log(timelineElem);
    timelineElem?.scrollIntoView({ behavior: "smooth", block: "start"});

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

      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x">
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

      <div className="grid grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-row justify-end">
        <div className="col-span-1 w-72" />
          <div
            className="fixed timeline col-span-1 mt-4 h-[75vh] w-72 overflow-y-scroll pt-0 transition-transform"
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
                <div className="scroll-anchor pointer-events-none translate-y-[-17vh]"/>
                  <p
                    className={`no-ligatures grow text-right font-stretch text-xl transition-colors ${
                      i == activeMonth + 1
                        ? "text-sky"
                        : "-translate-x-[0.75rem] text-[#6c8da0]"
                    }`}
                  >{`${MONTHS[m.getMonth()]}\u00A0${m
                    .getFullYear()
                    .toString()
                    .slice(2)}`}</p>
                  <div
                    className={`ml-8 ${
                      i == activeMonth + 1
                        ? "h-8 w-8 bg-sky"
                        : "h-[1.25rem] w-[1.25rem] -translate-x-[0.35rem] bg-[#6c8da0]"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="blog-previews col-span-1" ref={previewRef}>
          {postComponents.map((comp, i) => {
            return (
              <Link
                href={`/blog_posts/${posts[i]?.fileName.split(".")[0] ?? ""}`}
              >
                <a className="pt-16">
                <div className="scroll-anchor pointer-events-none translate-y-[-100px]" />
                {comp}
                </a>
              </Link>
            );
          })}
        </div>
        <div className="col-span-1">{scrollPosition}</div>
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
