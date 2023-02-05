import Head from "next/head";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    importPosts();
  }, []);

  const changeActiveMonth = (i: number) => {
    if (i < 0 || i > 11) {
      return;
    }

    setActiveMonth(i);
  };

  const importPosts = async () => {
    const output = [];
    const outMonths: Date[] = [];
    for (const p of posts) {
      output.push((await import(`./blog_posts/${p.fileName}`)).default());

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

    outMonths.sort();

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
      <div className="col-span-1 w-72" />
        <div className="timeline fixed mt-4 pt-56 left-20 w-72">
          <div className="absolute top-0 right-[5.75rem] -z-10 h-full w-[0.4rem] bg-sky" />
          {months.map((m, i) => {
            return (
              <div
                className="mb-32 flex h-8 items-center pr-20 cursor-pointer"
                key={`timeline-${i}`}
                onClick={() => changeActiveMonth(i)}
              >
                <p
                  className={`no-ligatures grow text-right font-stretch text-xl transition-colors ${
                    i == activeMonth
                      ? "text-sky"
                      : "-translate-x-[0.75rem] text-[#6c8da0]"
                  }`}
                >{`${MONTHS[m.getMonth()]}\u00A0${m
                  .getFullYear()
                  .toString()
                  .slice(2)}`}</p>
                <div
                  className={`ml-8 ${
                    i == activeMonth
                      ? "h-8 w-8 bg-sky"
                      : "h-[1.25rem] w-[1.25rem] -translate-x-[0.35rem] bg-[#6c8da0]"
                  }`}
                />
              </div>
            );
          })}
        </div>
        <div className="blog-previews col-span-1">
          {postComponents.map((comp, i) => {
            return (
              <Link
                href={`/blog_posts/${posts[i]?.fileName.split(".")[0] ?? ""}`}
              >
                <a>{comp}</a>
              </Link>
            );
          })}
        </div>
        <div className="col-span-1">Hello</div>
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

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
